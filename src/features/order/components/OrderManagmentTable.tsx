import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import RemoteImg from "../../../components/RemoteImg";
import useOrders from "../hooks/useOrders";
import type { OrderApi, OrderRow } from "../types/order";
import OrderActions from "./OrderActions";

function TableThumb({
  src,
  fallback,
  round,
}: {
  src?: string;
  fallback?: string;
  round?: boolean;
}) {
  return (
    <span className={`table-thumb${round ? " is-round" : ""}`}>
      {src ? (
        <RemoteImg src={src} alt="" />
      ) : (
        <span className="table-thumb-fallback">{fallback}</span>
      )}
    </span>
  );
}

const columns: ColumnsType<OrderRow> = [
  {
    title: "Order",
    dataIndex: "orderNumber",
    width: 140,
    render: (orderNumber: string) => <span className="font-medium">{orderNumber}</span>,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    width: 220,
    render: (customer: OrderRow["customer"]) => (
      <div className="flex min-w-0 items-center gap-2.5">
        <TableThumb round fallback={customer?.firstName?.charAt(0)} />
        <div className="min-w-0">
          <div className="truncate font-medium">
            {customer?.firstName} {customer?.lastName}
          </div>
          <div className="truncate text-xs text-muted">{customer?.phone}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Product",
    dataIndex: "product",
    width: 260,
    render: (_, record) => (
      <div className="flex min-w-0 items-center gap-3">
        <TableThumb src={record.productImage} fallback={record.product?.charAt(0)} />
        <span className="truncate font-medium">{record.product}</span>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 150,
    render: (price: number) => (
      <span className="font-semibold">
        {Number(price || 0).toLocaleString("uz-UZ")} so'm
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 130,
    render: (status: string) => {
      const colors: Record<string, string> = {
        DELIVERED: "green",
        PENDING: "orange",
        SHIPPED: "blue",
        CANCELLED: "red",
      };
      return <Tag color={colors[status] || "default"}>{status}</Tag>;
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    width: 120,
  },
  {
    title: "",
    key: "actions",
    width: 64,
    align: "right",
    fixed: "right",
    render: (_, record) => <OrderActions data={record} />,
  },
];

export default function OrderManagementTable({ status = "all" }: { status?: string }) {
  const { orders, isLoading } = useOrders();

  const data: OrderRow[] =
    (orders as OrderApi[] | undefined)?.map((order) => {
      const item = order.items?.[0];
      return {
        key: order.id,
        orderNumber: order.orderNumber,
        customer: {
          firstName: order.user?.firstName || order.customerSnapshot?.firstName || "",
          lastName: order.user?.lastName || order.customerSnapshot?.lastName || "",
          email: order.user?.email || order.customerSnapshot?.email || "",
          phone: order.user?.phone || order.customerSnapshot?.phone || "",
        },
        product: item?.productName || "No product",
        productImage: item?.productImage || "",
        date: new Date(order.createdAt).toLocaleDateString("uz-UZ"),
        price: order.total,
        status: order.status,
      };
    }) || [];

  const filtered = status === "all" ? data : data.filter((item) => item.status === status);

  return (
    <Table<OrderRow>
      className="data-table"
      loading={isLoading}
      columns={columns}
      dataSource={filtered}
      scroll={{ x: 860 }}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  );
}
