import { ChevronRight, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useQuickAdd from "../../hooks/useQuickAdd";
import Skeleton from "../../../../components/Skeleton";
import RemoteImg from "../../../../components/RemoteImg";

export function QuickAddCategories() {
  const { data, isLoading } = useQuickAdd();
  const categories = (data?.categories ?? []).slice(0, 6);

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="section-title">Quick Add Categories</h4>
        <Link to="/categories" className="link-quiet inline-flex items-center gap-1">
          All
        </Link>
      </div>
      <div className="dashboard-list flex flex-col gap-1.5">
        {isLoading
          ? [1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-line px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-3 w-3" />
              </div>
            ))
          : categories.map((item: any) => (
              <Link
                key={item?.id}
                to={`/categories/${item?.id}`}
                className="soft-row flex items-center justify-between border border-line"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-md bg-canvas">
                    {item?.image ? (
                      <RemoteImg src={item.image} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <h4 className="truncate text-xs font-medium">{item?.name}</h4>
                </div>
                <ChevronRight size={14} className="shrink-0 text-muted" />
              </Link>
            ))}
        {!isLoading && categories.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted">No data</p>
        ) : null}
      </div>
    </div>
  );
}

export function QuickAddProducts() {
  const { data, isLoading } = useQuickAdd();
  const navigate = useNavigate();
  const products = (data?.products ?? []).slice(0, 6);

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="section-title">Quick Add Products</h4>
        <Link to="/products" className="link-quiet inline-flex items-center gap-1">
          <PlusCircle size={13} /> New
        </Link>
      </div>
      <div className="dashboard-list divide-y divide-line">
        {isLoading
          ? [1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-7 w-12 rounded-lg" />
              </div>
            ))
          : products.map((item: any) => (
              <div key={item?.id} className="soft-row flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-md border border-line">
                    {item?.image ? (
                      <RemoteImg src={item.image} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-xs font-medium">{item?.name}</h4>
                    <p className="truncate text-[11px] text-brand">
                      {Number(item?.price ?? 0).toLocaleString("uz-UZ")} so'm
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-primary h-7 shrink-0 rounded-lg px-2 text-[11px]"
                  onClick={() => navigate(`/products/${item?.id}`)}
                >
                  Add
                </button>
              </div>
            ))}
        {!isLoading && products.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted">No data</p>
        ) : null}
      </div>
    </div>
  );
}

export default function AddNewProduct() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <QuickAddCategories />
      <QuickAddProducts />
    </div>
  );
}
