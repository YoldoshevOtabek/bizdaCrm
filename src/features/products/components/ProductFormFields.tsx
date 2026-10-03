import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import {
  DollarSign,
  Image as ImageIcon,
  Layers,
  Package,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import type { MutableRefObject } from "react";
import ImageUpload from "../../../components/ImageUpload";
import useBrands from "../../brands/hooks/useBrands";
import useCategories from "../../categories/hooks/useCategories";

const { TextArea } = Input;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const statusFields = [
  { name: "isActive", label: "Active", hint: "Do'konda ko'rinadi" },
  { name: "isFeatured", label: "Featured", hint: "Tanlanganlar ro'yxati" },
  { name: "isNew", label: "New", hint: "Yangi mahsulot belgisi" },
  { name: "isPopular", label: "Popular", hint: "Mashhurlar bo'limi" },
];

export default function ProductFormFields({
  slugTouched,
  enableAutoSlug = true,
}: {
  slugTouched: MutableRefObject<boolean>;
  enableAutoSlug?: boolean;
}) {
  const form = Form.useFormInstance();
  const { data: categories, isLoading } = useCategories();
  const { brands, isLoading: isLoadingBrands } = useBrands();

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Package size={16} className="text-brand" />
          <div>
            <h3 className="text-sm font-semibold">Asosiy ma'lumot</h3>
            <p className="text-xs text-muted">Nom, kategoriya va tavsif</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Product nomini kiriting" }]}
          >
            <Input
              size="large"
              placeholder="iPhone 15 Pro"
              onChange={(e) => {
                if (enableAutoSlug && !slugTouched.current) {
                  form.setFieldValue("slug", slugify(e.target.value));
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Slug kiriting" }]}
          >
            <Input
              size="large"
              placeholder="iphone-15-pro"
              onChange={() => {
                slugTouched.current = true;
              }}
            />
          </Form.Item>
          <Form.Item
            label="SKU"
            name="sku"
            rules={[{ required: true, message: "SKU kiriting" }]}
          >
            <Input size="large" placeholder="IPH15P-256" />
          </Form.Item>
          <Form.Item label="Barcode" name="barcode">
            <Input size="large" placeholder="123456789" />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brandId"
            rules={[{ required: true, message: "Brand tanlang" }]}
          >
            <Select
              size="large"
              placeholder="Select brand"
              loading={isLoadingBrands}
              showSearch
              optionFilterProp="label"
              options={brands?.data?.map((item: { id: string; name: string }) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Category tanlang" }]}
          >
            <Select
              size="large"
              placeholder="Select category"
              loading={isLoading}
              showSearch
              optionFilterProp="label"
              options={categories?.data?.map((item: { id: string; name: string }) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
        </div>
        <Form.Item label="Short Description" name="shortDescription">
          <Input size="large" placeholder="Premium smartphone with A17 Pro chip" />
        </Form.Item>
        <Form.Item label="Description" name="description" className="mb-0">
          <TextArea rows={4} placeholder="Product haqida batafsil ma'lumot..." />
        </Form.Item>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Star size={16} className="text-brand" />
          <div>
            <h3 className="text-sm font-semibold">Status</h3>
            <p className="text-xs text-muted">Qanday ko'rinishini belgilang</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {statusFields.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl border border-line bg-canvas px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted">{item.hint}</p>
              </div>
              <Form.Item name={item.name} valuePropName="checked" className="mb-0">
                <Switch />
              </Form.Item>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign size={16} className="text-brand" />
          <div>
            <h3 className="text-sm font-semibold">Narx va ombor</h3>
            <p className="text-xs text-muted">Sotuv narxi, chegirma va qoldiq</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price kiriting" }]}
          >
            <InputNumber size="large" className="w-full" min={0} placeholder="14999000" addonAfter="UZS" />
          </Form.Item>
          <Form.Item label="Old Price" name="oldPrice">
            <InputNumber size="large" className="w-full" min={0} placeholder="15999000" addonAfter="UZS" />
          </Form.Item>
          <Form.Item label="Discount" name="discountPercent">
            <InputNumber size="large" className="w-full" min={0} max={100} placeholder="10" addonAfter="%" />
          </Form.Item>
          <Form.Item label="Stock" name="stock">
            <InputNumber size="large" className="w-full" min={0} placeholder="100" />
          </Form.Item>
          <Form.Item label="Low Stock Threshold" name="lowStockThreshold" className="mb-0 sm:col-span-2">
            <InputNumber size="large" className="w-full max-w-xs" min={0} placeholder="5" />
          </Form.Item>
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <ImageIcon size={16} className="text-brand" />
          <div>
            <h3 className="text-sm font-semibold">Product rasmlari</h3>
            <p className="text-xs text-muted">Rasm yuklang va asosiy rasmni belgilang.</p>
          </div>
        </div>
        <Form.List name="images">
          {(fields, { add, remove }) => (
            <div className="space-y-3">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="rounded-xl border border-line bg-canvas p-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[auto_1fr_110px_auto]">
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      label="Image"
                      className="mb-0"
                      rules={[{ required: true, message: "Rasm yuklang" }]}
                    >
            <ImageUpload />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "alt"]} label="Alt" className="mb-0">
                      <Input placeholder="iPhone 15 Pro" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "sortOrder"]} label="Order" className="mb-0">
                      <InputNumber className="w-full" min={0} placeholder="0" />
                    </Form.Item>
                    <div className="flex items-end pb-1">
                      <button
                        type="button"
                        onClick={() => remove(name)}
                        className="grid h-10 w-10 place-items-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, "isMain"]}
                    valuePropName="checked"
                    className="mb-0 mt-3"
                  >
                    <Switch size="small" checkedChildren="Asosiy" unCheckedChildren="Oddiy" />
                  </Form.Item>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    url: "",
                    alt: "",
                    isMain: fields.length === 0,
                    sortOrder: fields.length,
                  })
                }
                icon={<Plus size={16} />}
                block
              >
                Rasm qo'shish
              </Button>
            </div>
          )}
        </Form.List>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Layers size={16} className="text-brand" />
          <div>
            <h3 className="text-sm font-semibold">Product variantlari</h3>
            <p className="text-xs text-muted">Masalan: 256GB / 8GB RAM</p>
          </div>
        </div>
        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <div className="space-y-3">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="rounded-xl border border-line bg-canvas p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold">Variant #{name + 1}</span>
                    <button
                      type="button"
                      onClick={() => remove(name)}
                      className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                      O'chirish
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-x-3 md:grid-cols-3">
                    <Form.Item
                      {...restField}
                      name={[name, "sku"]}
                      label="SKU"
                      rules={[{ required: true, message: "SKU kiriting" }]}
                    >
                      <Input placeholder="IPH15P-256" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "price"]} label="Price">
                      <InputNumber className="w-full" min={0} placeholder="14999000" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "stock"]} label="Stock">
                      <InputNumber className="w-full" min={0} placeholder="10" />
                    </Form.Item>
                  </div>
                  <div className="grid grid-cols-1 gap-x-3 md:grid-cols-3">
                    <Form.Item
                      {...restField}
                      name={[name, "attributes", "storage"]}
                      label="Storage"
                      className="mb-0"
                    >
                      <Select
                        placeholder="Storage"
                        options={[
                          { value: "128GB", label: "128GB" },
                          { value: "256GB", label: "256GB" },
                          { value: "512GB", label: "512GB" },
                          { value: "1TB", label: "1TB" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "attributes", "ram"]}
                      label="RAM"
                      className="mb-0"
                    >
                      <Select
                        placeholder="RAM"
                        options={[
                          { value: "4GB", label: "4GB" },
                          { value: "8GB", label: "8GB" },
                          { value: "12GB", label: "12GB" },
                          { value: "16GB", label: "16GB" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "isActive"]}
                      label="Active"
                      valuePropName="checked"
                      initialValue={true}
                      className="mb-0"
                    >
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    sku: "",
                    price: 0,
                    stock: 0,
                    attributes: { storage: "", ram: "" },
                    isActive: true,
                  })
                }
                icon={<Plus size={16} />}
                block
              >
                Variant qo'shish
              </Button>
            </div>
          )}
        </Form.List>
      </div>
    </div>
  );
}
