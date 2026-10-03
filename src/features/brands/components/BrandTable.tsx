import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { RemotePreview } from "../../../components/RemoteImg";
import useBrands from "../hooks/useBrands";
import type { Brand } from "../types/brand";
import BrandActions from "./BrandActions";

export default function BrandTable() {
  const { brands, isLoading } = useBrands();

  const columns: ColumnsType<Brand> = [
    {
      title: "Brand",
      key: "brand",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <RemotePreview
            src={record.logo}
            width={42}
            height={42}
            preview
            style={{ objectFit: "contain", borderRadius: 8 }}
          />
          <div className="min-w-0">
            <div className="truncate font-medium">{record.name}</div>
            <div className="truncate text-xs text-muted">/{record.slug}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (value: string) => value || "—",
    },
    {
      title: "Products",
      key: "products",
      width: 110,
      render: (_, record) => <Tag color="blue">{record._count?.products ?? 0}</Tag>,
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
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date: string) => dayjs(date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "",
      key: "actions",
      width: 56,
      align: "right",
      render: (_, record) => <BrandActions data={record} />,
    },
  ];

  return (
    <Table<Brand>
      rowKey="id"
      columns={columns}
      dataSource={brands?.data ?? []}
      loading={isLoading}
      className="data-table"
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  );
}
