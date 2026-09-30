import React, { useState } from "react";
import {
  Table,
  Card,
  Avatar,
  Button,
  Tooltip,
  message,
  Select,
  Spin,
} from "antd";

import {
  CopyOutlined,
  PhoneOutlined,
  FacebookFilled,
  WhatsAppOutlined,
  TwitterOutlined,
  LinkedinFilled,
  InstagramFilled,
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import "../styles/customers.css";
import useCustomer from "../hooks/useCustomers";
import useUpdateCustomerStatus from "../hooks/useUpdateStatus";



// ================= STATUS =================

const statusConfig = {
  Active: {
    color: "#22c55e",
    text: "Active",
  },
  Inactive: {
    color: "#ff4d4f",
    text: "Inactive",
  },
};


// ================= STATUS TAG =================

function StatusTag({ status }: { status: "Active" | "Inactive" }) {
  const config = statusConfig[status];

  return (
    <span className="status">
      <span
        className="status-dot"
        style={{ backgroundColor: config.color }}
      />

      <span style={{ color: config.color }}>
        {config.text}
      </span>
    </span>
  );
}


// ================= CUSTOMER TYPE =================

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

  _count?: {
    orders: number;
    reviews: number;
  };

  totalOrders: number;
  totalSpent: number;
};


// ================= CUSTOMER CARD =================

type CustomerCardProps = {
  customer: Customer;
  onClose: () => void;
};

function CustomerCard({
  customer,
  onClose,
}: CustomerCardProps) {
  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    message.success("Copied!");
  };


  const fullName = `${customer.firstName} ${customer.lastName}`;

  const initials = `${customer.firstName?.[0] || ""}${
    customer.lastName?.[0] || ""
  }`;

  const status = customer.isActive ? "Active" : "Inactive";

  const registrationDate = new Date(
    customer.createdAt
  ).toLocaleDateString("en-GB");


  return (
    <Card
      className="customer-card content-mood"
      bordered={false}
    >
      {/* CLOSE */}

      <div className="card-close">
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </div>
      

      {/* HEADER */}

      <div className="profile-header">
        <Avatar
          size={48}
          className="profile-avatar"
          src={customer.avatar || undefined}
        >
          {initials}
        </Avatar>

        <div className="profile-name">
          <h3>{fullName}</h3>

          <div className="email">
            {customer.email}

            <Tooltip title="Copy email">
              <CopyOutlined
                onClick={() => copyText(customer.email)}
              />
            </Tooltip>
          </div>

          <StatusTag status={status} />
        </div>
      </div>


      {/* CUSTOMER INFO */}

      <div className="section-title">
        Customer Info
      </div>


      {/* PHONE */}

      <div className="info-input">
        <PhoneOutlined />

        <span>
          {customer.phone}
        </span>

        <CopyOutlined
          className="copy-icon"
          onClick={() => copyText(customer.phone)}
        />
      </div>


      {/* CUSTOMER ID */}

      <div className="info-input">
        <span>ID:</span>

        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {customer.id}
        </span>

        <CopyOutlined
          className="copy-icon"
          onClick={() => copyText(customer.id)}
        />
      </div>


      {/* SOCIAL MEDIA */}

      <div className="section-title">
        Social Media
      </div>

      <div className="socials">
        <span>
          <FacebookFilled />
        </span>

        <span>
          <WhatsAppOutlined />
        </span>

        <span>
          <TwitterOutlined />
        </span>

        <span>
          <LinkedinFilled />
        </span>

        <span>
          <InstagramFilled />
        </span>
      </div>


      {/* ACTIVITY */}

      <div className="section-title">
        Activity
      </div>

      <div className="activity-row">

        <div>
          <small>
            Registration:
          </small>

          <strong>
            {registrationDate}
          </strong>
        </div>

        <div>
          <small>
            Status:
          </small>

          <strong>
            {status}
          </strong>
        </div>

      </div>


      {/* ORDER OVERVIEW */}

      <div className="section-title">
        Order overview
      </div>

      <div className="overview">

        <div className="overview-item">
          <strong>
            {customer.totalOrders}
          </strong>

          <span>
            Total orders
          </span>
        </div>


        <div className="overview-item">
          <strong>
            {customer._count?.reviews ?? 0}
          </strong>

          <span>
            Reviews
          </span>
        </div>


        <div className="overview-item">
          <strong>
            {customer.totalSpent.toLocaleString()}
          </strong>

          <span>
            Total spent
          </span>
        </div>

      </div>

    </Card>
  );
}


