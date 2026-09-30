
import { useState } from "react";
import {
  ArrowDownUp,
  MoreHorizontal,
  SlidersHorizontal,
  Truck,
} from "lucide-react";

import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Pagination,
  Table,
  Tag,
} from "antd";

import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";

import type { OrdersTableProps } from "../types/order";

type TabType =
  | "All"
  | "Completed"
  | "Pending"
  | "Canceled";

export default function OrdersTable({
  orders,
}: OrdersTableProps) {
  const [activeTab, setActiveTab] =
    useState<TabType>("All");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  /*
   * ================================
   * TAB BO'YICHA FILTER
   * ================================
   */

  const filteredByTab = orders.filter((order) => {
    if (activeTab === "All") {
      return true;
    }

    if (activeTab === "Completed") {
      return order.status === "DELIVERED";
    }

    if (activeTab === "Pending") {
      return order.status === "PENDING";
    }

    if (activeTab === "Canceled") {
      return order.status === "CANCELLED";
    }

    return true;
  });

  /*
   * ================================
   * SEARCH
   * ================================
   */

  const filteredOrders = filteredByTab.filter(
    (order) => {
      const productName =
        order.items?.[0]?.productName || "";

      const customerName =
        `${order.customerSnapshot?.firstName || ""} ${
          order.customerSnapshot?.lastName || ""
        }`;

      const searchText = `
        ${order.orderNumber}
        ${productName}
        ${order.paymentStatus}
        ${order.status}
        ${customerName}
        ${order.customerSnapshot?.phone || ""}
        ${order.customerSnapshot?.email || ""}
      `;

      return searchText
        .toLowerCase()
        .includes(search.toLowerCase());
    }
  );

  /*
   * ================================
   * PAGINATION
   * ================================
   */

  const startIndex =
    (currentPage - 1) * pageSize;

  const paginatedOrders =
    filteredOrders.slice(
      startIndex,
      startIndex + pageSize
    );

  /*
   * ================================
   * TABLE COLUMNS
   * ================================
   */

  const columns: ColumnsType<
    OrdersTableProps["orders"][number]
  > = [
    /*
     * No.
     */

    {
      title: "No.",
      key: "number",
      width: 70,

      render: (_, __, index) => (
        <div className="flex items-center gap-2">
          <Checkbox />

          <span>
            {startIndex + index + 1}
          </span>
        </div>
      ),
    },

    /*
     * Order ID
     */

    {
      title: "Order Id",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 160,

      render: (orderNumber) => (
        <span className="font-medium">
          #{orderNumber}
        </span>
      ),
    },

    /*
     * Product
     */

    {
      title: "Product",
      key: "product",
      width: 300,

      render: (_, record) => {
        const product =
          record.items?.[0];

        return (
          <div className="flex items-center gap-3">

            <img
              src={product?.productImage}
              alt={
                product?.productName ||
                "Product"
              }
              className="h-9 w-9 shrink-0 rounded-lg border border-gray-200 bg-gray-50 object-cover"
            />

            <div className="min-w-0">

              <p className="truncate font-medium">
                {product?.productName ||
                  "No product"}
              </p>

              {product?.productSku && (
                <span className="text-xs text-gray-400">
                  SKU:{" "}
                  {product.productSku}
                </span>
              )}

            </div>
          </div>
        );
      },
    },

    /*
     * Date
     */

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,

      render: (date) => (
        <span>
          {new Date(
            date
          ).toLocaleDateString("en-GB")}
        </span>
      ),
    },

    /*
     * Price
     */

    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      width: 170,

      render: (price) => (
        <span className="font-medium">
          {Number(price).toLocaleString(
            "uz-UZ"
          )}{" "}
          so'm
        </span>
      ),
    },

    /*
     * Payment
     */

    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 130,

      render: (payment) => {
        const paid =
          payment === "PAID";

        return (
          <div className="flex items-center gap-2">

            <span
              className={`h-2 w-2 rounded-full ${
                paid
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />

            <span
              className={
                paid
                  ? "text-emerald-600"
                  : "text-red-500"
              }
            >
              {paid
                ? "Paid"
                : "Unpaid"}
            </span>

          </div>
        );
      },
    },

    /*
     * Status
     */

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,

      render: (status) => {
        const statusConfig: Record<
          string,
          {
            color:
              | "success"
              | "warning"
              | "default"
              | "error";
            text: string;
          }
        > = {
          DELIVERED: {
            color: "success",
            text: "Delivered",
          },

          PENDING: {
            color: "warning",
            text: "Pending",
          },

          SHIPPED: {
            color: "default",
            text: "Shipped",
          },

          CANCELLED: {
            color: "error",
            text: "Cancelled",
          },
        };

        const config =
          statusConfig[status];

        return (
          <Tag
            color={
              config?.color ||
              "default"
            }
            className="flex w-fit items-center gap-1 rounded-full px-3 py-1"
          >
            <Truck size={13} />

            {config?.text ||
              status}
          </Tag>
        );
      },
    },
  ];

  /*
   * ================================
   * MORE ACTION
   * ================================
   */

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "View order",
    },

    {
      key: "2",
      label: "Edit order",
    },

    {
      key: "3",
      label: "Delete order",
      danger: true,
    },
  ];

  /*
   * ================================
   * TABS
   * ================================
   */

  const tabs: {
    label: string;
    value: TabType;
    count: number;
  }[] = [
    {
      label: "All order",
      value: "All",
      count: orders.length,
    },

    {
      label: "Completed",
      value: "Completed",
      count: orders.filter(
        (item) =>
          item.status === "DELIVERED"
      ).length,
    },

    {
      label: "Pending",
      value: "Pending",
      count: orders.filter(
        (item) =>
          item.status === "PENDING"
      ).length,
    },

    {
      label: "Canceled",
      value: "Canceled",
      count: orders.filter(
        (item) =>
          item.status === "CANCELLED"
      ).length,
    },
  ];

  /*
   * ================================
   * RETURN
   * ================================
   */

  return (
    <div className="content-bg min-h-[calc(100vh-96px)] w-full bg-white ">

      {/* Main Card */}

      <div className="content-mood w-full rounded-xl border border-[#d9e9d6] bg-white shadow-[0px_1px_3px_0px_#00000033]">

        {/* Header */}

        <div className="flex items-center justify-between gap-5 px-6 py-5">

          {/* Tabs */}

          <div className="flex items-center rounded-lg bg-[#eaf6e7] p-1">

            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(
                    tab.value
                  );

                  setCurrentPage(1);
                }}
                className={`
                  h-9 rounded-md px-5 text-sm transition-all
                  ${
                    activeTab ===
                    tab.value
                      ? "bg-white font-semibold text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }
                `}
              >
                {tab.label}

                <span
                  className={`ml-1.5 ${
                    activeTab ===
                    tab.value
                      ? "text-emerald-500"
                      : "text-gray-400"
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            ))}

          </div>

          {/* Actions */}

          <div className="flex items-center gap-2">

            {/* Search */}

            <Input
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );

                setCurrentPage(1);
              }}
              placeholder="Search order report"
              className="!h-9 !w-56 !rounded-lg"
            />

            {/* Filter */}

            <Button
              className="h-9! flex w-9! items-center justify-center p-0!"
              icon={
                <SlidersHorizontal
                  size={15}
                />
              }
            />

            {/* Sort */}

            <Button
              className="h-9! flex w-9! items-center justify-center p-0!"
              icon={
                <ArrowDownUp
                  size={15}
                />
              }
            />

            {/* More */}

            <Dropdown
              menu={{
                items: menuItems,
              }}
              trigger={["click"]}
            >
              <Button
                className="h-9! flex w-9! items-center justify-center p-0!"
                icon={
                  <MoreHorizontal
                    size={16}
                  />
                }
              />
            </Dropdown>

          </div>
        </div>

        {/* Table */}

        <div className="px-6">

          <Table
            columns={columns}
            dataSource={
              paginatedOrders
            }
            rowKey="id"
            pagination={false}
            scroll={{
              x: 1000,
            }}
            rowClassName={() =>
              "content-bg-in h-[58px]"
            }
            locale={{
              emptyText:
                "No orders found",
            }}
          />

        </div>

        {/* Pagination */}

        <div className="flex items-center justify-between px-6 py-6">

          <span className="text-sm">

            Showing{" "}

            {filteredOrders.length ===
            0
              ? 0
              : startIndex + 1}

            {" - "}

            {Math.min(
              startIndex +
                pageSize,
              filteredOrders.length
            )}

            {" of "}

            {filteredOrders.length}

            {" orders"}

          </span>

          <Pagination
            current={currentPage}
            total={
              filteredOrders.length
            }
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />

        </div>

      </div>
    </div>
  );
}

