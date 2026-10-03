import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import useCustomers from "../hooks/useCustomers";
import type { Customer } from "../types/customer";
import CustomerActions from "./CustomerActions";

export default function CustomersTable() {
  const { data, isLoading } = useCustomers();

  const columns: ColumnsType<Customer> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div>
          <div className="font-medium">
            {record.firstName} {record.lastName}
          </div>
          <div className="text-xs text-muted">{record.email}</div>
        </div>
      ),
    },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Orders", dataIndex: "totalOrders", key: "totalOrders" },
    {
      title: "Reviews",
      dataIndex: ["_count", "reviews"],
      key: "reviews",
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (value: number) => `${Number(value || 0).toLocaleString("uz-UZ")} so'm`,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) =>
        isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "",
      key: "actions",
      width: 56,
      align: "right",
      render: (_, record) => <CustomerActions data={record} />,
    },
  ];

  return (
    <Table<Customer>
      className="data-table"
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={data?.data ?? []}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  );
}
