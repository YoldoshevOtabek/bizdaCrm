import useDashboard from "../hooks/useDashboardQuery";
import { Spin } from "antd";

export const BestSellingProduct = () => {
  const {
    bestSell,
    bestSellLoading,
    bestSellError,
  } = useDashboard();

 
  if (bestSellLoading) {
    return (
      <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-8 p-10 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (bestSellError) {
    return (
      <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-8 p-5">
        <p className="text-sm text-red-500">
          Best selling products yuklanmadi
        </p>
      </div>
    );
  }

  return (
    <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-8 p-2.5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-[18px]">
          Best Selling Product
        </span>
      </div>

      {/* Table Header */}
      <div className="mt-4 grid grid-cols-4 items-center rounded-lg bg-[#e0e2e0] px-4 py-3 text-[11px] font-medium uppercase text-[#68727D]">
        <div>Product</div>
        <div>Total Order</div>
        <div>Status</div>
        <div>Price</div>
      </div>

      {/* Rows */}
      <div className="max-h-75 overflow-y-scroll">
        {bestSell?.map((product: any) => (
          <div
            key={product.id}
            className=" grid grid-cols-4 items-center border-b border-[#E1E1E1] px-4 py-3 text-sm"
          >
            {/* Product */}
            <div className="flex items-center gap-3 ">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F5F5F5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <span className="block max-w-[180px] truncate font-semibold">
                  {product.name}
                </span>

                <span className="block text-[11px] text-[#8A94A6]">
                  SKU: {product.sku}
                </span>
              </div>
            </div>

            {/* Total Order */}
            <div className="text-[#5a6472]">
              {product.totalOrders ?? product.orders}
            </div>

            {/* Status */}
            <div
              className={`flex items-center gap-2 ${
                product.status === "Stock"
                  ? "text-[#16B957]"
                  : "text-[#FF4444]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  product.status === "Stock"
                    ? "bg-[#16B957]"
                    : "bg-[#FF4444]"
                }`}
              />

              <span>{product.status}</span>
            </div>

            {/* Price */}
            <div className="font-semibold">
              {Number(product.price).toLocaleString("uz-UZ")} so'm
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};