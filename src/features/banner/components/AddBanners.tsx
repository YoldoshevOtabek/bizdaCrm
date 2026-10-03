
import { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Modal, Switch } from "antd";
import { PlusCircle } from "lucide-react";
import FormActions from "../../../components/FormActions";
import useOpenCreateQuery from "../../../hooks/useOpenCreateQuery";
import ImageUpload from "../../../components/ImageUpload";
import useCreateBanner from "../hooks/useCreateBanner";
import type { BannerFormValues } from "../types/banner";

export default function AddBanners() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<BannerFormValues>();
    useOpenCreateQuery(() => setOpen(true));
    const { createBanner, isPending } = useCreateBanner()

    const handleSubmit = (values: BannerFormValues) => {
        const payload = {
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
        };

        createBanner(payload, {
            onSuccess: () => {
                form.resetFields();
                setOpen(false);
            }
        })
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    return (
        <>
            <button
                className="btn-primary flex items-center gap-2"
                onClick={() => setOpen(true)}
            >
                <PlusCircle size={18} />
                Add Banner
            </button>

            <Modal
                title="Add Banner"
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
                    initialValues={{
                        sortOrder: 0,
                        isActive: true,
                    }}
                >
                    <div className="grid grid-cols-2 gap-x-4">
                        {/* Title */}
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter banner title",
                                },
                            ]}
                        >
                            <Input placeholder="Elektronikalar" />
                        </Form.Item>

                        {/* Subtitle */}
                        <Form.Item
                            label="Subtitle"
                            name="subtitle"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter subtitle",
                                },
                            ]}
                        >
                            <Input placeholder="Up to 50% discounts" />
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

                    <div className="grid grid-cols-2 gap-x-4">
                        {/* Button Text */}
                        <Form.Item
                            label="Button Text"
                            name="buttonText"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter button text",
                                },
                            ]}
                        >
                            <Input placeholder="Shop Now" />
                        </Form.Item>

                        {/* Link */}
                        <Form.Item
                            label="Link"
                            name="link"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter link",
                                },
                            ]}
                        >
                            <Input placeholder="/products" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        {/* Sort Order */}
                        <Form.Item
                            label="Sort Order"
                            name="sortOrder"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter sort order",
                                },
                            ]}
                        >
                            <InputNumber
                                min={0}
                                className="w-full"
                                placeholder="0"
                            />
                        </Form.Item>

                        {/* Status */}
                        <Form.Item
                            label="Status"
                            name="isActive"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="Active" unCheckedChildren="Off" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        {/* Start Date */}
                        <Form.Item
                            label="Start Date"
                            name="startDate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select start date",
                                },
                            ]}
                        >
                            <DatePicker
                                showTime
                                className="w-full"
                                format="DD.MM.YYYY HH:mm"
                            />
                        </Form.Item>

                        {/* End Date */}
                        <Form.Item
                            label="End Date"
                            name="endDate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select end date",
                                },
                            ]}
                        >
                            <DatePicker
                                showTime
                                className="w-full"
                                format="DD.MM.YYYY HH:mm"
                            />
                        </Form.Item>
                    </div>

                    <FormActions
                        onCancel={handleCancel}
                        loading={isPending}
                        submitLabel="Create Banner"
                    />
                </Form>
            </Modal>
        </>
    );
}

