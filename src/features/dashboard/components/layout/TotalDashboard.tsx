import type { ElementType } from "react";
import {
  ArrowDown,
  ArrowUp,
  Clock3,
  DollarSign,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import useKpis from "../../hooks/useKpis";
import useCountUp, { formatCompact, toNumber } from "../../hooks/useCountUp";
import Skeleton from "../../../../components/Skeleton";

type KpiCardProps = {
  title: string;
  value: number;
  change?: number;
  hint: string;
  icon: ElementType;
  suffix?: string;
  tone?: string;
};

function KpiCard({
  title,
  value,
  change,
  hint,
  icon: Icon,
  suffix,
  tone = "",
}: KpiCardProps) {
  const animated = useCountUp(value);
  const isUp = (change ?? 0) >= 0;

  return (
    <article className={`card kpi-card ${tone}`}>
      <div className="kpi-icon">
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="truncate text-[11px] font-medium text-muted">{title}</p>
        <div className="mt-0.5 flex min-w-0 items-baseline gap-1.5">
          <h2 className="stat-value min-w-0 flex-1">
            {formatCompact(animated)}
            {suffix ? <span className="ml-1 text-[10px] font-semibold text-muted">{suffix}</span> : null}
          </h2>
          <span className={`shrink-0 ${change === undefined ? "invisible" : ""} ${isUp ? "chip-up" : "chip-down"}`}>
            {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {Math.abs(change ?? 0)}%
          </span>
        </div>
        <p className="mt-1 truncate text-[11px] text-muted">{hint}</p>
      </div>
    </article>
  );
}

function KpiSkeleton() {
  return (
    <article className="card kpi-card">
      <Skeleton className="h-[34px] w-[34px] shrink-0 rounded-[10px]" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-2.5 w-16" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-2 w-14" />
      </div>
    </article>
  );
}

export default function TotalDashboard() {
  const { kips, isLoadingKpis } = useKpis();

  if (isLoadingKpis) {
    return (
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <KpiSkeleton key={item} />
        ))}
      </div>
    );
  }

  const data = kips?.data;
  const hint = data?.label ?? "Last 7 days";

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <KpiCard
        title="Total Sales"
        value={toNumber(data?.totalSales?.value)}
        change={data?.totalSales?.changePercent}
        hint={hint}
        icon={DollarSign}
        suffix="so'm"
        tone="kpi-sales"
      />
      <KpiCard
        title="Total Orders"
        value={toNumber(data?.totalOrders?.value)}
        change={data?.totalOrders?.changePercent}
        hint={hint}
        icon={ShoppingBag}
        tone="kpi-orders"
      />
      <KpiCard
        title="Pending"
        value={toNumber(data?.pending?.orders ?? data?.pending?.value)}
        change={data?.pending?.changePercent}
        hint={hint}
        icon={Clock3}
        tone="kpi-pending"
      />
      <KpiCard
        title="Cancelled"
        value={toNumber(data?.cancelled?.value ?? data?.canceled?.value)}
        change={data?.cancelled?.changePercent ?? data?.canceled?.changePercent}
        hint={hint}
        icon={XCircle}
        tone="kpi-cancelled"
      />
    </div>
  );
}
