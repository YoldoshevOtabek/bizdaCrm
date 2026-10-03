import { ArrowDown, ArrowUp } from "lucide-react";
import { MyRoundedDiagram } from "./Diagramma2";
import useSalesByCountry from "../../hooks/useSalesByCountry";
import useRealTimeUsers from "../../hooks/useRealTimeUsers";
import useCountUp, { formatCount, toNumber } from "../../hooks/useCountUp";
import Skeleton from "../../../../components/Skeleton";

export default function CountryDashboard() {
  const { salesByCountry, isLoadingsalesByCountry } = useSalesByCountry();
  const { realTimeUsers, isLoading } = useRealTimeUsers();
  const users = useCountUp(toNumber(realTimeUsers?.total));
  const countries = salesByCountry?.data ?? [];

  return (
    <div className="card flex h-full flex-col">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-2.5 w-40" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="mt-3 h-16 w-full rounded-lg" />
        </div>
      ) : (
        <>
          <div className="mb-1 flex items-center gap-2">
            <span className="live-dot" />
            <p className="mb-0 text-[11px] font-semibold text-brand">
              Users in Last {realTimeUsers?.windowMinutes || 0} Minutes
            </p>
          </div>
          <h2 className="stat-value">{formatCount(users)}</h2>
          <p className="mt-2 mb-1 text-[11px] font-medium text-muted">Users Per Minute</p>
          <MyRoundedDiagram realTimeUsers={realTimeUsers} />
        </>
      )}

      <div className="mt-3 mb-2 flex items-center justify-between">
        <h4 className="section-title">Sales by Country</h4>
        <span className="text-[11px] font-medium text-muted">Sales</span>
      </div>

      <div className="mt-1 flex max-h-[188px] min-h-0 flex-col gap-1.5 overflow-y-auto">
        {isLoadingsalesByCountry
          ? [1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2.5 w-14" />
                  </div>
                </div>
                <Skeleton className="h-2 w-24 rounded-full" />
              </div>
            ))
          : countries.map((item: any) => {
              const up = toNumber(item.changePercent) >= 0;
              return (
                <div key={item.name} className="soft-row flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <img
                      src="https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1920px-Flag_of_Uzbekistan.svg.png"
                      className="h-6 w-6 rounded-full object-cover"
                      alt={item.name}
                    />
                    <div className="min-w-0">
                      <h4 className="truncate text-xs font-bold">
                        {toNumber(item.sales).toLocaleString("uz-UZ")} so'm
                      </h4>
                      <p className="truncate text-[11px] text-muted">{item.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className={`${up ? "chip-up" : "chip-down"} flex items-center gap-1 text-[11px]`}>
                      {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {Math.abs(toNumber(item.changePercent))}%
                    </p>
                    <div className="progress-track w-24">
                      <div
                        className="progress-fill"
                        style={{ width: `${Math.min(100, toNumber(item.share))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
