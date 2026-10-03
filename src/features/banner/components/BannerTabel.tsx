import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { RemotePreview } from "../../../components/RemoteImg";
import useBanners from "../hooks/useBanner";
import type { Banner } from "../types/banner";
import BannerActions from "./BannerActions";

export default function BannerTabel() {
  const { banners, isLoading } = useBanners();

  const columns: ColumnsType<Banner> = [
    {
      title: "Banner",
      key: "banner",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <RemotePreview
            src={record.image}
            width={80}
            height={45}
            preview
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
          <div className="min-w-0">
            <div className="truncate font-medium">{record.title}</div>
            <div className="truncate text-xs text-muted">{record.subtitle}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Button",
      dataIndex: "buttonText",
      key: "buttonText",
      render: (value: string) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: "Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
      width: 80,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive: boolean) =>
        isActive ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => dayjs(date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => dayjs(date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "",
      key: "actions",
      width: 56,
      align: "right",
      render: (_, record) => <BannerActions data={record} />,
    },
  ];

  return (
    <Table<Banner>
      rowKey="id"
      columns={columns}
      dataSource={banners?.data ?? []}
      loading={isLoading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      className="data-table"
    />
  );
}
