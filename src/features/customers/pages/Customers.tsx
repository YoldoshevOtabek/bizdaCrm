import ApexChart from "./ApexChart";
import CustomerTable from "./CustomersTable";
import useCustomer from "../hooks/useCustomers";
import { Spin } from "antd";


export const Customers = () => {
  const {
    customersData,
    isLoading,
    isError,
  } = useCustomer();


  // API dan kelgan customerlar
  const customers = customersData?.data ?? [];


  // =========================
  // TOTAL CUSTOMERS
  // =========================

  const totalCustomers =
    customersData?.meta?.total ?? customers.length;


  // =========================
  // NEW CUSTOMERS
  // =========================
 

  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 7
  );


  const newCustomers = customers.filter(
    (customer: any) =>
      new Date(customer.createdAt) >=
      sevenDaysAgo
  ).length;


  // =========================
  // TOTAL SPENT
  // =========================

  const totalSpent = customers.reduce(
    (total: number, customer: any) =>
      total + Number(customer.totalSpent || 0),
    0
  );


  // =========================
  // ACTIVE CUSTOMERS
  // =========================

  const activeCustomers = customers.filter(
    (customer: any) =>
      customer.isActive
  ).length;


  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin size="large"/>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="p-5 text-red-500">
        Failed to load customers
      </div>
    );
  }


  return (
    <div>

      {/* ================= CARDS ================= */}

      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-3">


          {/* ================= TOTAL CUSTOMERS ================= */}

          <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg p-5">

            <div className="flex justify-between items-center">

              <b className="text-[18px]">
                Total Customers
              </b>

              <span>
                <i className="bi bi-three-dots-vertical"></i>
              </span>

            </div>


            <div className="flex items-center gap-4">

              <p className="text-[32px]">
                {totalCustomers.toLocaleString()}
              </p>

            </div>


            <span className="text-[14px] text-[#606772]">
              All customers
            </span>

          </div>


          {/* ================= NEW CUSTOMERS ================= */}

          <div className="mt-5 content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg p-5">

            <div className="flex justify-between items-center">

              <b className="text-[18px]">
                New Customers
              </b>

              <span>
                <i className="bi bi-three-dots-vertical"></i>
              </span>

            </div>


            <div className="flex items-center gap-4">

              <p className="text-[32px]">
                {newCustomers}
              </p>

            </div>


            <span className="text-[14px] text-[#606772]">
              Previous 7 days
            </span>

          </div>


          {/* ================= ACTIVE CUSTOMERS ================= */}

          <div className="mt-5 content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg p-5">

            <div className="flex justify-between items-center">

              <b className="text-[18px]">
                Active Customers
              </b>

              <span>
                <i className="bi bi-three-dots-vertical"></i>
              </span>

            </div>


            <div className="flex items-center gap-4">

              <p className="text-[32px]">
                {activeCustomers}
              </p>

            </div>


            <span className="text-[14px] text-[#606772]">
              Currently active
            </span>

          </div>

        </div>


        {/* ================= CHART ================= */}

        <div className="col-span-9 row-span-12">

          <ApexChart />

        </div>

      </div>


      {/* ================= CUSTOMER TABLE ================= */}

      <div className="mt-[-150px]">

        <h2>
          Customer Details
        </h2>

        <CustomerTable />

      </div>

    </div>
  );
};