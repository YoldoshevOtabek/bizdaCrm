import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailHeader({
  title,
  subtitle,
  backTo,
  extra,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  extra?: ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <div className="card mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="icon-btn shrink-0"
          onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
          aria-label="Back"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="min-w-0">
          <h2 className="page-title truncate">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
        </div>
      </div>
      {extra ? <div className="flex flex-wrap items-center gap-2">{extra}</div> : null}
    </div>
  );
}
