import { useEffect } from "react";
import { useDarkMode } from "./context/DarkMode";
import AppRoute from "./routes/AppRoute";
import AntdTheme from "./components/theme/AntdTheme";
import LayoutProvider from "./context/LayoutContext";

export default function App() {
  const { isDark } = useDarkMode();

  useEffect(() => {
    document.title = "Bizda";
  }, [isDark]);

  return (
    <AntdTheme>
      <LayoutProvider>
        <AppRoute />
      </LayoutProvider>
    </AntdTheme>
  );
}
