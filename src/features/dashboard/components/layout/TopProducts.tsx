import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import useTopProducts from "../../hooks/useTopProducts";
import Skeleton from "../../../../components/Skeleton";
import RemoteImg from "../../../../components/RemoteImg";

export default function TopProducts() {
  const { topProducts, isLoading } = useTopProducts();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = topProducts ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item: any) => {
      const name = String(item?.name ?? "").toLowerCase();
      const sku = String(item?.sku ?? "").toLowerCase();
      return name.includes(q) || sku.includes(q);
    });
  }, [topProducts, query]);

  return (
    <div className="card flex h-full min-h-[320px] flex-col overflow-hidden">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="section-title">Top Products</h4>
        <Link to="/products" className="link-quiet">
          All
        </Link>
      </div>
      <label className="search-field w-full shrink-0">
        <Search size={14} className="text-muted" />
        <input
          type="search"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="mt-2 min-h-0 flex-1 divide-y divide-line overflow-y-auto">
        {isLoading
          ? [1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-2.5 py-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
                <Skeleton className="h-3 w-12" />
              </div>
            ))
          : filtered.map((item: any) => (
              <div key={item.sku ?? item.id ?? item.name} className="soft-row flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-brand-soft text-brand">
                  {item?.image ? (
                    <RemoteImg src={item.image} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-medium">{item.name}</h4>
                  <p className="truncate text-[11px] text-muted">{item.sku}</p>
                </div>
                <h4 className="shrink-0 text-xs font-bold">
                  {typeof item.price === "number"
                    ? `${item.price.toLocaleString("uz-UZ")} so'm`
                    : item.price}
                </h4>
              </div>
            ))}
        {!isLoading && filtered.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted">No data</p>
        ) : null}
      </div>
    </div>
  );
}
