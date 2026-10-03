
import { HelpCircle, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import useUpdatePassword from "../../hooks/useUpdatePassword";

export default function ProfileChangePassword() {
  const [form] = Form.useForm();
  const { updatePassword, isPending } = useUpdatePassword()
  const handleSubmit = (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    updatePassword(
      {
        "currentPassword": values?.currentPassword,
        "newPassword": values?.newPassword
      }
    )
  };

  return (
    <div className="card p-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
            <LockKeyhole size={19} />
          </div>

          <div>
            <h3 className="text-[18px] font-bold">
              Change Password
            </h3>

            <p className="mt-0.5 text-[13px] text-muted">
              Update your account password
            </p>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-[14px] text-brand transition hover:opacity-80"
        >
          <span>Need help</span>
          <HelpCircle size={18} />
        </Link>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          label={
            <span className="font-medium">
              Current Password
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please enter your current password",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter current password"
            className="!rounded-xl"
          />
        </Form.Item>

        <div className="-mt-2 mb-5">
          <Link
            to="/forgot-password"
            className="
              text-[13px]
              text-brand
              transition
              hover:underline
            "
          >
            Forgot Current Password? Click here
          </Link>
        </div>

        {/* New Password */}
        <Form.Item
          name="newPassword"
          label={
            <span className="font-medium">
              New Password
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please enter your new password",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            size="large"
            placeholder="Enter new password"
            className="!rounded-xl"
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label={
            <span className="font-medium">
              Re-enter Password
            </span>
          }
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please re-enter your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Re-enter new password"
            className="!rounded-xl"
          />
        </Form.Item>

        {/* Button */}
        <Form.Item className="mb-0 mt-7">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isPending}
            className="
              !h-11
              !w-full
              !rounded-xl
              !border-none
              !bg-[var(--app-primary)]
              !font-semibold
              !text-[var(--app-primary-text)]
            "
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

