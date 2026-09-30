import { useState } from "react";
import {
  Button,
  Input,
  InputNumber,
  Switch,
  message,
} from "antd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useCreateBanner from "../hooks/useCreateBanner";
import type { BannerForm } from "../types/typeBanner";

export const BannerCreate = () => {
  const navigate = useNavigate();

  const { mutate: createBanner, isPending } =
    useCreateBanner();

  const [formData, setFormData] = useState<BannerForm>({
    title: "",
    subtitle: "",
    image: "",
    mobileImage: "",
    buttonText: "",
    link: "",
    sortOrder: 0,
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      message.error("Title kiriting");
      return;
    }

    if (!formData.image.trim()) {
      message.error("Image URL kiriting");
      return;
    }

    createBanner(formData, {
      onSuccess: () => {
        message.success(
          "Banner muvaffaqiyatli qo'shildi"
        );

        navigate("/banner");
      },
    });
  };

  return (
    <div className="content-mood p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          type="text"
          icon={<ArrowLeft size={20} />}
          onClick={() => navigate("/banner")}
        />

        <div>
          <h1 className="text-2xl font-semibold">
            Add Banner
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="content-mood rounded-xl p-6">
        <div className="grid grid-cols-2 gap-5">

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <Input
              className="content-input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Tech Week"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block mb-2 font-medium">
              Subtitle
            </label>

            <Input
              className="content-input"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Up to 30% off selected electronics"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 font-medium">
              Image URL
            </label>

            <Input
              className="content-input"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/banner.jpg"
            />
          </div>

          {/* Mobile Image */}
          <div>
            <label className="block mb-2 font-medium">
              Mobile Image URL
            </label>

            <Input
              className="content-input"
              name="mobileImage"
              value={formData.mobileImage}
              onChange={handleChange}
              placeholder="https://example.com/mobile-banner.jpg"
            />
          </div>

          {/* Button Text */}
          <div>
            <label className="block mb-2 font-medium">
              Button Text
            </label>

            <Input
              className="content-input"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              placeholder="Shop Now"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block mb-2 font-medium">
              Link
            </label>

            <Input
              className="content-input"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="/products"
            />
          </div>

          {/* Sort Order */}
          <div>
            <label className="block mb-2 font-medium">
              Sort Order
            </label>

            <InputNumber
              className="w-full content-search"
              min={0}
              value={formData.sortOrder}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  sortOrder: value ?? 0,
                }))
              }
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <Switch
              checked={formData.isActive}
              onChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: checked,
                }))
              }
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-2 font-medium">
              Start Date
            </label>

            <Input
              className="content-input"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 font-medium">
              End Date
            </label>

            <Input
              className="content-input"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={() => navigate("/banner")}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            loading={isPending}
            onClick={handleSubmit}
          >
            Create Banner
          </Button>
        </div>
      </div>
    </div>
  );
};
