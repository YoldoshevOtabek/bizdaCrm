import { ArrowUp, MoreVertical } from "lucide-react";

const cards = [
  { title: "Total Sales", value: "1,240" },
  { title: "New Orders", value: "240" },
  { title: "Completed Orders", value: "960" },
  { title: "Canceled Orders", value: "87" },
];

export default function TotalOrderManagment() {
  return (
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
