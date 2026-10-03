import { Link } from "react-router-dom";
import useBestSellingProducts from "../../hooks/useBestSellingProducts";
import Skeleton from "../../../../components/Skeleton";
import RemoteImg from "../../../../components/RemoteImg";

export default function BestProduct() {
  const { bestSellingProducts, isLoading } = useBestSellingProducts();
  const rows = (bestSellingProducts ?? []).slice(0, 5);

  return (
    <div className="card flex h-full min-h-[320px] flex-col overflow-hidden">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="section-title">Best Selling Products</h4>
        <Link to="/products" className="link-quiet">
          All
        </Link>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <table className="app-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? [1, 2, 3, 4].map((item) => (
                  <tr key={item}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-7 w-7 rounded-md" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </td>
                    <td>
                      <Skeleton className="h-3 w-8" />
                    </td>
                    <td>
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </td>
                    <td>
                      <Skeleton className="h-3 w-16" />
                    </td>
                  </tr>
                ))
              : rows.map((item: any, index: number) => (
                  <tr key={item.id ?? item.name}>
                    <td>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="w-4 text-[11px] font-bold text-muted">{index + 1}</span>
                        <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-brand-soft text-brand">
                          {item?.image ? (
                            <RemoteImg src={item.image} alt="" className="h-full w-full object-cover" />
                          ) : null}
                        </div>
                        <span className="truncate text-xs">{item.name}</span>
                      </div>
                    </td>
                    <td>{item.orders}</td>
                    <td>
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                        {item.status}
                      </span>
                    </td>
                    <td className="font-semibold">
                      {Number(item.price ?? 0).toLocaleString("uz-UZ")} so'm
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!isLoading && rows.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted">No data</p>
        ) : null}
      </div>
    </div>
  );
}
