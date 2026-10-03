import type { ReactNode } from "react";

export default function PageHeader({
  title,
  subtitle,
  extra,
}: {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <h2 className="page-title">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {extra ? <div className="flex flex-wrap items-center gap-2">{extra}</div> : null}
    </div>
  );
}
