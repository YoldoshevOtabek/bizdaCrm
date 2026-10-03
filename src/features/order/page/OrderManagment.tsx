import { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import OrderManagementTable from "../components/OrderManagmentTable";

const tabs = [
  { id: "all", label: "All" },
  { id: "DELIVERED", label: "Completed" },
  { id: "PENDING", label: "Pending" },
  { id: "CANCELLED", label: "Canceled" },
];

export default function OrderManagment() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div>
      <PageHeader title="Orders" subtitle="Track and manage customer orders" />
      <div className="card overflow-hidden">
        <div className="mb-4">
          <div className="segmented">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={activeTab === item.id ? "is-active" : ""}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="table-scroll">
          <OrderManagementTable status={activeTab} />
        </div>
      </div>
    </div>
  );
}
