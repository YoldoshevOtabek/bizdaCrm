import { ArrowUp, MoreVertical } from "lucide-react";

const cards = [
  { title: "New Customers", value: "240" },
  { title: "Returning", value: "186" },
  { title: "VIP Users", value: "42" },
];

export default function TotalCustomers() {
  return (
    <div className="flex flex-col gap-5">
      {cards.map((item) => (
        <article key={item.title} className="card p-5">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-bold">{item.title}</h3>
            <MoreVertical size={18} className="text-muted" />
          </div>
          <h2 className="stat-value mt-4 mb-0 flex items-center gap-2">
            {item.value}
            <span className="chip-up">
              <ArrowUp size={16} /> 10.4%
            </span>
          </h2>
          <p className="mt-2 text-sm text-muted">Last 7 days</p>
        </article>
      ))}
    </div>
  );
}
