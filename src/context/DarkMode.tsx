import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type DarkModeContextValue = {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  isSun: boolean;
  setIsSun: Dispatch<SetStateAction<boolean>>;
};

const DarkMode = createContext<DarkModeContextValue | undefined>(undefined);

function readInitialDark() {
  try {
    const theme = localStorage.getItem("crm-theme");
    if (theme === "dark") return true;
    if (theme === "light") return false;
    const legacy = localStorage.getItem("myKey");
    return legacy ? Boolean(JSON.parse(legacy)) : false;
  } catch {
    return false;
  }
}

const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(readInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem("crm-theme", isDark ? "dark" : "light");
    localStorage.setItem("myKey", JSON.stringify(isDark));
  }, [isDark]);

  const value = useMemo(
    () => ({
      isDark,
      setIsDark,
      toggle: () => setIsDark((prev) => !prev),
      isSun: isDark,
      setIsSun: setIsDark,
    }),
    [isDark],
  );

  return <DarkMode.Provider value={value}>{children}</DarkMode.Provider>;
};

export const useDarkMode = () => {
  const ctx = useContext(DarkMode);
  if (!ctx) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }
  return ctx;
};

export default DarkModeProvider;
