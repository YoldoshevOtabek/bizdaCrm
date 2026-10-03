import { Tag } from "antd";
import { useParams } from "react-router-dom";
import DetailHeader from "../../../components/DetailHeader";
import InfoList from "../../../components/InfoList";
import Spinner from "../../../components/Spinner";
import useCustomerDetails from "../hooks/useCustomerDetails";

export default function CustomerDetails() {
  const { id } = useParams();
  const { data, isLoading } = useCustomerDetails(id || null);

  if (isLoading) {
    return <Spinner variant="page" />;
  }

  if (!data) {
    return <div className="card text-sm text-muted">Customer topilmadi</div>;
  }

  return (
    <div className="space-y-4">
      <DetailHeader
        title={`${data.firstName} ${data.lastName}`}
        subtitle={data.email}
        backTo="/customers"
      />

      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Customer Information</h3>
          {data.isActive ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}
        </div>
        <InfoList
          items={[
            { label: "First Name", value: data.firstName },
            { label: "Last Name", value: data.lastName },
            { label: "Email", value: data.email },
            { label: "Phone", value: data.phone },
            { label: "Orders", value: data.totalOrders ?? data._count?.orders ?? 0 },
            { label: "Reviews", value: data._count?.reviews ?? 0 },
            {
              label: "Total Spent",
              value: `${Number(data.totalSpent || 0).toLocaleString("uz-UZ")} so'm`,
            },
            {
              label: "Created",
              value: data.createdAt ? new Date(data.createdAt).toLocaleString() : "—",
            },
          ]}
        />
      </div>
    </div>
  );
}
