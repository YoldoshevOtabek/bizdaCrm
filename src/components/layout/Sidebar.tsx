import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import logoMark from "../../assets/svg/logo-mark.svg";
import photo from "../../assets/img/photo.png";
import RemoteImg from "../RemoteImg";
import { sidebarRoutes } from "../../constants/navigate";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Tooltip } from "antd";
import { useUser } from "../../features/auth/context/UserContext";
import { useLayout } from "../../context/LayoutContext";

export default function Sidebar() {
  const { user, logOut: logout } = useUser();
  const { collapsed, mobileOpen, toggleCollapsed, closeMobile } = useLayout();
  const compact = collapsed && !mobileOpen;

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="overlay lg:hidden"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      ) : null}

      <aside
        className={`app-sidebar fixed inset-y-0 left-0 z-40 flex h-screen flex-col text-ink transition-all duration-300 ${
          compact ? "is-compact w-[84px]" : "w-[264px]"
        } ${
          mobileOpen ? "translate-x-0" : "max-lg:-translate-x-full lg:translate-x-0"
        }`}
      >
        <div
          className={`sidebar-brand flex px-3 ${
            compact
              ? "flex-col items-center gap-3 py-4"
              : "h-16 items-center justify-between px-4"
          }`}
        >
          <Link to="/dashboard" className="flex min-w-0 items-center gap-3" onClick={closeMobile}>
            {compact ? (
              <img
                src={logoMark}
                alt="Bizda"
                className="h-10 w-10 rounded-2xl shadow-[0_8px_18px_rgba(15,118,110,0.22)]"
              />
            ) : (
              <img
                src={logo}
                alt="Bizda"
                className="h-8 w-auto max-w-[132px] object-contain object-left dark:invert dark:hue-rotate-180"
              />
            )}
          </Link>
          <button
            type="button"
            className="sidebar-toggle hidden lg:grid"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>
        </div>

        {!compact ? (
          <p className="sidebar-kicker">Main menu</p>
        ) : (
          <div className="mx-5 mb-3 h-px bg-line/80" />
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto px-0 pb-4">
          {sidebarRoutes.map((item) => {
            const link = (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={closeMobile}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <span className="sidebar-ico">
                  <item.icon size={18} strokeWidth={1.85} />
                </span>
                {!compact ? <span className="sidebar-label">{item.label}</span> : null}
              </NavLink>
            );

            return compact ? (
              <Tooltip key={item.id} title={item.label} placement="right">
                {link}
              </Tooltip>
            ) : (
              link
            );
          })}
        </nav>

        <div className="sidebar-foot">
          <div className={`sidebar-user ${compact ? "is-compact" : ""}`}>
            <RemoteImg
              className="sidebar-avatar"
              src={user?.avatar}
              fallback={photo}
              alt=""
            />
            {!compact ? (
              <div className="min-w-0 flex-1">
                <strong className="block truncate text-[13px] font-semibold">
                  {user?.firstName} {user?.lastName}
                </strong>
                <span className="block truncate text-[11px] text-muted">
                  {user?.email}
                </span>
              </div>
            ) : null}
            <Tooltip title="Log out" placement="right">
              <button
                type="button"
                onClick={logout}
                className="sidebar-logout"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </Tooltip>
          </div>
        </div>
      </aside>
    </>
  );
}
