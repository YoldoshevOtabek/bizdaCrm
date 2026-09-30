import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  DatePicker,
  Input,
  type MessageInstance,
} from "antd";

import {
  CalendarDays,
  Edit3,
  Eye,
  EyeOff,
  ImagePlus,
  PenLine,
  Sparkles,
  Trash2,
  X,
  Check,
} from "lucide-react";

import dayjs from "dayjs";

import type { ProfileData } from "./Profile";
import useUpdateProfile from "../hooks/useUpdateProfile";

interface ProfileUpdateProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  messageApi: MessageInstance;
}

export default function ProfileUpdate({
  profile,
  setProfile,
  messageApi,
}: ProfileUpdateProps) {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState<ProfileData>(profile);

  const [showPassword, setShowPassword] = useState(false);

  // Avatar URL inputini ko'rsatish/yashirish
  const [showAvatarInput, setShowAvatarInput] = useState(false);

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // Profile API'dan kelganda formData yangilanadi
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Edit
  const handleEdit = () => {
    setFormData(profile);
    setShowAvatarInput(false);
    setEditing(true);
  };

  // Input change
  const handleChange = (
    field: keyof ProfileData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save
  const handleSave = () => {
    updateProfile(
      {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        avatar: formData.avatar,
      },
      {
        onSuccess: () => {
          setProfile(formData);
          setEditing(false);
          setShowAvatarInput(false);

          messageApi.success("Profile successfully updated");
        },
      }
    );
  };

  // Cancel
  const handleCancel = () => {
    setFormData(profile);
    setShowAvatarInput(false);
    setEditing(false);
  };

  // Delete avatar
  const handleDelete = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));

    setShowAvatarInput(false);

    messageApi.success("Avatar removed");
  };

  // Upload New bosilganda
  const handleUploadNew = () => {
    setShowAvatarInput((prev) => !prev);
  };

  return (
    <div className="content-mood rounded-lg border border-gray-200 bg-white">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between      px-5 py-3">
        <h2 className="text-[18px] font-semibold">
          Profile Update
        </h2>

        {!editing ? (
          <Button
            size="small"
            icon={<Edit3 size={13} />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              size="small"
              icon={<X size={13} />}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              size="small"
              icon={<Check size={13} />}
              onClick={handleSave}
              loading={isPending}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">

        {/* ================= AVATAR ================= */}
        <div className="mb-6">
          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="shrink-0">
              <Avatar
                size={58}
                src={formData.avatar || undefined}
              >
                {formData.firstName?.charAt(0)}
              </Avatar>
            </div>

            {/* Avatar buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                type="primary"
                size="small"
                icon={<ImagePlus size={13} />}
                disabled={!editing}
                onClick={handleUploadNew}
              >
                {showAvatarInput ? "Hide URL" : "Upload New"}
              </Button>

              <Button
                size="small"
                danger
                icon={<Trash2 size={13} />}
                disabled={!editing || !formData.avatar}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* ================= AVATAR URL INPUT ================= */}
          {editing && showAvatarInput && (
            <div
              className="
                mt-4
                rounded-xl
                border
                border-blue-100
                bg-blue-50/50
                p-4
                transition-all
                duration-300
              "
            >
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-gray-700">
                    Avatar URL
                  </p>

                  <p className="mt-0.5 text-[12px] text-gray-300">
                    Rasmning URL manzilini kiriting
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAvatarInput(false)}
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    transition
                    hover:bg-white
                    hover:text-gray-700
                  "
                >
                  <X size={15} />
                </button>
              </div>

              <Input
             
                value={formData.avatar}
                onChange={(e) =>
                  handleChange("avatar", e.target.value)
                }
                placeholder="https://example.com/avatar.jpg"
                prefix={
                  <ImagePlus
                    size={15}
                    className="text-gray-400"
                  />
                }
                allowClear
              />

              {/* Preview */}
              {formData.avatar && (
                <div className="w-15 mt-3 flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-2.5">
                  <Avatar
                    size={42}
                    src={formData.avatar}
                  />

                 
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= FORM ================= */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">

          {/* FIRST NAME */}
          <div>
            <label className="mb-1.5 block text-[15px] font-medium">
              First Name
            </label>

            <Input
              disabled={!editing}
              value={formData.firstName}
              onChange={(e) =>
                handleChange("firstName", e.target.value)
              }
              placeholder="First name"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="mb-1.5 block text-[15px] font-medium">
              Last Name
            </label>

            <Input
              disabled={!editing}
              value={formData.lastName}
              onChange={(e) =>
                handleChange("lastName", e.target.value)
              }
              placeholder="Last name"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1.5 block text-[15px] font-medium">
              Password
            </label>

            <Input
              disabled={!editing}
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              suffix={
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="text-gray-400 transition hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              }
              placeholder="Password"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-1.5 block text-[15px] font-medium">
              Phone Number
            </label>

            <Input
              disabled={!editing}
              value={formData.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              addonBefore="+998"
              placeholder="90 123 45 67"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-1.5 block text-[15px] font-medium">
              E-mail
            </label>

            <Input
              disabled
              value={formData.email}
              placeholder="Email"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="mb-1.5 block text-[15px] font-medium">
              Date of Birth
            </label>

            <DatePicker
              disabled={!editing}
              value={
                formData.dateOfBirth
                  ? dayjs(formData.dateOfBirth)
                  : null
              }
              onChange={(date) =>
                handleChange(
                  "dateOfBirth",
                  date
                    ? date.format("YYYY-MM-DD")
                    : ""
                )
              }
              format="DD-MM-YYYY"
              suffixIcon={
                <CalendarDays size={15} />
              }
              className="w-full"
            />
          </div>

          {/* BIOGRAPHY */}
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-[15px] font-medium">
              Biography
            </label>

            <div className="relative">
              <Input.TextArea
                disabled={!editing}
                value={formData.biography}
                onChange={(e) =>
                  handleChange(
                    "biography",
                    e.target.value
                  )
                }
                placeholder="Enter a biography about you"
                rows={4}
              />

              <div className="absolute bottom-2 right-2 flex gap-2 text-gray-400">
                <PenLine size={14} />
                <Sparkles size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SAVE BUTTON ================= */}
        {editing && (
          <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
            <Button
              type="primary"
              onClick={handleSave}
              loading={isPending}
              className="!border-none !bg-[#4caf75] hover:!bg-[#409b67]"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}