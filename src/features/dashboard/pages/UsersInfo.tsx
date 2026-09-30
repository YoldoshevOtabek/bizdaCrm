import { useState } from "react";
import useDashboard from "../hooks/useDashboardQuery";
import { Spin } from "antd";

export default function UsersInfo() {
  const {
    usersData,
    salesByCountry,
    isLoading,
    isError,
  } = useDashboard();


  const bars = usersData?.perMinute ?? [];

  const maxUsers = Math.max(
    ...bars.map((item: any) => item.users),
    1
  );

  

  if (isLoading) {
    return (
      <div className="content-mood col-span-4 rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">
        <div className="flex h-full min-h-[300px] items-center justify-center">
          <Spin size="large"/>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="content-mood col-span-4 rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">
        <div className="flex h-full min-h-[300px] items-center justify-center">
          <p className="text-[11px] text-[#F04444]">
            Ma'lumotlarni yuklashda xatolik
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-mood col-span-4 rounded-lg border border-[#E5E7EB] bg-white overflow-hidden">

      {/* Header */}
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between">

          <div>
            <p className="text-[15px] text-[#6467F2]">
              Users in last 30 minutes
            </p>

            <h2 className="text-[22px] font-semibold">
              {(usersData?.total ?? 0).toLocaleString()}
            </h2>
          </div>

          <button className="text-[#6A717F]">
            <i className="bi bi-three-dots-vertical"></i>
          </button>

        </div>

        {/* Users per minute */}
        <p className="mt-3 text-[12px] text-[#99a8c7]">
          Users per minute
        </p>

        {/* Bars */}
        <div className="mt-2 flex h-[35px] items-end gap-[3px]">
          {bars.map((item: any, index: number) => {

            const barHeight =
              item.users === 0
                ? 2
                : Math.max(
                    (item.users / maxUsers) * 35,
                    2
                  );

            return (
              <div
                key={index}
                className="w-1.25 rounded-t-xs bg-[#4DB27A]"
                style={{
                  height: `${barHeight}px`,
                }}
                title={`${item.users} users`}
              />
            );
          })}
        </div>
      </div>

      {/* Country header */}
      <div className="mt-3 flex justify-between border-b border-[#E5E7EB] px-4 pb-1">

        <span className="text-[14px] font-medium">
          Sales by Country
        </span>

        <span className="text-[12px] font-medium">
          Sales
        </span>

      </div>

      {/* Countries */}
      <div className="px-3 max-h-45 overflow-y-scroll">

        {salesByCountry.map((item: any, index: number) => {

          const maxShare = 80;

          const width = Math.min(
            (item.share / 100) * maxShare,
            maxShare
          );

          const isPositive = item.changePercent >= 0;

          return (
            <div
             
              className="relative flex h-[58px] items-center border-b border-[#E5E7EB]"
            >

              {/* Flag */}
              <div className="w-[38px] text-[25px]">
                🇺🇿
              </div>

              {/* Country info */}
              <div className="w-[62px]">
                <p className="text-[11px] font-medium">
                  {item.name}
                </p>

                <p className="text-[9px] text-[#6A717F]">
                  {item.code}
                </p>
              </div>

              {/* Progress */}
              <div className="flex-1">
                <div className="h-[4px] w-[80px] rounded-full bg-[#E5E7EB]">

                  <div
                    className="h-full rounded-full bg-[#6467F2]"
                    style={{
                      width: `${width}px`,
                    }}
                  />

                </div>
              </div>

              {/* Percent */}
              <div className="w-[55px] text-right">

                <span
                  className={`text-[9px] ${
                    isPositive
                      ? "text-[#21C45D]"
                      : "text-[#F04444]"
                  }`}
                >
                  {isPositive ? "⌃" : "⌄"}{" "}
                  {item.changePercent}%
                </span>

              </div>

            </div>
          );
        })}

      </div>

     

    </div>
  );
}