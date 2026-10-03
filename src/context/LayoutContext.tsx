import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LayoutContextValue = {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (value: boolean) => void;
  toggleCollapsed: () => void;
  setMobileOpen: (value: boolean) => void;
  toggleMobile: () => void;
  closeMobile: () => void;
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

function readCollapsed() {
  try {
    return localStorage.getItem("crm-sidebar") === "collapsed";
  } catch {
    return false;
  }
}

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsedState] = useState(readCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.sidebar = collapsed
      ? "collapsed"
      : "expanded";
    localStorage.setItem("crm-sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const value = useMemo(
    () => ({
      collapsed,
      mobileOpen,
      setCollapsed: setCollapsedState,
      toggleCollapsed: () => setCollapsedState((prev) => !prev),
      setMobileOpen,
      toggleMobile: () => setMobileOpen((prev) => !prev),
      closeMobile: () => setMobileOpen(false),
    }),
    [collapsed, mobileOpen],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return ctx;
};
