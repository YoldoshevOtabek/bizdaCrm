import { Outlet } from "react-router-dom";

export default function Context() {
  return (
    <div className="min-w-0 overflow-x-hidden px-4 py-4 pt-20 md:px-5">
      <Outlet />
    </div>
  );
}
