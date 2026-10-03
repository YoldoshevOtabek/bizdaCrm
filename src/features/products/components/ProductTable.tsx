import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RemotePreview } from "../../../components/RemoteImg";
import useProducts from "../hooks/useProducts";
import ProductActions from "./ProductActions";

type ProductRow = {
  id: string;
  name: string;
  shortDescription?: string;
  price: number;
  stock: number;
  lowStockThreshold?: number;
  isActive: boolean;
  isNew?: boolean;
  brand?: { name?: string };
  category?: { name?: string };
  images?: { url: string; isMain?: boolean }[];
};

export default function ProductTable() {
  const { data, isLoading } = useProducts();

  const columns: ColumnsType<ProductRow> = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      width: 80,
      render: (images: ProductRow["images"]) => (
        <RemotePreview
          width={44}
          height={44}
          src={images?.find((image) => image.isMain)?.url}
          alt="product"
          style={{ objectFit: "cover", borderRadius: 10 }}
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (name: string, record) => (
        <div className="min-w-0">
          <div className="truncate font-medium">{name}</div>
          <div className="truncate text-xs text-muted">{record.shortDescription}</div>
        </div>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand: ProductRow["brand"]) => brand?.name || "—",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: ProductRow["category"]) => category?.name || "—",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <strong>{new Intl.NumberFormat("uz-UZ").format(price)} so'm</strong>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number, record) => {
        if (stock === 0) return <Tag color="red">Out of stock</Tag>;
        if (record.lowStockThreshold && stock <= record.lowStockThreshold) {
          return <Tag color="orange">{stock}</Tag>;
        }
        return <Tag color="green">{stock}</Tag>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) =>
        record.isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "",
      key: "actions",
      width: 56,
      align: "right",
      render: (_, record) => <ProductActions data={record} />,
    },
  ];

  return (
    <Table<ProductRow>
      className="data-table"
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={data?.data ?? []}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  );
}
