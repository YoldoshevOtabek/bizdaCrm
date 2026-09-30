import { useMemo, useState } from "react";
import { Button, Empty, Input, Popconfirm, Select, Spin, Tag } from "antd";

import { Edit3, Plus, Search, Trash2, Package, Star, Zap } from "lucide-react";

import useProducts from "../hooks/useProducts";
import useDeleteProduct from "../hooks/useDeleteProducts";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const { productData, isLoading, isError } = useProducts();

  const deleteProduct = useDeleteProduct();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const products = useMemo(() => {
    if (Array.isArray(productData)) {
      return productData;
    }

    return productData?.data || productData?.products || [];
  }, [productData]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(searchValue) ||
        product.sku?.toLowerCase().includes(searchValue) ||
        product.brand?.name?.toLowerCase().includes(searchValue) ||
        product.category?.name?.toLowerCase().includes(searchValue);

      if (!matchesSearch) return false;

      if (activeFilter === "active") {
        return product.isActive;
      }

      if (activeFilter === "inactive") {
        return !product.isActive;
      }

      if (activeFilter === "low") {
        return product.availableStock <= product.lowStockThreshold;
      }

      if (activeFilter === "new") {
        return product.isNew;
      }

      return true;
    });
  }, [products, search, activeFilter]);

  const handleDelete = async (id: string) => {
    await deleteProduct.mutateAsync(id);
  };

  const getProductImage = (product: any) => {
    const images = product?.images;
    if (!images) {
      return "";
    }
    if (Array.isArray(images)) {
      const mainImage = images.find(
        (img: any) =>
          img?.isMain === true &&
          typeof img?.url === "string" &&
          img.url.trim() !== ""
      );
      if (mainImage?.url) {
        return mainImage.url;
      }
      const firstImage = images.find(
        (img: any) => typeof img?.url === "string" && img.url.trim() !== ""
      );
      return firstImage?.url || "";
    }
    if (typeof images === "object" && typeof images.url === "string") {
      return images.url;
    }
    return "";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price);
  };

  if (isError) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-red-500 dark:border-red-900 dark:bg-red-950/20">
          Products yuklashda xatolik yuz berdi
        </div>
      </div>
    );
  }

  return (
    <div className="content-bg min-h-full bg-gray-50 p-6 dark:bg-[#0A0C0C]">
      {/* Header */}

      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold ">Products</h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your products and inventory
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<Plus size={18} />}
          onClick={() => navigate("/products/add")}
          className="!flex !items-center !gap-2"
        >
          Add Product
        </Button>
      </div>

      {/* Stats */}

      <div className=" mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="content-mood rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#25282a] dark:bg-[#111414]">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-blue-50 p-2.5 dark:bg-blue-500/10">
              <Package size={21} className="text-blue-500" />
            </div>
          </div>

          <p className="text-sm ">Total Products</p>

          <h3 className="mt-1 text-2xl font-bold ">{products.length}</h3>
        </div>

        <div className="content-mood rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#25282a] dark:bg-[#111414]">
          <div className="mb-4">
            <div className="w-fit rounded-lg bg-green-50 p-2.5 dark:bg-green-500/10">
              <Zap size={21} className="text-green-500" />
            </div>
          </div>

          <p className="text-sm ">Active Products</p>

          <h3 className="mt-1 text-2xl font-bold ">
            {products.filter((item: any) => item.isActive).length}
          </h3>
        </div>

        <div className="content-mood rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#25282a] dark:bg-[#111414]">
          <div className="mb-4">
            <div className="w-fit rounded-lg bg-orange-50 p-2.5 dark:bg-orange-500/10">
              <Package size={21} className="text-orange-500" />
            </div>
          </div>

          <p className="text-sm ">Low Stock</p>

          <h3 className="mt-1 text-2xl font-bold ">
            {
              products.filter(
                (item: any) => item.availableStock <= item.lowStockThreshold
              ).length
            }
          </h3>
        </div>

        <div className="content-mood rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#25282a] dark:bg-[#111414]">
          <div className="mb-4">
            <div className="w-fit rounded-lg bg-purple-50 p-2.5 dark:bg-purple-500/10">
              <Star size={21} className="text-purple-500" />
            </div>
          </div>

          <p className="text-sm ">Featured</p>

          <h3 className="mt-1 text-2xl font-bold ">
            {products.filter((item: any) => item.isFeatured).length}
          </h3>
        </div>
      </div>

      {/* Filters */}

      <div className="content-mood mb-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-[#25282a] dark:bg-[#111414] md:flex-row">
        <Input
          size="large"
          prefix={<Search size={18} className=" text-gray-400" />}
          placeholder="Search product, SKU, brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="content-input md:max-w-md"
        />

        <Select
          size="large"
          value={activeFilter}
          onChange={setActiveFilter}
          className="content-input w-full md:w-48"
          options={[
            {
              label: "All Products",
              value: "all",
            },
            {
              label: "Active",
              value: "active",
            },
            {
              label: "Inactive",
              value: "inactive",
            },
            {
              label: "Low Stock",
              value: "low",
            },
            {
              label: "New Products",
              value: "new",
            },
          ]}
        />
      </div>

      {/* Products */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-[#25282a] dark:bg-[#111414]">
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex h-[400px] items-center justify-center">
            <Empty
              description={
                <span className="text-gray-500 dark:text-gray-400">
                  No products found
                </span>
              }
            />
          </div>
        ) : (
          <div className="overflow-hidden w-full">
            <table className="w-full table-fixed ">
              <thead>
                <tr className=" border-b border-gray-200 bg-gray-50 dark:border-[#25282a] dark:bg-[#0D1010]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Brand
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product: any) => {
                  console.log("PRODUCT:", product);
                  console.log("IMAGES:", product.images);
                  const image = getProductImage(product);

                  console.log("IMAGE URL:", image);

                  const isLowStock =
                    product.availableStock <= product.lowStockThreshold;

                  return (
                    <tr
                      key={product.id}
                      className="content-mood border-b border-gray-100 transition hover:bg-gray-50 dark:border-[#202324] dark:hover:bg-[#171a1a]"
                    >
                      {/* Product */}

                      <td className="px-1.5 py-3">
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-[#292d2e] dark:bg-[#0A0C0C]">
                            {image ? (
                              <img
                                src={image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                                onLoad={() => {
                                  console.log("RASM YUKLANDI:", image);
                                }}
                                onError={() => {
                                  console.log("RASM YUKLANMADI:", image);
                                }}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Package size={20} className="text-black" />
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <p className="max-w-full truncate font-semibold dark:text-white">
                                {product.name}
                              </p>

                              {product.isNew && <Tag color="blue">NEW</Tag>}
                            </div>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Brand */}

                      <td className="px-3 py-4">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {product.brand?.name || "-"}
                        </span>
                      </td>

                      {/* Category */}

                      <td className="px-6 py-4">
                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-[#202424] dark:text-gray-300">
                          {product.category?.name || "-"}
                        </span>
                      </td>

                      {/* Price */}

                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold  ">
                            {formatPrice(product.price)} so'm
                          </p>

                          {product.oldPrice && (
                            <p className="text-xs text-gray-400 line-through">
                              {formatPrice(product.oldPrice)} so'm
                            </p>
                          )}

                          {product.discountPercent > 0 && (
                            <span className="text-xs font-medium text-green-500">
                              -{product.discountPercent}%
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock */}

                      <td className="px-6 py-4">
                        <div>
                          <p
                            className={`font-semibold ${
                              isLowStock
                                ? "text-orange-500"
                                : "dark:text-gray-300"
                            }`}
                          >
                            {product.availableStock}
                          </p>

                          <p className="text-xs text-gray-400">
                            / {product.stock} total
                          </p>
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {product.isActive ? (
                            <Tag color="success">Active</Tag>
                          ) : (
                            <Tag color="default">Inactive</Tag>
                          )}

                          {product.isFeatured && (
                            <Tag color="gold">Featured</Tag>
                          )}
                        </div>
                      </td>

                      {/* Actions */}

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(`/products/edit/${product.id}`)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 dark:border-[#292d2e] dark:text-gray-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                          >
                            <Edit3 size={16} />
                          </button>

                          <Popconfirm
                            title="Delete product?"
                            description="Bu productni o'chirishni xohlaysizmi?"
                            okText="Delete"
                            cancelText="Cancel"
                            onConfirm={() => handleDelete(product.id)}
                            okButtonProps={{
                              danger: true,
                              loading: deleteProduct.isPending,
                            }}
                          >
                            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-500 hover:bg-red-50 hover:text-red-500 dark:border-[#292d2e] dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                              <Trash2 size={16} />
                            </button>
                          </Popconfirm>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
    </div>
  );
};
