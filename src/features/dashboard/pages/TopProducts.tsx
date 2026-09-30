import { Search } from "lucide-react";
import useDashboard from "../hooks/useDashboardQuery";
import { Spin } from "antd";

export const TopProducts = () => {
  const {
    topProduct,
    topProductLoading,
    topProductError,
  } = useDashboard<any>();

  if (topProductLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (topProductError) {
    return (
      <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-4 p-5">
        <p className="text-red-500 text-sm">
          Top products yuklanmadi
        </p>
      </div>
    );
  }

  return (
    <div className="content-mood shadow-[0px_1px_3px_0px_#00000033] rounded-lg col-span-4 p-[20px_16px_10px_16px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold">
          Top Products
        </h2>

        <button className="text-[12px] text-[#5B5FEF]">
          All products
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex h-10 items-center gap-3 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3">
          <Search
            size={20}
            strokeWidth={1.8}
            className="text-[#697586]"
          />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#8A94A6]"
          />
        </div>
      </div>

      {/* Products */}
      <div className="border-t max-h-75 overflow-y-scroll border-[#E1E1E1]">
        {topProduct?.map((product: any) => (
          <div
            key={product.id}
            className="flex min-h-[80px] items-center justify-between  border-b border-[#E1E1E1] px-4"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              {/* Product image */}
              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F5F5F5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product info */}
              <div>
                <h3 className="max-w-[130px] text-[14px] font-medium leading-[17px]">
                  {product.name}
                </h3>

                <p className="mt-1 text-[12px] text-[#8A94A6]">
                  SKU: {product.sku}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="whitespace-nowrap text-[15px] font-semibold">
              {Number(product.price).toLocaleString("uz-UZ")} so'm
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};