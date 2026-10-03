import { Spin } from "antd";

export default function Spinner({
  variant = "full",
}: {
  variant?: "full" | "page" | "inline";
}) {
  const spin = <Spin size={variant === "inline" ? "small" : "large"} className="app-spinner" />;

  if (variant === "inline") {
    return spin;
  }

  if (variant === "page") {
    return (
      <div className="card flex min-h-[260px] items-center justify-center">
        {spin}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-canvas">
      {spin}
    </div>
  );
}
