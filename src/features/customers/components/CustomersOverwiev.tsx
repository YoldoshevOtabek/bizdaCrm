import { MoreVertical } from "lucide-react";
import { useState } from "react";
import CustomersDiagramma from "./CustomersDiagramma";

export default function CustomersOverwiev() {
  const [week2, setWeek2] = useState(false);

  return (
    <div className="card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-lg font-bold">Customer Overview</h4>
        <div className="flex items-center gap-2">
          <div className="segmented">
            <button
              type="button"
              className={!week2 ? "is-active" : ""}
              onClick={() => setWeek2(false)}
            >
              This week
            </button>
            <button
              type="button"
              className={week2 ? "is-active" : ""}
              onClick={() => setWeek2(true)}
            >
              Last week
            </button>
          </div>
          <MoreVertical size={18} className="text-muted" />
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {["Customers", "Orders", "Revenue", "Retention"].map((label) => (
          <div key={label}>
            <h3 className="mb-1 text-[26px] font-bold">52k</h3>
            <p className="mb-3 text-sm font-medium text-muted">{label}</p>
            <div className="h-0.5 w-full rounded-full bg-brand" />
          </div>
        ))}
      </div>
      <CustomersDiagramma />
    </div>
  );
}
