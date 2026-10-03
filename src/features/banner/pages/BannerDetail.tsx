import { DatePicker, Form, Input, InputNumber, Modal, Switch, Tag } from "antd";
import dayjs from "dayjs";
import { Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailHeader from "../../../components/DetailHeader";
import FormActions from "../../../components/FormActions";
import ImageUpload from "../../../components/ImageUpload";
import InfoList from "../../../components/InfoList";
import Spinner from "../../../components/Spinner";
import { RemotePreview } from "../../../components/RemoteImg";
import useBannerDetails from "../hooks/useBannerDetails";
import useUpdateBanner from "../hooks/useUpdateBanner";
import type { BannerFormValues } from "../types/banner";

export default function BannerDetail() {
  const { id } = useParams();
  const { data, isLoading } = useBannerDetails(id || null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form] = Form.useForm<BannerFormValues>();
  const { updateBanner, isPending } = useUpdateBanner();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        subtitle: data.subtitle,
        image: data.image,
        mobileImage: data.mobileImage,
        buttonText: data.buttonText,
        link: data.link,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
        startDate: data.startDate ? dayjs(data.startDate) : null,
        endDate: data.endDate ? dayjs(data.endDate) : null,
      });
    }
  }, [data, form]);

  const handleSubmit = (values: BannerFormValues) => {
    updateBanner(
      {
        payload: {
          title: values.title,
          subtitle: values.subtitle,
          image: values.image,
          mobileImage: values.mobileImage,
          buttonText: values.buttonText,
          link: values.link,
          sortOrder: values.sortOrder,
          isActive: values.isActive,
          startDate: values.startDate?.toISOString(),
          endDate: values.endDate?.toISOString(),
        },
        id,
      },
      {
        onSuccess: () => setIsEditOpen(false),
      },
    );
  };

  if (isLoading) {
    return <Spinner variant="page" />;
  }

  if (!data) {
    return <div className="card text-sm text-muted">Banner topilmadi</div>;
  }

  return (
    <div className="space-y-4">
      <DetailHeader
        title={data.title}
        subtitle="Banner details"
        backTo="/banner"
        extra={
          <button type="button" className="btn-primary h-9 px-4 text-sm" onClick={() => setIsEditOpen(true)}>
            <Edit3 size={15} />
            Edit
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-3 text-sm font-semibold">Desktop Image</h3>
          <RemotePreview
            src={data.image}
            width="100%"
            height={220}
            style={{ objectFit: "cover", borderRadius: 12 }}
          />
        </div>
        <div className="card">
          <h3 className="mb-3 text-sm font-semibold">Mobile Image</h3>
          <RemotePreview
            src={data.mobileImage}
            width="100%"
            height={220}
            style={{ objectFit: "cover", borderRadius: 12 }}
          />
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Banner Information</h3>
          {data.isActive ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}
        </div>
        <InfoList
          items={[
            { label: "Title", value: data.title },
            { label: "Subtitle", value: data.subtitle },
            { label: "Button", value: data.buttonText },
            { label: "Link", value: data.link },
            { label: "Sort Order", value: data.sortOrder },
            { label: "Start Date", value: dayjs(data.startDate).format("DD.MM.YYYY HH:mm") },
            { label: "End Date", value: dayjs(data.endDate).format("DD.MM.YYYY HH:mm") },
            { label: "Created", value: dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") },
            { label: "Updated", value: dayjs(data.updatedAt).format("DD.MM.YYYY HH:mm") },
          ]}
        />
      </div>

      <Modal
        title="Edit Banner"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        footer={null}
        width={700}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title kiriting" }]}
            >
              <Input placeholder="Banner title" />
            </Form.Item>
            <Form.Item
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "Subtitle kiriting" }]}
            >
              <Input placeholder="Banner subtitle" />
            </Form.Item>
          </div>
          <Form.Item
            label="Desktop Image"
            name="image"
            rules={[{ required: true, message: "Desktop rasm yuklang" }]}
          >
            <ImageUpload folder="categories" shape="wide" />
          </Form.Item>
          <Form.Item
            label="Mobile Image"
            name="mobileImage"
            rules={[{ required: true, message: "Mobile rasm yuklang" }]}
          >
            <ImageUpload folder="categories" shape="wide" />
          </Form.Item>
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <Form.Item
              label="Button Text"
              name="buttonText"
              rules={[{ required: true, message: "Button text kiriting" }]}
            >
              <Input placeholder="Shop Now" />
            </Form.Item>
            <Form.Item
              label="Link"
              name="link"
              rules={[{ required: true, message: "Link kiriting" }]}
            >
              <Input placeholder="/products" />
            </Form.Item>
            <Form.Item
              label="Sort Order"
              name="sortOrder"
              rules={[{ required: true, message: "Sort order kiriting" }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item label="Status" name="isActive" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Start date tanlang" }]}
            >
              <DatePicker showTime className="w-full" format="DD.MM.YYYY HH:mm" />
            </Form.Item>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: "End date tanlang" }]}
            >
              <DatePicker showTime className="w-full" format="DD.MM.YYYY HH:mm" />
            </Form.Item>
          </div>
          <FormActions
            onCancel={() => setIsEditOpen(false)}
            loading={isPending}
            submitLabel="Save Changes"
          />
        </Form>
      </Modal>
    </div>
  );
}