// ================= CUSTOMER TABLE =================

export default function CustomerTable() {

  const {
    customersData,
    isLoading,
    isError,
  } = useCustomer();
  
  const {  mutate: updateStatus,
          isPending: isUpdating,} = useUpdateCustomerStatus()

  const [selectedCustomer, setSelectedCustomer] = 
    useState<Customer | null>(null);

  const [page, setPage] = useState(1);


  // ================= DATA =================

  const customers: Customer[] = Array.isArray(customersData)
    ? customersData
    : customersData?.data ?? [];


  // ================= DELETE =================

  const handleDelete = (record: Customer) => {
    message.success(
      `${record.firstName} ${record.lastName} deleted`
    );
  };


  // ================= COLUMNS =================

  const columns = [
    {
      title: "Customer Id",
      dataIndex: "id",
      key: "id",
      width: 105,

      render: (id: string) => (
        <Tooltip title={id}>
          <span>
            {id.slice(0, 8)}...
          </span>
        </Tooltip>
      ),
    },


    {
      title: "Name",
      key: "name",
      width: 140,

      render: (_: any, record: Customer) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },


    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 145,
    },


    {
      title: "Order Count",
      dataIndex: "totalOrders",
      key: "totalOrders",
      align: "center" as const,
      width: 110,
    },


    {
      title: "Total Spend",
      dataIndex: "totalSpent",
      key: "totalSpent",
      align: "center" as const,
      width: 130,

      render: (value: number) =>
        `${value.toLocaleString()} UZS`,
    },


    {
      title: "Status",
      key: "status",
      width: 150,
    
      render: (_: any, record: Customer) => (
        <Select
          value={record.isActive ? "Active" : "Inactive"}
          loading={
            isUpdating
          }
          style={{ width: 120 }}
    
          onChange={(value) => {
            const isActive = value === "Active";
    
            updateStatus({
              id: record.id,
              isActive,
            });
          }}
    
          options={[
            {
              label: "Active",
              value: "Active",
            },
            {
              label: "Inactive",
              value: "Inactive",
            },
          ]}
        />
      ),
    },



    
  ];


  // ================= LOADING =================

  if (isLoading) {
    return (
      <div className="customer-page">
        <Spin size="large"/>
      </div>
    );
  }


  // ================= ERROR =================

  if (isError) {
    return (
      <div className="customer-page">
        Failed to load customers
      </div>
    );
  }


  return (
    <div className="customer-page">

      <div
        className={
          selectedCustomer
            ? "content-layout with-card content-mood"
            : "content-layout content-mood"
        }
      >

        {/* ================= TABLE ================= */}

        <div className="table-wrapper">

          <Table
            className="content-mood"

            columns={columns}

            dataSource={customers}

            rowKey="id"

            pagination={false}

            rowClassName={(record) =>
              selectedCustomer?.id === record.id
                ? "selected-row content-mood"
                : "content-mood"
            }

            onRow={(record) => ({
              onClick: () => {
                setSelectedCustomer(record);
              },
            })}

            scroll={{ x: 750 }}
          />


          {/* ================= PAGINATION ================= */}

          <div className="pagination">

            <Button
              icon={<LeftOutlined />}
              disabled={page === 1}
              onClick={() =>
                setPage(
                  Math.max(1, page - 1)
                )
              }
            >
              Previous
            </Button>


            <div className="page-numbers">

              {[1, 2, 3].map(
                (item) => (
                  <Button
                    key={item}
                    type={
                      page === item
                        ? "primary"
                        : "default"
                    }
                    onClick={() =>
                      setPage(item)
                    }
                  >
                    {item}
                  </Button>
                )
              )}


              <span>
                ...
              </span>


              <Button
                onClick={() =>
                  setPage(24)
                }
                type={
                  page === 5
                    ? "primary"
                    : "default"
                }
              >
                24
              </Button>

            </div>


            <Button
              disabled={page === 5}
              onClick={() =>
                setPage(
                  Math.min(5, page + 1)
                )
              }
            >
              Next <RightOutlined />
            </Button>

          </div>

        </div>


        {/* ================= RIGHT CARD ================= */}

        {selectedCustomer && (
          <CustomerCard
            customer={selectedCustomer}
            onClose={() =>
              setSelectedCustomer(null)
            }
          />
        )}

      </div>

    </div>
  );
}