import { Button, Form, Input } from "antd";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Pencil,
  Phone,
  Save,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "../../../components/Skeleton";
import RemoteImg from "../../../components/RemoteImg";
import useOrdersDetails from "../hooks/useOrdersDetails";
import useOrderNotesUpdate from "../hooks/useOrderNotesUpdate";

const statusTone: Record<string, string> = {
  DELIVERED: "tone-success",
  PENDING: "tone-warning",
  SHIPPED: "tone-brand",
  CANCELLED: "tone-danger",
  PAID: "tone-success",
  UNPAID: "tone-warning",
};

const steps = ["PENDING", "SHIPPED", "DELIVERED"];

function StatusChip({ value }: { value?: string }) {
  if (!value) return null;
  return (
    <span className={`status-chip ${statusTone[value] || "tone-muted"}`}>
      {value.replaceAll("_", " ")}
    </span>
  );
}

function formatPrice(price: number) {
  return `${Number(price || 0).toLocaleString("uz-UZ")} so'm`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function paymentLabel(method?: string) {
  return method === "CASH_ON_DELIVERY" ? "Cash" : method?.replaceAll("_", " ");
}

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, isLoading } = useOrdersDetails(id || null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const { updateOrderNotes, isPending } = useOrderNotesUpdate()

  // updateOrderNotes({values:notes, id:id})
  

  if (isLoading) {
    return (
      <div className="order-detail">
        <Skeleton className="h-36 w-full rounded-2xl" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="card flex min-h-[280px] flex-col items-center justify-center text-center">
        <Package size={28} className="text-muted" />
        <h2 className="mt-3 text-base font-semibold">Order not found</h2>
        <p className="mt-1 text-sm text-muted">This order may have been removed.</p>
        <button type="button" className="btn-ghost mt-4 h-9 px-4 text-sm" onClick={() => navigate("/order")}>
          Back to orders
        </button>
      </div>
    );
  }

  const currentStep = steps.indexOf(order.status);
  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="order-detail">
      <section className="card order-hero">
        <div className="relative z-[1] flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <button
              type="button"
              className="icon-btn shrink-0 bg-surface"
              onClick={() => navigate("/order")}
              aria-label="Back"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
                Order details
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h2 className="truncate text-[22px] font-extrabold tracking-tight">
                  {order.orderNumber}
                </h2>
                <StatusChip value={order.status} />
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-muted">
                <CalendarDays size={13} />
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted">Total</p>
            <p className="text-[22px] leading-tight font-extrabold text-brand">
              {formatPrice(order.total)}
            </p>
            <div className="mt-2 flex flex-wrap justify-end gap-1.5">
              <StatusChip value={order.paymentStatus} />
              <span className="status-chip tone-muted inline-flex items-center gap-1">
                <CreditCard size={12} />
                {paymentLabel(order.paymentMethod)}
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-[1] mt-5 flex items-center gap-2">
          {isCancelled ? (
            <div className="order-step is-cancelled">
              <span className="order-step-dot" />
              <span className="text-[12px] font-semibold text-[var(--app-danger)]">Cancelled</span>
            </div>
          ) : (
            steps.map((step, index) => (
              <div key={step} className="contents">
                <div className={`order-step ${index <= currentStep ? "is-done" : ""} ${index === currentStep ? "is-current" : ""}`}>
                  <span className="order-step-dot" />
                  <span className={`text-[11px] font-semibold ${index <= currentStep ? "text-brand" : "text-muted"}`}>
                    {step.charAt(0) + step.slice(1).toLowerCase()}
                  </span>
                </div>
                {index < steps.length - 1 ? (
                  <span className={`order-step-line ${index < currentStep ? "is-done" : ""}`} />
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MiniStat icon={ShoppingBag} label="Items" value={String(order.items?.length || 0)} />
        <MiniStat icon={CreditCard} label="Payment" value={order.paymentStatus} />
        <MiniStat icon={Truck} label="Delivery" value={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <section className="card">
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand">
              <User size={16} />
            </span>
            <div>
              <h3 className="section-title">Customer</h3>
              <p className="text-[11px] text-muted">Buyer information</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-canvas p-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-sm font-bold text-brand">
              {order.user?.firstName?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">
                {order.user?.firstName} {order.user?.lastName}
              </p>
              <p className="mt-1 flex items-center gap-1.5 truncate text-[12px] text-muted">
                <Mail size={12} />
                {order.user?.email || "—"}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
                <Phone size={12} />
                {order.user?.phone || "—"}
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand">
              <MapPin size={16} />
            </span>
            <div>
              <h3 className="section-title">Delivery address</h3>
              <p className="text-[11px] text-muted">Shipping destination</p>
            </div>
          </div>
          <div className="rounded-2xl bg-canvas p-3">
            <p className="font-semibold">{order.addressSnapshot?.title || "Address"}</p>
            <p className="mt-1 text-sm text-muted">
              {[order.addressSnapshot?.region, order.addressSnapshot?.city, order.addressSnapshot?.district]
                .filter(Boolean)
                .join(", ") || "—"}
            </p>
            <p className="mt-1 text-[12px] text-muted">
              {[order.addressSnapshot?.street, order.addressSnapshot?.house].filter(Boolean).join(", ") || "—"}
            </p>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1.4fr)_320px]">
        <section className="card card-flush overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag size={15} className="text-brand" />
              <h3 className="section-title">Items</h3>
            </div>
            <span className="status-chip tone-muted">{order.items?.length || 0} products</span>
          </div>
          <div className="p-3">
            {order.items?.length ? (
              order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="soft-row flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-canvas ring-1 ring-line">
                      {item.productImage ? (
                        <RemoteImg src={item.productImage} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-brand">
                          {item.productName?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{item.productName}</p>
                      <p className="truncate text-[11px] text-muted">{item.productSku}</p>
                      <p className="mt-1 text-[11px] text-muted">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-bold">{formatPrice(item.total)}</p>
                </div>
              ))
            ) : (
              <p className="px-4 py-8 text-center text-sm text-muted">No items</p>
            )}
          </div>
        </section>

        <section className="card order-summary-card">
          <h3 className="section-title mb-4">Summary</h3>
          <div className="space-y-3 text-sm">
            <Row label="Subtotal" value={formatPrice(order.subtotal)} />
            <Row
              label="Discount"
              value={order.discount > 0 ? `- ${formatPrice(order.discount)}` : "0 so'm"}
            />
            <Row label="Delivery" value={formatPrice(order.deliveryFee)} />
            <div className="rounded-2xl bg-brand-soft px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-extrabold text-brand">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <section className="card">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h3 className="section-title">Notes</h3>
              <p className="text-[11px] text-muted">Internal comment</p>
            </div>
            {!isEditingNotes ? (
              <button type="button" className="icon-btn h-8 w-8" onClick={() => {
                setNotes(order.notes || "");
                setIsEditingNotes(true);
              }} aria-label="Edit notes">
                <Pencil size={14} />
              </button>
            ) : null}
          </div>
          {isEditingNotes ? (
            <div className="space-y-3">

              <Form>
                <Form.Item
                >
                  <Input
                  className="pb-10!"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add a note..."
                  />
                </Form.Item>
              </Form>
              <div className="flex justify-end gap-2">
                <Button  onClick={() => setIsEditingNotes(false)}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  loading={isPending}
                  icon={<Save size={13} />}
                  onClick={() => updateOrderNotes({values:notes, id:id})}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-canvas px-3 py-3 text-sm text-muted">
              {order.notes || "No notes added."}
            </div>
          )}
        </section>

        <section className="card">
          <h3 className="section-title mb-1">Order history</h3>
          <p className="mb-4 text-[11px] text-muted">Status changes</p>
          <div className="space-y-3">
            {order.statusHistory?.length ? (
              order.statusHistory.map((history: any, index: number) => (
                <div key={`${history.status}-${history.createdAt}-${index}`} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${statusTone[history.status] === "tone-success"
                        ? "bg-[var(--app-success)]"
                        : statusTone[history.status] === "tone-danger"
                          ? "bg-[var(--app-danger)]"
                          : statusTone[history.status] === "tone-warning"
                            ? "bg-[var(--app-warning)]"
                            : "bg-brand"
                      }`} />
                    {index < order.statusHistory.length - 1 ? (
                      <span className="mt-1 w-px flex-1 bg-line" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl bg-canvas px-3 py-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <StatusChip value={history.status} />
                      <span className="text-[11px] text-muted">{formatDate(history.createdAt)}</span>
                    </div>
                    {history.comment ? <p className="mt-1.5 text-sm">{history.comment}</p> : null}
                    {history.changedBy ? (
                      <p className="mt-1 text-[11px] text-muted">{history.changedBy}</p>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No history yet.</p>
            )}
          </div>
        </section>
      </div>

      <section className="card">
        <h3 className="section-title mb-3">Order information</h3>
        <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3 lg:grid-cols-6">
          <Info label="Order ID" value={order.id} />
          <Info label="User ID" value={order.userId} />
          <Info label="Order number" value={order.orderNumber} />
          <Info label="Payment" value={paymentLabel(order.paymentMethod)} />
          <Info label="Created" value={formatDate(order.createdAt)} />
          <Info label="Updated" value={formatDate(order.updatedAt)} />
        </div>
      </section>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShoppingBag;
  label: string;
  value: string;
}) {
  return (
    <div className="card flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
        <Icon size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-muted">{label}</p>
        <p className="truncate text-sm font-bold capitalize">{value.replaceAll("_", " ").toLowerCase()}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0 rounded-2xl bg-canvas px-3 py-2.5">
      <p className="mb-1 text-[11px] text-muted">{label}</p>
      <p className="truncate text-sm font-medium" title={value}>
        {value || "—"}
      </p>
    </div>
  );
}
