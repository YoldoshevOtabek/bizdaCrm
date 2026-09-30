import { Button, Popconfirm, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useBanner from "../hooks/useBanner";
import type { BannerType } from "../types/typeBanner";
import useDeleteBanner from "../hooks/useDeleteBanner";



export const Banner = () => {
  const navigate = useNavigate();

  const {
    bannerData,
    isLoading,
    isError,
  } = useBanner();

  const { mutate:deleteBanner, isPending } = useDeleteBanner();
  
  const handleEdit = (id: string) => {
    navigate(`/banner/${id}`);
  };

  const handleAdd = () => {
    navigate("/banner/add");
  };

  const handleDelete = (id: string) => {
    deleteBanner(id)
  };

  const columns: ColumnsType<BannerType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (image: string) => (
        <img
          src={image}
          alt="banner"
          className="w-24 h-12 rounded-lg object-cover"
        />
      ),
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
    },

    {
      title: "Button",
      dataIndex: "buttonText",
      key: "buttonText",
    },

    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },

    {
      title: "Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
    },

    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, banner) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<Edit3 size={17} />}
            onClick={() => handleEdit(banner.id)}
          />

          <Popconfirm
            title="Delete banner?"
            description="Are you sure you want to delete this banner?"
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => handleDelete(banner.id)}
          >
            <Button
              type="text"
              danger
              loading={isPending}
              icon={<Trash2 size={17} />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isError) {
    return (
      <div className="content-mood">
        <p className="text-red-500">
          Bannerlarni yuklashda xatolik yuz berdi
        </p>
      </div>
    );
  }

  return (
    <div className="content-mood">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">
          Banners
        </h1>

        <Button
          type="primary"
          icon={<Plus size={18} />}
          onClick={handleAdd}
        >
          Add Banner
        </Button>
      </div>

      {/* Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={bannerData ?? []}
        loading={isLoading}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};