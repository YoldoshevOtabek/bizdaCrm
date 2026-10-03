
import { SquarePen } from "lucide-react";
import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useUser } from "../../../auth/context/UserContext";
import ImageUpload from "../../../../components/ImageUpload";
import useUpdateProfile from "../../hooks/useUpdateProfile";

interface ProfileUpdateProps {
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export default function ProfileUpdate(_props: ProfileUpdateProps = {}) {
  const { user } = useUser()
  const [form] = Form.useForm();
  const { updateProfile, isPending } = useUpdateProfile()

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user });
    }
  }, [user]);

  const handleSubmit = (values: {
    firstName: string;
    lastName: string;
    phone: string;
    avatar?: string;
  }) => {
    const updateData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      avatar: values.avatar,
    };
    updateProfile(updateData)
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-bold">
            Profile Update
          </h3>

          <p className="mt-1 text-[13px] text-muted">
            Update your personal information
          </p>
        </div>

        <div className="btn-ghost h-10">
          <SquarePen size={17} />
          <span className="text-[14px]">Edit</span>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="mt-6"
      >
        {/* ================= AVATAR ================= */}
        <div className="mb-8 flex items-center gap-5">
          <Form.Item name="avatar" className="mb-0">
            <ImageUpload shape="circle" />
          </Form.Item>

          <div>
            <p className="text-xs text-muted">
              JPG, PNG or WEBP. Maximum size 5MB.
            </p>
          </div>
        </div>

        {/* ================= PERSONAL INFO ================= */}
        <div className="mb-5">
          <h4 className="mb-4 text-[15px] font-semibold">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* First Name */}
            <Form.Item
              label={
                <span className="font-medium">
                  First Name
                </span>
              }
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Ali"
                className="!rounded-xl"
              />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              label={
                <span className="font-medium">
                  Last Name
                </span>
              }
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Aliyev"
                className="!rounded-xl"
              />
            </Form.Item>

          </div>

          {/* Phone */}
          <Form.Item
            label={
              <span className="font-medium">
                Phone Number
              </span>
            }
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="+998912345678"
              className="!rounded-xl"
            />
          </Form.Item>
        </div>

        {/* ================= READONLY INFO ================= */}
        <div className="border-t border-line pt-6">

          <h4 className="mb-4 text-[15px] font-semibold">
            Account Information
          </h4>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Email */}
            <Form.Item
              label={
                <span className="font-medium">
                  E-mail
                </span>
              }
            >
              <Input
                size="large"
                value={user?.email}
                disabled
                className="!rounded-xl"
              />
            </Form.Item>

            {/* Role */}
            <Form.Item
              label={
                <span className="font-medium">
                  Role
                </span>
              }
            >
              <Input
                size="large"
                value={user?.role}
                disabled
                className="!rounded-xl"
              />
            </Form.Item>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Status */}
            <Form.Item
              label={
                <span className="font-medium">
                  Status
                </span>
              }
            >
              <Input
                size="large"
                value={
                  user?.isActive
                    ? "Active"
                    : "Inactive"
                }
                disabled
                className="!rounded-xl"
              />
            </Form.Item>

            {/* User ID */}
            <Form.Item
              label={
                <span className="font-medium">
                  User ID
                </span>
              }
            >
              <Input
                size="large"
                value={user?.id}
                disabled
                className="!rounded-xl"
              />
            </Form.Item>

          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div
          className="
            mt-6
            flex justify-end
            border-t border-line
            pt-5
          "
        >
          <Button
            loading={isPending}
            type="primary"
            htmlType="submit"
            size="large"
            className="
              !h-11
              !rounded-xl
              !border-none
              !bg-[var(--app-primary)]
              !px-7
              !font-semibold
              !text-[var(--app-primary-text)]
            "
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
}

