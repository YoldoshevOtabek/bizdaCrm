import { Form, Input, Modal, Switch } from "antd";
import { useEffect, useRef } from "react";
import FormActions from "../../../components/FormActions";
import ImageUpload from "../../../components/ImageUpload";
import useCreateBrand from "../hooks/useCreateBrand";
import useUpdateBrand from "../hooks/useUpdateBrand";
import type { Brand, BrandFormValues } from "../types/brand";

const { TextArea } = Input;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function BrandFormModal({
  open,
  onClose,
  brand,
}: {
  open: boolean;
  onClose: () => void;
  brand?: Brand | null;
}) {
  const [form] = Form.useForm<BrandFormValues>();
  const slugTouched = useRef(false);
  const { createBrand, isPending: creating } = useCreateBrand();
  const { updateBrand, isPending: updating } = useUpdateBrand();
  const isEdit = Boolean(brand);

  useEffect(() => {
    if (!open) return;
    slugTouched.current = Boolean(brand?.slug);
    if (brand) {
      form.setFieldsValue({
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo: brand.logo,
        isActive: brand.isActive,
      });
    } else {
      form.resetFields();
    }
  }, [open, brand, form]);

  const handleCancel = () => {
    form.resetFields();
    slugTouched.current = false;
    onClose();
  };

  const handleSubmit = (values: BrandFormValues) => {
    if (isEdit && brand) {
      updateBrand(
        { payload: values, id: brand.id },
        { onSuccess: handleCancel },
      );
      return;
    }
    createBrand(values, { onSuccess: handleCancel });
  };

  return (
    <Modal
      title={isEdit ? "Edit Brand" : "Add Brand"}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={650}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ isActive: true }}
      >
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <Form.Item
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Brand nomini kiriting" }]}
          >
            <Input
              placeholder="Apple"
              onChange={(event) => {
                if (!slugTouched.current) {
                  form.setFieldValue("slug", slugify(event.target.value));
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
              prefix="/"
              placeholder="apple"
              onChange={() => {
                slugTouched.current = true;
              }}
            />
          </Form.Item>
        </div>
        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="Brand haqida..." />
        </Form.Item>
        <Form.Item
          label="Logo"
          name="logo"
          rules={[{ required: true, message: "Logo yuklang" }]}
        >
          <ImageUpload folder="categories" />
        </Form.Item>
        <Form.Item label="Status" name="isActive" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
        <FormActions
          onCancel={handleCancel}
          loading={creating || updating}
          submitLabel={isEdit ? "Save Changes" : "Add Brand"}
        />
      </Form>
    </Modal>
  );
}
