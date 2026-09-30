import { useEffect, useState } from "react";
import { Avatar, Button, Input, Spin, message } from "antd";

import { Copy, Edit3, Plus, Share2 } from "lucide-react";

import ProfileUpdate from "./ProfileUpdate";

import { Link } from "react-router-dom";
import { FacebookFilled, GoogleCircleFilled, LinkedinFilled } from "@ant-design/icons";

import useProfile from "../hooks/useProfile";
import useUpdatePassword from "../hooks/useUpdatePassword";

export interface ProfileData {
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

  password: string;
  dateOfBirth: string;
  location: string;
  card: string;
  biography: string;
}

export default function Profile() {
  const [messageApi, contextHolder] = message.useMessage();

  const { profileData, isLoading, isError } = useProfile();

  const { mutate: updatePassword, isPending: isPasswordUpdating } =
    useUpdatePassword();

  const [profile, setProfile] = useState<ProfileData>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
    role: "",
    isActive: false,
    createdAt: "",
    updatedAt: "",

    password: "",
    dateOfBirth: "",
    location: "",
    card: "",
    biography: "",
  });

  useEffect(() => {
    console.log("ADMIN PROFILE:", profileData);

    if (!profileData) return;

    setProfile((prev) => ({
      ...prev,

      id: profileData.id ?? "",
      firstName: profileData.firstName ?? "",
      lastName: profileData.lastName ?? "",
      email: profileData.email ?? "",
      phone: profileData.phone ?? "",
      avatar: profileData.avatar ?? "",
      role: profileData.role ?? "",
      isActive: profileData.isActive ?? false,
      createdAt: profileData.createdAt ?? "",
      updatedAt: profileData.updatedAt ?? "",
    }));
  }, [profileData]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handlePasswordChange = () => {
    if (!currentPassword.trim()) {
      messageApi.error("Current passwordni kiriting");
      return;
    }

    if (!newPassword.trim()) {
      messageApi.error("New passwordni kiriting");
      return;
    }

    if (!rePassword.trim()) {
      messageApi.error("Confirm passwordni kiriting");
      return;
    }

    if (newPassword !== rePassword) {
      messageApi.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      messageApi.error(
        "New password kamida 6 ta belgidan iborat bo‘lishi kerak"
      );
      return;
    }

    updatePassword(
      {
        currentPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setRePassword("");

          messageApi.success("Password successfully updated");
        },
      }
    );
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    messageApi.success("Email copied");
  };

  if (isLoading) {
    return (
      <div className="content-bg flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="content-bg flex min-h-[400px] items-center justify-center">
        <span className="text-red-500">Profile loading failed</span>
      </div>
    );
  }

  return (
    <>
      {contextHolder}

      <div className="content-bg w-full p-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
          {/* LEFT */}
          <div className="space-y-5">
            {/* PROFILE */}
            <div className="content-mood rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-[18px] font-semibold">Profile</h2>

                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-700">
                    <Edit3 size={15} />
                  </button>

                  <button className="text-gray-400 hover:text-gray-700">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center px-4 py-5">
                <Avatar size={84} src={profile.avatar} />

                <h3 className="mt-3 text-[18px] font-semibold">
                  {profile.firstName} {profile.lastName}
                </h3>

                <div className="mt-1 flex items-center gap-1">
                  <span className="text-[11px] text-gray-400">
                    {profile.email}
                  </span>

                  <button
                    onClick={copyEmail}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <Copy size={12} />
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-gray-400">
                  Linked with Social media
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <Link to="https://www.google.com/?hl=ru" className="cursor-pointer text-[25px] text-green-400">
                    <GoogleCircleFilled />
                  </Link>

                  <Link to="https://www.facebook.com/?locale=ru_RU" className="cursor-pointer text-[25px] text-blue-600">
                    <FacebookFilled/>
                  </Link>


                  <Link to="https://ru.linkedin.com" className="cursor-pointer text-[25px]">
                    <LinkedinFilled/>
                  </Link>
                </div>

                <Button size="small" icon={<Plus size={13} />} className="mt-2">
                  Social media
                </Button>
              </div>
            </div>

            {/* CHANGE PASSWORD */}
            <div className="content-mood rounded-lg border border-gray-200">
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-[18px] font-semibold">Change Password</h2>

                <button className="text-[12px] text-violet-500">
                  Need help?
                </button>
              </div>

              <div className="space-y-4 p-4">
                <div>
                  <label className="mb-1.5 block text-[15px] font-medium">
                    Current Password
                  </label>

                  <Input.Password
                    className="content-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <button className="text-[12px] text-blue-500">
                  Forgot Current Password? Click here
                </button>
                <div>
                  <label className="mb-1.5 block text-[15px] font-medium">
                    New Password
                  </label>

                  <Input.Password
                    className="content-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[15px] font-medium">
                    Re-enter Password
                  </label>

                  <Input.Password
                    className="content-input"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex justify-center ">
                <Button
                  htmlType="button"
                  type="primary"
                  onClick={handlePasswordChange}
                  loading={isPasswordUpdating}
                  className="mt-2! h-9! border-none! hover:bg-[#409b67]!"
                >
                  {currentPassword.length > 1 || newPassword.length > 1 || rePassword.length > 1 
                    ? "Save Password"
                    : "Change Password"}
                </Button>
                </div>
              </div>
            </div>  
          </div>

          {/* RIGHT */}
          <ProfileUpdate
            profile={profile}
            setProfile={setProfile}
            messageApi={messageApi}
          />
        </div>
      </div>
    </>
  );
}
