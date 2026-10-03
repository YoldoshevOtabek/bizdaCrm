import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RemoteAvatar } from "../../../../components/RemoteImg";
import useCategories from "../../hooks/useCategories";
import type { CategoryType } from "../../types/categories";
import CategoryActions from "../CategoryActions";

export default function TableCategories() {
  const { data: categories, isLoading } = useCategories();

  const columns: ColumnsType<CategoryType> = [
    {
      title: "Category",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <RemoteAvatar shape="square" size={40} src={record.image || undefined} className="rounded-xl">
            {record.name?.charAt(0)}
          </RemoteAvatar>
          <span className="font-medium">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Products",
      key: "products",
      dataIndex: ["_count", "products"],
    },
    {
      title: "Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "",
      key: "actions",
      width: 56,
      align: "right",
      render: (_, record) => <CategoryActions data={record} />,
    },
  ];

  return (
    <Table<CategoryType>
      className="data-table"
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={categories?.data ?? []}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  );
}
