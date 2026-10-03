import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit3, Package } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DetailHeader from "../../../components/DetailHeader";
import InfoList from "../../../components/InfoList";
import Spinner from "../../../components/Spinner";
import { RemotePreview } from "../../../components/RemoteImg";
import BrandFormModal from "../components/BrandFormModal";
import useBrandDetails from "../hooks/useBrandDetails";
import type { BrandProduct } from "../types/brand";

export default function BrandDetails() {
  const { id } = useParams();
  const { data, isLoading } = useBrandDetails(id || null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const productColumns: ColumnsType<BrandProduct> = [
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <RemotePreview
            src={record.image}
            width={44}
            height={44}
            preview
            style={{ objectFit: "contain", borderRadius: 8 }}
          />
          <div className="min-w-0">
            <div className="truncate font-medium">{record.name}</div>
            <div className="truncate text-xs text-muted">{record.slug}</div>
          </div>
        </div>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: number) => (
        <strong>{Number(value || 0).toLocaleString("uz-UZ")} so'm</strong>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (value: boolean) =>
        value ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>,
    },
  ];

  if (isLoading) {
    return <Spinner variant="page" />;
  }

  if (!data) {
    return <div className="card text-sm text-muted">Brand topilmadi</div>;
  }

  return (
    <div className="space-y-4">
      <DetailHeader
        title={data.name}
        subtitle={`/${data.slug}`}
        backTo="/brands"
        extra={
          <button type="button" className="btn-primary h-9 px-4 text-sm" onClick={() => setIsEditOpen(true)}>
            <Edit3 size={15} />
            Edit
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Brand</h3>
            {data.isActive ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}
          </div>
          <div className="flex justify-center rounded-xl border border-line bg-canvas p-6">
            <RemotePreview
              src={data.logo}
              width={180}
              height={140}
              preview
              style={{ objectFit: "contain", borderRadius: 12 }}
            />
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4 text-sm font-semibold">Brand Information</h3>
          <InfoList
            items={[
              { label: "Name", value: data.name },
              { label: "Slug", value: `/${data.slug}` },
              { label: "Products", value: data._count?.products ?? 0 },
              { label: "Created", value: new Date(data.createdAt).toLocaleString() },
              { label: "Updated", value: new Date(data.updatedAt).toLocaleString() },
              { label: "Description", value: data.description || "Description mavjud emas" },
            ]}
          />
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex items-center gap-2">
          <Package size={16} />
          <h3 className="text-sm font-semibold">Products</h3>
          <Tag color="blue">{data._count?.products ?? 0}</Tag>
        </div>
        <Table<BrandProduct>
          className="data-table"
          rowKey="id"
          columns={productColumns}
          dataSource={data.products ?? []}
          pagination={false}
        />
      </div>

      <BrandFormModal
        open={isEditOpen}
        brand={data}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
