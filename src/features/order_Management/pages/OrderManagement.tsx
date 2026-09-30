import { Spin } from "antd";
import useOrders from "../hooks/useOrder";
import OrdersTable from "./OrderListTable";


export const OrderManagement = () => {
  const { data, isLoading } = useOrders();


  const orders = data?.data || [];
  const totalOrders = data?.meta?.total || 0;

  const completedOrders = orders.filter(
    (order: any) => order.status === "DELIVERED"
  ).length;

  const pendingOrders = orders.filter(
    (order: any) => order.status === "PENDING"
  ).length;

  const canceledOrders = orders.filter(
    (order: any) => order.status === "CANCELLED"
  ).length;

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spin size={"large"} />
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <span className="text-[22px]">Order List</span>
        <div className="flex items-center gap-3">
         
          <button className="flex items-center gap-1 px-5 py-3 rounded-lg cursor-pointer bg-white text-black">
            <span className="text-[15px]">More Action</span>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3.5 mt-6">
        {/* Totak Orders */}
        <div className="col-span-3 content-mood shadow-[0px_1px_3px_0px_#00000033]  rounded-lg p-5 ">
          <div className="flex justify-between items-center">
            <b className="text-[18px]">Total Orders</b>
            <span>
              <i className="bi bi-three-dots-vertical"></i>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[32px]">{totalOrders.toLocaleString()}</p>

            <span className="text-[#21C45D] ps-1">
              <i className="bi bi-arrow-up"></i> 10.4%
            </span>
          </div>

          <span className="text-[14px] text-[#606772]">
            Previous 7days <span className="text-[#6467F2]">($235)</span>
          </span>
        </div>
        {/* New Orders */}
        <div className="col-span-3 content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg p-5 ">
          <div className="flex justify-between items-center">
            <b className="text-[18px]">New Orders</b>
            <span>
              <i className="bi bi-three-dots-vertical"></i>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[32px]"> {pendingOrders.toLocaleString()}</p>

            <span className="text-[#21C45D] ps-1">
              <i className="bi bi-arrow-up"></i> 10.4%
            </span>
          </div>

          <span className="text-[14px] text-[#606772]">
            Previous 7days <span className="text-[#6467F2]">($235)</span>
          </span>
        </div>
        {/* Completed Orders */}
        <div className="col-span-3 content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg p-5 ">
          <div className="flex justify-between items-center">
            <b className="text-[18px]">Completed Orders</b>
            <span>
              <i className="bi bi-three-dots-vertical"></i>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[32px]">{completedOrders.toLocaleString()}</p>

            <span className="text-[#21C45D] ps-1">
              <i className="bi bi-arrow-up"></i> 10.4%
            </span>
          </div>

          <span className="text-[14px] text-[#606772]">
            Previous 7days <span className="text-[#6467F2]">($235)</span>
          </span>
        </div>
        {/* Canceled Orders */}
        <div className="col-span-3 content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg p-5 ">
          <div className="flex justify-between items-center">
            <b className="text-[18px]">Canceled Orders</b>
            <span>
              <i className="bi bi-three-dots-vertical"></i>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[32px]"> {canceledOrders.toLocaleString()}</p>

            <span className="text-[#21C45D] ps-1">
              <i className="bi bi-arrow-up"></i> 5
            </span>
          </div>

          <span className="text-[14px] text-[#606772]">
            Previous 7days <span className="text-[#6467F2]">($235)</span>
          </span>
        </div>
      </div>

      {/* Order List Table  */}
      <div className="mt-4">
        <OrdersTable orders={orders} />
      </div>
      
    </div>
  );
};
