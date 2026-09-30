import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useDashboard from "../hooks/useDashboardQuery";
import { Spin } from "antd";

type Metric =
  | "customer"
  | "total"
  | "stock"
  | "outStock"
  | "revenue";

type Period = "thisWeek" | "lastWeek";

const ApexChart = () => {
  const [activeMetric, setActiveMetric] =
    useState<Metric>("revenue");

  const [period, setPeriod] =
    useState<Period>("thisWeek");

  const {
    weeklyReport,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return (
      <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-8 p-4">
        <div className="flex h-[300px] items-center justify-center">
          <Spin size="large"/>
        </div>
      </div>
    );
  }

  if (isError || !weeklyReport?.data) {
    return (
      <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-8 p-4">
        <div className="flex h-[300px] items-center justify-center text-red-600">
          Dashboard ma'lumotlarini olishda xatolik.
        </div>
      </div>
    );
  }

  const dashboard = weeklyReport.data;

  const stats = dashboard.stats;

  /*
   * This week or Last week
   */
  const chartData =
    period === "thisWeek"
      ? dashboard.chart.thisWeek
      : dashboard.chart.lastWeek;

 
  const data = {
    customer: {
      value: stats.customers,
      label: "Customers",
      chart: chartData.map(() => stats.customers),
    },

    total: {
      value: stats.totalProducts,
      label: "Total Products",

      chart: chartData.map(() => stats.totalProducts),
    },

    stock: {
      value: stats.stockProducts,
      label: "Stock Products",

      chart: chartData.map(() => stats.stockProducts),
    },

    outStock: {
      value: stats.outOfStock,
      label: "Out of Stock",

      chart: chartData.map(() => stats.outOfStock),
    },

    revenue: {
      value: stats.revenue,
      label: "Revenue",

      
      chart: chartData.map((item:any) => item.revenue),
    },
  };

  const current = data[activeMetric];

  const series = [
    {
      name: current.label,
      data: current.chart,
    },
  ];

  /*
   * Y-axis uchun max qiymat
   */
  const maxValue = Math.max(...current.chart);

  const yAxisMax =
    maxValue === 0
      ? 10
      : Math.ceil(maxValue * 1.2);

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 220,

      toolbar: {
        show: false,
      },

      zoom: {
        enabled: false,
      },

      animations: {
        enabled: true,
        speed: 400,
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 1.5,
    },

    colors: ["#4caf7d"],

    fill: {
      type: "gradient",

      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.28,
        opacityTo: 0.03,
        stops: [0, 100],
      },
    },

    grid: {
      show: false,

      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },

    /*
     * API'dan Sun-Sat keladi
     */
    xaxis: {
      categories: chartData.map(
        (item:any) => item.day
      ),

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      labels: {
        style: {
          colors: chartData.map(
            () => "var(--text)"
          ),

          fontSize: "12px",
        },
      },
    },

    yaxis: {
      min: 0,
      max: yAxisMax,
      tickAmount: 5,

      labels: {
        style: {
          colors: "var(--text)",
          fontSize: "12px",
        },

        formatter: (value) => {
          if (activeMetric === "revenue") {
            return `${(
              value / 1000000
            ).toFixed(1)}M`;
          }

          return value.toString();
        },
      },
    },

    tooltip: {
      shared: false,
      intersect: true,

      y: {
        formatter: (value) => {
          if (activeMetric === "revenue") {
            return `${value.toLocaleString()} so'm`;
          }

          return value.toLocaleString();
        },
      },
    },

    markers: {
      size: 0,

      hover: {
        size: 4,
      },
    },

    legend: {
      show: false,
    },
  };

  /*
   * Statistikalar
   */
  const metrics = [
    {
      key: "customer" as Metric,
      value: stats.customers,
      label: "Customers",
    },

    {
      key: "total" as Metric,
      value: stats.totalProducts,
      label: "Total Products",
    },

    {
      key: "stock" as Metric,
      value: stats.stockProducts,
      label: "Stock Products",
    },

    {
      key: "outStock" as Metric,
      value: stats.outOfStock,
      label: "Out of Stock",
    },

    {
      key: "revenue" as Metric,
      value:
        stats.revenue.toLocaleString(),
      label: "Revenue",
    },
  ];

  return (
    <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-8 p-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-medium text-[var(--text)]">
          Customer Overview
        </h3>

        <div className="flex items-center gap-1">

          {/* This week */}
          <button
            onClick={() =>
              setPeriod("thisWeek")
            }
            className={`
              rounded-full
              px-3 py-1
              text-[12px]
              font-medium
              transition
              ${
                period === "thisWeek"
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "text-gray-400"
              }
            `}
          >
            This week
          </button>

          {/* Last week */}
          <button
            onClick={() =>
              setPeriod("lastWeek")
            }
            className={`
              rounded-full
              px-3 py-1
              text-[12px]
              font-medium
              transition
              ${
                period === "lastWeek"
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "text-gray-400"
              }
            `}
          >
            Last week
          </button>

          <button className="ml-1 text-gray-500 text-sm leading-none">
            ⋮
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-5 gap-5">

        {metrics.map((metric) => {
          const isActive =
            activeMetric === metric.key;

          return (
            <button
              key={metric.key}
              onClick={() =>
                setActiveMetric(metric.key)
              }
              className={`
                group
                border-b
                pb-2
                text-left
                transition-all
                cursor-pointer

                ${
                  isActive
                    ? "border-green-500"
                    : "border-gray-100 hover:border-green-300"
                }
              `}
            >
              <div
                className={`
                  text-[24px]
                  font-semibold
                  transition

                  ${
                    isActive
                      ? "text-green-600"
                      : "text-[var(--text)]"
                  }
                `}
              >
                {metric.value}
              </div>

              <div
                className={`
                  mt-0.5
                  text-[13px]
                  transition

                  ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                `}
              >
                {metric.label}
              </div>
            </button>
          );
        })}

      </div>

      {/* Chart */}
      <div className="mt-3">

        <ReactApexChart
          key={`${period}-${activeMetric}`}
          options={options}
          series={series}
          type="area"
          height={220}
        />

      </div>
    </div>
  );
};

export default ApexChart;