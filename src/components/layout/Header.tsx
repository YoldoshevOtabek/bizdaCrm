import { Menu, Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import photo from "../../assets/img/photo.png";
import CommandSearch from "../CommandSearch";
import RemoteImg from "../RemoteImg";
import { useDarkMode } from "../../context/DarkMode";
import { useUser } from "../../features/auth/context/UserContext";
import { useLayout } from "../../context/LayoutContext";

const pageTitle: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/order": "Order Management",
  "/customers": "Customers",
  "/categories": "Categories",
  "/products": "Products",
  "/profile": "Profile",
  "/banner": "Banners",
  "/brands": "Brands",
};

export default function Header() {
  const { pathname } = useLocation();
  const { isDark, setIsDark } = useDarkMode();
  const { user } = useUser();
  const { toggleMobile } = useLayout();

  const currentTitle =
    pageTitle[pathname] ||
    (pathname.startsWith("/products")
      ? "Product Details"
      : pathname.startsWith("/categories")
        ? "Category Details"
        : pathname.startsWith("/order/")
          ? "Order Details"
          : pathname.startsWith("/banner/")
            ? "Banner Details"
            : pathname.startsWith("/brands/")
              ? "Brand Details"
              : pathname.startsWith("/customers/")
                ? "Customer Details"
                : "Dashboard");

  return (
    <header className="fixed top-0 right-0 left-[var(--sidebar-w)] z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-[var(--app-header)] px-4 backdrop-blur-xl transition-[left] duration-300 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="icon-btn lg:hidden"
          onClick={toggleMobile}
          aria-label="Open menu"
        >
          <Menu size={16} />
        </button>
        <h1 className="page-title truncate">{currentTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <CommandSearch />

        <div className="theme-toggle">
          <button
            type="button"
            className={!isDark ? "is-active" : ""}
            onClick={() => setIsDark(false)}
            aria-label="Light mode"
          >
            <Sun size={16} />
          </button>
          <button
            type="button"
            className={isDark ? "is-active" : ""}
            onClick={() => setIsDark(true)}
            aria-label="Dark mode"
          >
            <Moon size={16} />
          </button>
        </div>

        <RemoteImg
          className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-line"
          src={user?.avatar}
          fallback={photo}
          alt=""
        />
      </div>
    </header>
  );
}
