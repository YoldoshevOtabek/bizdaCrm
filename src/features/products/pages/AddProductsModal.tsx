
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  Button,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
  Switch,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";

import http from "../../../services/http";

type ProductForm = {
  name: string;
  description: string;
  shortDescription: string;
  sku: string;
  barcode: string;
  price: number | null;
  oldPrice: number | null;
  discountPercent: number;
  stock: number;
  lowStockThreshold: number;
  brandId: string;
  categoryId: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
};

type ProductImage = {
  url: string;
  alt: string;
  isMain: boolean;
  sortOrder: number;
};

const initialForm: ProductForm = {
  name: "",
  description: "",
  shortDescription: "",
  sku: "",
  barcode: "",
  price: null,
  oldPrice: null,
  discountPercent: 0,
  stock: 0,
  lowStockThreshold: 5,
  brandId: "",
  categoryId: "",
  isActive: true,
  isFeatured: false,
  isNew: false,
  isPopular: false,
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState<ProductForm>(initialForm);

  const [images, setImages] = useState<ProductImage[]>([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // ==============================
  // UPDATE FORM
  // ==============================

  const updateForm = <K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==============================
  // GET BRANDS + CATEGORIES
  // ==============================

  useEffect(() => {
    const getData = async () => {
      try {
        const [brandsResponse, categoriesResponse] =
          await Promise.all([
            http.get("/admin/brands"),
            http.get("/admin/categories"),
          ]);

        const brandsData =
          brandsResponse.data?.data ||
          brandsResponse.data ||
          [];

        const categoriesData =
          categoriesResponse.data?.data ||
          categoriesResponse.data ||
          [];

        setBrands(
          Array.isArray(brandsData)
            ? brandsData
            : []
        );

        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData
            : []
        );
      } catch (error) {
        console.log(error);

        message.error(
          "Brand va category ma'lumotlarini olishda xatolik"
        );
      }
    };

    getData();
  }, []);

  // ==============================
  // GET PRODUCT FOR EDIT
  // ==============================

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setPageLoading(true);

        const response = await http.get(
          `/admin/products/${id}`
        );

        const product =
          response.data?.data ||
          response.data;

        // ==============================
        // FORM
        // ==============================

        setForm({
          name: product.name || "",

          description:
            product.description || "",

          shortDescription:
            product.shortDescription || "",

          sku:
            product.sku || "",

          barcode:
            product.barcode || "",

          price:
            product.price ?? null,

          oldPrice:
            product.oldPrice ?? null,

          discountPercent:
            product.discountPercent ?? 0,

          stock:
            product.stock ?? 0,

          lowStockThreshold:
            product.lowStockThreshold ?? 5,

          brandId:
            product.brandId || "",

          categoryId:
            product.categoryId || "",

          isActive:
            product.isActive ?? true,

          isFeatured:
            product.isFeatured ?? false,

          isNew:
            product.isNew ?? false,

          isPopular:
            product.isPopular ?? false,
        });

        // ==============================
        // IMAGES
        // ==============================

        if (Array.isArray(product.images)) {
          const productImages: ProductImage[] =
            product.images
              .filter(
                (item: any) =>
                  item &&
                  typeof item === "object"
              )
              .map(
                (
                  item: any,
                  index: number
                ) => ({
                  url: item.url || "",

                  alt:
                    item.alt ||
                    product.name ||
                    "Product image",

                  isMain:
                    item.isMain ??
                    index === 0,

                  sortOrder:
                    item.sortOrder ??
                    index,
                })
              );

          setImages(productImages);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.log(error);

        message.error(
          "Product ma'lumotlarini olishda xatolik"
        );
      } finally {
        setPageLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // ==============================
  // IMAGE URL
  // ==============================

  const addImageUrl = () => {
    setImages((prev) => [
      ...prev,
      {
        url: "",
        alt:
          form.name ||
          "Product image",
        isMain: prev.length === 0,
        sortOrder: prev.length,
      },
    ]);
  };

  // ==============================
  // UPDATE IMAGE
  // ==============================

  const updateImageUrl = (
    index: number,
    url: string
  ) => {
    setImages((prev) =>
      prev.map((image, i) =>
        i === index
          ? {
              ...image,
              url,
            }
          : image
      )
    );
  };

  // ==============================
  // REMOVE IMAGE
  // ==============================

  const removeImage = (
    index: number
  ) => {
    setImages((prev) => {
      const filtered = prev.filter(
        (_, i) => i !== index
      );

      return filtered.map(
        (image, i) => ({
          ...image,
          isMain: i === 0,
          sortOrder: i,
        })
      );
    });
  };

  // ==============================
  // SET MAIN IMAGE
  // ==============================

  const setMainImage = (
    index: number
  ) => {
    setImages((prev) =>
      prev.map((image, i) => ({
        ...image,
        isMain: i === index,
      }))
    );
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = async () => {
    // ==============================
    // VALIDATION
    // ==============================

    if (!form.name.trim()) {
      message.error(
        "Product name kiriting"
      );
      return;
    }

    if (!form.sku.trim()) {
      message.error("SKU kiriting");
      return;
    }

    if (
      form.price === null ||
      form.price <= 0
    ) {
      message.error(
        "Product price kiriting"
      );
      return;
    }

    if (!form.brandId) {
      message.error(
        "Brand tanlang"
      );
      return;
    }

    if (!form.categoryId) {
      message.error(
        "Category tanlang"
      );
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // PREPARE IMAGES
      // ==============================

      const validImages =
        images
          .filter(
            (image) =>
              image.url.trim() !== ""
          )
          .map(
            (image, index) => ({
              url: image.url.trim(),

              alt:
                image.alt.trim() ||
                form.name.trim() ||
                "Product image",

              isMain:
                index === 0,

              sortOrder:
                index,
            })
          );

      // ==============================
      // PAYLOAD
      // ==============================

      const payload = {
        name:
          form.name.trim(),

        description:
          form.description.trim(),

        shortDescription:
          form.shortDescription.trim(),

        sku:
          form.sku.trim(),

        barcode:
          form.barcode.trim() ||
          null,

        price:
          form.price,

        oldPrice:
          form.oldPrice &&
          form.oldPrice > 0
            ? form.oldPrice
            : null,

        discountPercent:
          form.discountPercent,

        stock:
          form.stock,

        lowStockThreshold:
          form.lowStockThreshold,

        brandId:
          form.brandId,

        categoryId:
          form.categoryId,

        isActive:
          form.isActive,

        isFeatured:
          form.isFeatured,

        isNew:
          form.isNew,

        isPopular:
          form.isPopular,

        images:
          validImages,
      };

      console.log(
        "================================"
      );

      console.log(
        "PRODUCT PAYLOAD:"
      );

      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        "IMAGES:"
      );

      console.log(
        validImages
      );

      console.log(
        "================================"
      );

      // ==============================
      // UPDATE
      // ==============================

      if (isEdit) {
        const response =
          await http.patch(
            `/admin/products/${id}`,
            payload
          );

        console.log(
          "UPDATE RESPONSE:",
          response.data
        );

        message.success(
          "Product successfully updated"
        );
      }

      // ==============================
      // CREATE
      // ==============================

      else {
        const response =
          await http.post(
            "/admin/products",
            payload
          );

        console.log(
          "CREATE RESPONSE:",
          response.data
        );

        message.success(
          "Product successfully created"
        );
      }

      navigate("/products");
    } catch (error: any) {
      console.log(
        "PRODUCT SAVE ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error?.response?.data
      );

      message.error(
        error?.response?.data?.message ||
          "Product saqlashda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // PAGE LOADING
  // ==============================

  if (pageLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-gray-500">
          <Spin size="large"/>
        </div>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="content-bg min-h-screen p-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              navigate("/products")
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-100 dark:border-[#292d2e] dark:bg-[#111414] dark:text-gray-300 dark:hover:bg-[#191d1d]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">
              {isEdit
                ? "Edit Product"
                : "Add New Product"}
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isEdit
                ? "Update product information"
                : "Create a new product"}
            </p>
          </div>

        </div>

        <div className="flex gap-2">

          <Button
            size="large"
            onClick={() =>
              navigate("/products")
            }
          >
            Cancel
          </Button>

          <Button
            type="primary"
            size="large"
            loading={loading}
            icon={
              <Save size={17} />
            }
            onClick={handleSubmit}
          >
            {isEdit
              ? "Update Product"
              : "Save Product"}
          </Button>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">

        {/* ============================== */}
        {/* LEFT */}
        {/* ============================== */}

        <div className="space-y-5">

          {/* BASIC INFORMATION */}

          <div className="content-mood rounded-xl border border-gray-200 bg-white p-6 dark:border-[#25282a] dark:bg-[#111414]">

            <h2 className="mb-5 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* NAME */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Product Name
                </label>

                <Input
                  className="content-input"
                  size="large"
                  value={form.name}
                  placeholder="Acer Nitro 27"
                  onChange={(e) =>
                    updateForm(
                      "name",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* SKU */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  SKU
                </label>

                <Input
                  className="content-input"
                  size="large"
                  value={form.sku}
                  placeholder="ACER-NITRO27"
                  onChange={(e) =>
                    updateForm(
                      "sku",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* BARCODE */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Barcode
                </label>

                <Input
                  className="content-input"
                  size="large"
                  value={form.barcode}
                  placeholder="Optional"
                  onChange={(e) =>
                    updateForm(
                      "barcode",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* SHORT DESCRIPTION */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Short Description
                </label>

                <Input
                  className="content-input"
                  size="large"
                  value={
                    form.shortDescription
                  }
                  placeholder="165Hz gaming monitor"
                  onChange={(e) =>
                    updateForm(
                      "shortDescription",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <Input.TextArea
                  className="content-input"
                  rows={5}
                  value={
                    form.description
                  }
                  placeholder="Product description..."
                  onChange={(e) =>
                    updateForm(
                      "description",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>

          {/* PRICING */}

          <div className="content-mood rounded-xl border border-gray-200 bg-white p-6 dark:border-[#25282a] dark:bg-[#111414]">

            <h2 className="mb-5 text-lg font-semibold">
              Pricing
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Price
                </label>

                <InputNumber
                  size="large"
                  className="content-input w-full!"
                  min={0}
                  value={form.price}
                  placeholder="3599000"
                  onChange={(value) =>
                    updateForm(
                      "price",
                      value
                    )
                  }
                  addonAfter="UZS"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Old Price
                </label>

                <InputNumber
                  size="large"
                  className="content-input !w-full"
                  min={0}
                  value={form.oldPrice}
                  placeholder="3999000"
                  onChange={(value) =>
                    updateForm(
                      "oldPrice",
                      value
                    )
                  }
                  addonAfter="UZS"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Discount
                </label>

                <InputNumber
                  size="large"
                  className="content-input w-full!"
                  min={0}
                  max={100}
                  value={
                    form.discountPercent
                  }
                  placeholder="10"
                  onChange={(value) =>
                    updateForm(
                      "discountPercent",
                      value || 0
                    )
                  }
                  addonAfter="%"
                />

              </div>

            </div>

          </div>

          {/* INVENTORY */}

          <div className="content-mood rounded-xl border border-gray-200 bg-white p-6 dark:border-[#25282a] dark:bg-[#111414]">

            <h2 className="mb-5 text-lg font-semibold">
              Inventory
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Stock
                </label>

                <InputNumber
                  size="large"
                  className="content-input w-full!"
                  min={0}
                  value={form.stock}
                  onChange={(value) =>
                    updateForm(
                      "stock",
                      value || 0
                    )
                  }
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Low Stock Threshold
                </label>

                <InputNumber
                  size="large"
                  className="content-input w-full!"
                  min={0}
                  value={
                    form.lowStockThreshold
                  }
                  onChange={(value) =>
                    updateForm(
                      "lowStockThreshold",
                      value || 0
                    )
                  }
                />

              </div>

            </div>

          </div>

          {/* ORGANIZATION */}

          <div className="content-mood rounded-xl border border-gray-200 bg-white p-6 dark:border-[#25282a] dark:bg-[#111414]">

            <h2 className="mb-5 text-lg font-semibold">
              Organization
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Brand
                </label>

                <Select
                  size="large"
                  className="content-input w-full"
                  placeholder="Select brand"
                  value={
                    form.brandId ||
                    undefined
                  }
                  onChange={(value) =>
                    updateForm(
                      "brandId",
                      value
                    )
                  }
                  options={brands.map(
                    (brand) => ({
                      label:
                        brand.name,
                      value:
                        brand.id,
                    })
                  )}
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <Select
                  size="large"
                  className="content-input w-full"
                  placeholder="Select category"
                  value={
                    form.categoryId ||
                    undefined
                  }
                  onChange={(value) =>
                    updateForm(
                      "categoryId",
                      value
                    )
                  }
                  options={categories.map(
                    (category) => ({
                      label:
                        category.name,
                      value:
                        category.id,
                    })
                  )}
                />

              </div>

            </div>

          </div>

        </div>

        {/* ============================== */}
        {/* RIGHT */}
        {/* ============================== */}

        <div className="space-y-5">

          {/* PRODUCT IMAGES */}

          <div className="content-mood rounded-xl border border-gray-200 bg-white p-6 dark:border-[#25282a] dark:bg-[#111414]">

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-lg font-semibold">
                Product Images
              </h2>

              <Button
                type="primary"
                icon={
                  <ImagePlus size={16} />
                }
                onClick={addImageUrl}
              >
                Add Image
              </Button>

            </div>

            {/* NO IMAGE */}

            {images.length === 0 ? (

              <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center dark:border-[#303535]">

                <ImagePlus
                  size={35}
                  className="mx-auto mb-3 text-gray-400"
                />

                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Add Product Image
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Enter image URL
                </p>

                <Button
                  className="mt-4"
                  onClick={addImageUrl}
                >
                  Add Image URL
                </Button>

              </div>

            ) : (

              <div className="space-y-4">

                {images.map(
                  (
                    image,
                    index
                  ) => (

                    <div
                      key={index}
                      className={`rounded-xl border p-4 ${
                        image.isMain
                          ? "border-blue-500 dark:border-blue-500"
                          : "border-gray-200 dark:border-[#292d2e]"
                      }`}
                    >

                      <div className="mb-3 flex items-center justify-between">

                        <span className="text-sm font-medium">
                          Image{" "}
                          {index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                      </div>

                      {/* URL */}

                      <Input
                        size="large"
                        className="content-input"
                        placeholder="https://example.com/image.jpg"
                        value={
                          image.url
                        }
                        onChange={(
                          e
                        ) =>
                          updateImageUrl(
                            index,
                            e.target.value
                          )
                        }
                      />

                      {/* PREVIEW */}

                      {image.url && (
                        <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 dark:border-[#292d2e]">

                          <img
                            src={
                              image.url
                            }
                            alt={
                              image.alt ||
                              form.name
                            }
                            className="h-48 w-full object-cover"
                            onError={(
                              e
                            ) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        </div>
                      )}

                      {/* MAIN */}

                      <div className="mt-3 flex items-center justify-between">

                        {image.isMain ? (

                          <span className="rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                            Main image
                          </span>

                        ) : (

                          <button
                            type="button"
                            onClick={() =>
                              setMainImage(
                                index
                              )
                            }
                            className="text-xs text-gray-500 hover:text-blue-500"
                          >
                            Set as main
                          </button>

                        )}

                      </div>

                    </div>

                  )
                )}

                <Button
                  block
                  icon={
                    <ImagePlus
                      size={16}
                    />
                  }
                  onClick={
                    addImageUrl
                  }
                >
                  Add Another Image
                </Button>

              </div>

            )}

          </div>

          {/* PRODUCT STATUS */}

          <div className="content-mood rounded-xl border border-gray-200 bg-white p-6 dark:border-[#25282a] dark:bg-[#111414]">

            <h2 className="mb-5 text-lg font-semibold">
              Product Status
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium">
                    Active
                  </p>

                  <p className="text-xs text-gray-400">
                    Product visible to customers
                  </p>

                </div>

                <Switch
                  checked={
                    form.isActive
                  }
                  onChange={(
                    value
                  ) =>
                    updateForm(
                      "isActive",
                      value
                    )
                  }
                />

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium">
                    Featured
                  </p>

                  <p className="text-xs text-gray-400">
                    Show in featured products
                  </p>

                </div>

                <Switch
                  checked={
                    form.isFeatured
                  }
                  onChange={(
                    value
                  ) =>
                    updateForm(
                      "isFeatured",
                      value
                    )
                  }
                />

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium">
                    New Product
                  </p>

                  <p className="text-xs text-gray-400">
                    Mark product as new
                  </p>

                </div>

                <Switch
                  checked={
                    form.isNew
                  }
                  onChange={(
                    value
                  ) =>
                    updateForm(
                      "isNew",
                      value
                    )
                  }
                />

              </div>

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium">
                    Popular
                  </p>

                  <p className="text-xs text-gray-400">
                    Mark product as popular
                  </p>

                </div>

                <Switch
                  checked={
                    form.isPopular
                  }
                  onChange={(
                    value
                  ) =>
                    updateForm(
                      "isPopular",
                      value
                    )
                  }
                />

              </div>

            </div>

          </div>

          {/* PREVIEW */}

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/30 dark:bg-blue-500/5">

            <div className="flex gap-3">

              <Sparkles
                size={20}
                className="shrink-0 text-blue-500"
              />

              <div>

                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Product ready
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Fill in the product
                  information and click{" "}
                  <b>
                    {isEdit
                      ? "Update Product"
                      : "Save Product"}
                  </b>
                  .
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AddProduct;
