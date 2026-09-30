import ApexChart from "./ApexChart";
import "../styles/diogramm.css";
import { BestSellingProduct } from "./BestSellingProduct";
import { TopProducts } from "./TopProducts";
import UsersInfo from "./UsersInfo";
import useDashboar from "../hooks/useDashboardQuery";
import { Spin } from "antd";

export const Dashboard = () => {
  const { kpis, isLoading, isError } = useDashboar();

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <Spin size="large"/>
      </div>
    );
  }

  if (isError || !kpis?.data) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <span>Dashboard ma'lumotlarini olishda xatolik yuz berdi</span>
      </div>
    );
  }

  const dashboard = kpis.data;

  const totalSales = dashboard.totalSales;
  const totalOrders = dashboard.totalOrders;
  const pending = dashboard.pending;
  const cancelled = dashboard.cancelled;

  return (
    <div className="w-full position-relative">
      <div className="grid grid-cols-3 gap-4 w-full">

        {/* Total Sales */}
        <div className="content-mood relative h-55.5 rounded-lg p-5 shadow-[0px_1px_3px_0px_#00000033]">
          <div className="flex justify-between items-center">
            <b className="text-[18px]">Total Sales</b>

            <span>
              <i className="bi bi-three-dots-vertical"></i>
            </span>
          </div>

          <span className="text-[#b3bbcc] text-[14px]">
             {dashboard.label}
          </span>

          <div className="flex items-center gap-4">
            <p className="text-[32px]">
              {totalSales.value.toLocaleString()} so'm
            </p>

            <span>
              Sales

              <span className="text-[#21C45D] ps-1">
                <i className="bi bi-arrow-up"></i>{" "}
                {totalSales.changePercent}%
              </span>
            </span>
          </div>

          <span className="text-[14px] text-[#606772]">
            Previous period{" "}
            <span className="text-[#6467F2]">
              {totalSales.previousValue.toLocaleString()} so'm
            </span>
          </span>
          
        </div>

        {/* Total Orders */}
        <div className="content-mood relative h-55.5 rounded-lg p-5 shadow-[0px_1px_3px_0px_#00000033]">
          <div className="flex justify-between items-center">
            <b className="text-[18px]">Total Orders</b>

            <span>
              <i className="bi bi-three-dots-vertical"></i>
            </span>
          </div>

          <span className="text-[#b3bbcc] text-[14px]">
           {dashboard.label}
          </span>

          <div className="flex items-center gap-4">
            <p className="text-[32px]">
              {totalOrders.value.toLocaleString()}
            </p>

            <span>
              Orders

              <span className="text-[#21C45D] ps-1">
                <i className="bi bi-arrow-up"></i>{" "}
                {totalOrders.changePercent}%
              </span>
            </span>
          </div>

          <span className="text-[14px] text-[#606772]">
            Previous period{" "}
            <span className="text-[#6467F2]">
              {totalOrders.previousValue.toLocaleString()}
            </span>
          </span>

          
        </div>

        {/* Pending & Canceled */}
        <div className="content-mood relative h-55.5 rounded-lg p-5 shadow-[0px_1px_3px_0px_#00000033]">
          <div className="flex justify-between items-center">
            <b className="text-[18px]">
              Pending & Canceled
            </b>

            <span>
              <i className="bi bi-three-dots-vertical"></i>
            </span>
          </div>

          <span className="text-[#b3bbcc] text-[14px]">
            {dashboard.label}
          </span>

          <div className="flex items-center gap-4">
            <p className="text-[32px]">
              {pending.orders + cancelled.value}
            </p>

            <span>
              Orders
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-1 text-[14px] text-[#606772]">
            <span>
              Pending:{" "}
              <span className="text-[#6467F2]">
                {pending.orders}
              </span>
            </span>

            <span>
              Canceled:{" "}
              <span className="text-[#6467F2]">
                {cancelled.value}
              </span>
            </span>
          </div>

        </div>
      </div>

      {/* Chart */}
      <div className="diogramm mt-5 grid grid-cols-12 gap-4">
        <ApexChart />
        <UsersInfo />
      </div>

      <div className="mt-5 grid grid-cols-12 gap-4">
        <BestSellingProduct />
        <TopProducts />
      </div>
    </div>
  );
};