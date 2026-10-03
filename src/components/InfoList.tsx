import type { ReactNode } from "react";

export default function InfoList({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="info-grid">
      {items.map((item) => (
        <div key={item.label} className="info-row">
          <dt>{item.label}</dt>
          <dd>{item.value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
