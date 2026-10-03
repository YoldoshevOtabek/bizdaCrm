import { useMemo, useState } from "react";
import AreaChartExample from "./Diagramma";
import useWeeklyReports, { type WeekParam } from "../../hooks/useWeeklyReports";
import useCountUp, { formatCount, toNumber } from "../../hooks/useCountUp";
import Skeleton from "../../../../components/Skeleton";

function pickWeekData(payload: any, week: WeekParam) {
  const data = payload?.data ?? payload ?? {};
  const weekKey = week === "last" ? "lastWeek" : "thisWeek";
  const chart = Array.isArray(data?.chart)
    ? data.chart
    : data?.chart?.[weekKey] ??
      data?.[weekKey]?.chart ??
      data?.chart?.thisWeek ??
      data?.chart?.lastWeek ??
      [];
  const stats =
    data?.stats?.[weekKey] && typeof data.stats[weekKey] === "object"
      ? data.stats[weekKey]
      : data?.[weekKey]?.stats ?? data?.stats ?? {};

  return { chart, stats };
}

function StatCell({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  const animated = useCountUp(value);

  return (
    <div className="report-stat min-w-0">
      <h3 className="truncate text-base font-bold tracking-tight">
        {formatCount(animated)}
        {suffix ? <span className="ml-0.5 text-[10px] font-semibold text-muted">{suffix}</span> : null}
      </h3>
      <p className="mb-1.5 truncate text-[11px] text-muted">{label}</p>
      <div className="h-0.5 w-full rounded-full bg-brand" />
    </div>
  );
}

export default function ReportDashboard() {
  const [week, setWeek] = useState<WeekParam>("this");
  const { weeklyReports, isLoading } = useWeeklyReports(week);
  const { chart, stats } = useMemo(
    () => pickWeekData(weeklyReports, week),
    [weeklyReports, week],
  );

  return (
    <div className="card flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="section-title">
          {week === "this" ? "This Week Report" : "Last Week Report"}
        </h4>
        <div className="segmented">
          <button
            type="button"
            className={week === "this" ? "is-active" : ""}
            onClick={() => setWeek("this")}
          >
            This Week
          </button>
          <button
            type="button"
            className={week === "last" ? "is-active" : ""}
            onClick={() => setWeek("last")}
          >
            Last Week
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="mb-3 grid grid-cols-3 gap-3 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="space-y-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-0.5 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-3 grid grid-cols-3 gap-3 xl:grid-cols-5">
          <StatCell label="Customers" value={toNumber(stats?.customers)} />
          <StatCell label="Products" value={toNumber(stats?.totalProducts)} />
          <StatCell label="Stock Products" value={toNumber(stats?.stockProducts)} />
          <StatCell label="Out of Stock" value={toNumber(stats?.outOfStock)} />
          <StatCell label="Revenue" value={toNumber(stats?.revenue)} suffix="so'm" />
        </div>
      )}

      {isLoading ? (
        <Skeleton className="h-[188px] w-full rounded-xl" />
      ) : (
        <div className="h-[188px]">
          <AreaChartExample
            key={week}
            isAnimationActive
            data={chart}
          />
        </div>
      )}
    </div>
  );
}
