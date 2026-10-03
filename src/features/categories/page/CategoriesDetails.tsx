
import { useParams } from "react-router-dom";
import DetailHeader from "../../../components/DetailHeader";
import ImageUpload from "../../../components/ImageUpload";
import RemoteImg from "../../../components/RemoteImg";
import Spinner from "../../../components/Spinner";
import useCategoriesDetails from "../hooks/useCategoriesDetails";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Switch,
} from "antd";
import {
    Image as ImageIcon,
    Save,
    Tag,
    FileText,
    Settings2,
    Hash,
} from "lucide-react";
import useUpdateCategory from "../hooks/useUpdateCategory";
import type { CategoryFormValues } from "../types/categories";
import { useEffect } from "react";

export default function CategoriesDetails() {
    const { id } = useParams();
    const { data: { data } = {}, isLoading } = useCategoriesDetails(id || null);
    const [form] = Form.useForm<CategoryFormValues>();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data
                // name: data.name,
                // slug: data.slug,
                // description: data.description,
                // image: data.image,
                // sortOrder: data.sortOrder ?? 0,
                // isActive: data.isActive ?? true,
            });
        }
    }, [data, form]);

    const { updateCategory, isPending } = useUpdateCategory()

    const handleSubmit = (values: CategoryFormValues) => {
        updateCategory({ values, id });
    };

    if (isLoading) {
        return <Spinner variant="page" />;
    }




    return (
        <div>
                <DetailHeader
                    title="Category Details"
                    subtitle="Update category information"
                    backTo="/categories"
                />

                {/* ================= CONTENT ================= */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

                    {/* ================= FORM CARD ================= */}
                    <div className="card overflow-hidden">

                        {/* Card Header */}
                        <div className="border-b border-line px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                                    <Tag size={20} />
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        Category Information
                                    </h2>

                                    <p className="text-sm text-muted">
                                        Basic information about this category
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="p-6">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                            // initialValues={{
                            //   ...data,
                            //   isActive: data?.isActive ?? true,
                            //   sortOrder: data?.sortOrder ?? 0,
                            // }}
                            >

                                {/* Name + Slug */}
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    <Form.Item
                                        label={
                                            <span className="font-medium">
                                                Category Name
                                            </span>
                                        }
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter category name",
                                            },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            prefix={
                                                <Tag
                                                    size={17}
                                                    className="mr-1 text-muted"
                                                />
                                            }
                                            placeholder="e.g. Smartphones"
                                            className="!rounded-xl"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <span className="font-medium">
                                                Slug
                                            </span>
                                        }
                                        name="slug"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter slug",
                                            },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            prefix={
                                                <Hash
                                                    size={17}
                                                    className="mr-1 text-muted"
                                                />
                                            }
                                            placeholder="e.g. smartphones"
                                            className="!rounded-xl"
                                        />
                                    </Form.Item>

                                </div>

                                {/* Description */}
                                <Form.Item
                                    label={
                                        <span className="font-medium">
                                            Description
                                        </span>
                                    }
                                    name="description"
                                >
                                    <Input.TextArea
                                        rows={5}
                                        placeholder="Enter category description..."
                                        className="!rounded-xl"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                Image
                                            </span>
                                            <span className="text-xs text-muted">
                                                Optional
                                            </span>
                                        </div>
                                    }
                                    name="image"
                                >
                                    <ImageUpload folder="categories" />
                                </Form.Item>

                                {/* Settings */}
                                <div className="
                  mt-7 mb-6
                  flex items-center gap-2
                  border-b border-line
                  pb-4
                ">
                                    <Settings2
                                        size={19}
                                        className="text-brand"
                                    />

                                    <div>
                                        <h3 className="font-semibold">
                                            Category Settings
                                        </h3>

                                        <p className="text-xs text-muted">
                                            Configure category behavior
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* Sort Order */}
                                    <Form.Item
                                        label={
                                            <span className="font-medium">
                                                Sort Order
                                            </span>
                                        }
                                        name="sortOrder"
                                    >
                                        <InputNumber
                                            min={0}
                                            size="large"
                                            className="!w-full !rounded-xl"
                                            placeholder="0"
                                        />
                                    </Form.Item>

                                    {/* Active */}
                                    <Form.Item
                                        label={
                                            <span className="font-medium">
                                                Status
                                            </span>
                                        }
                                    >
                                        <div
                                            className="
      flex h-10 items-center
      justify-between
      rounded-xl border border-line
      bg-canvas px-4
    "
                                        >
                                            <div>
                                                <div className="text-sm font-medium">
                                                    {data?.isActive ? "Active" : "Inactive"}
                                                </div>

                                                <div className="text-xs text-muted">
                                                    Show this category
                                                </div>
                                            </div>

                                            <Form.Item
                                                name="isActive"
                                                valuePropName="checked"
                                                noStyle
                                            >
                                                <Switch />
                                            </Form.Item>
                                        </div>
                                    </Form.Item>

                                </div>

                                {/* Actions */}
                                <div className="
                  mt-8 flex items-center
                  justify-end gap-3
                  border-t border-line
                  pt-6
                ">

                                    <Button
                                        loading={isPending}
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        icon={<Save size={17} />}
                                        className="
                      !h-11 !rounded-xl
                      !border-none
                      !bg-[var(--app-primary)]
                      !text-[var(--app-primary-text)]
                      !px-6
                      shadow-sm
                      hover:!bg-[var(--app-primary-hover)]
                    "
                                    >
                                        Save Changes
                                    </Button>
                                </div>

                            </Form>
                        </div>
                    </div>

                    {/* ================= PREVIEW ================= */}
                    <div className="space-y-6">

                        {/* Preview Card */}
                        <div className="card overflow-hidden">
                            <div className="border-b border-line px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <ImageIcon
                                        size={18}
                                        className="text-brand"
                                    />

                                    <h3 className="font-semibold">
                                        Category Preview
                                    </h3>
                                </div>
                            </div>

                            <div className="p-5">

                                <div className="
                  flex aspect-[4/3]
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  border border-line
                  bg-canvas
                ">
                                    {data?.image ? (
                                        <RemoteImg
                                            src={data.image}
                                            alt={data?.name || "Category"}
                                            className="
                        h-full w-full
                        object-cover
                      "
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <ImageIcon
                                                size={38}
                                                className="mx-auto text-muted"
                                            />

                                            <p className="mt-2 text-sm text-muted">
                                                No image available
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">
                                        {data?.name || "Category Name"}
                                    </h3>

                                    <p className="mt-1 text-sm text-muted">
                                        {data?.description ||
                                            "Category description will appear here."}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">

                                    <span className="
                    rounded-full
                    bg-canvas
                    px-3 py-1
                    text-xs font-medium
                    text-muted
                  ">
                                        /{data?.slug || "category-slug"}
                                    </span>

                                    <span
                                        className={`
                      rounded-full px-3 py-1
                      text-xs font-medium
                      ${data?.isActive
                                                ? "bg-green-50 text-green-600"
                                                : "bg-red-50 text-red-500"
                                            }
                    `}
                                    >
                                        {data?.isActive ? "Active" : "Inactive"}
                                    </span>

                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="card p-5">
                            <div className="flex items-start gap-3">

                                <div className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-500
                ">
                                    <FileText size={18} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold">
                                        Category tips
                                    </h3>

                                    <ul className="
                    mt-2 space-y-2
                    text-xs leading-5
                    text-muted
                  ">
                                        <li>
                                            • Use a short and descriptive category name.
                                        </li>

                                        <li>
                                            • Keep the slug lowercase and URL-friendly.
                                        </li>

                                        <li>
                                            • Use a high-quality category image.
                                        </li>

                                        <li>
                                            • Sort order determines the display position.
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
        </div>
    );
}

