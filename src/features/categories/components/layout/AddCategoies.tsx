import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Form, Input, InputNumber, Modal, Switch } from "antd";
import FormActions from "../../../../components/FormActions";
import ImageUpload from "../../../../components/ImageUpload";
import useOpenCreateQuery from "../../../../hooks/useOpenCreateQuery";
import useCreateCategory from "../../hooks/useCreateCategory";
import type { CategoryFormValues } from "../../types/categories";

export default function AddCategoies() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<CategoryFormValues>();
  const { createCategory, isPending } = useCreateCategory()

  const handleOpen = () => {
    setOpen(true);
  };
  useOpenCreateQuery(handleOpen);

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values: CategoryFormValues) => {
    createCategory(values, {
      onSuccess: () => {
        setOpen(false);
        form.resetFields();
      },
    });
  };

  return (
    <>
      <button onClick={handleOpen} className="btn-primary">
        <PlusCircle size={18} />
        Add Category
      </button>

      <Modal
        title="Add Category"
        open={open}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            isActive: true,
            sortOrder: 0,
          }}
        >
          {/* Name */}
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter category name",
              },
            ]}
          >
            <Input placeholder="e.g. Smartphones" />
          </Form.Item>

          {/* Slug */}
          <Form.Item
            label="Slug"
            name="slug"
            rules={[
              {
                required: true,
                message: "Please enter slug",
              },
            ]}
          >
            <Input placeholder="e.g. smartphones" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter category description"
            />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <ImageUpload folder="categories" />
          </Form.Item>

          {/* Parent ID */}
          {/* <Form.Item
            label="Parent ID"
            name="parentId"
          >
            <Input placeholder="Enter parent category ID" />
          </Form.Item> */}

          {/* Sort Order */}
          <Form.Item
            label="Sort Order"
            name="sortOrder"
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Enter sort order"
            />
          </Form.Item>

          {/* Active */}
          <Form.Item
            label="Active"
            name="isActive"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <FormActions
            onCancel={handleCancel}
            loading={isPending}
            submitLabel="Add Category"
          />
        </Form>
      </Modal>
    </>
  );
}

