import { ConfigProvider, theme } from "antd";
import type { ReactNode } from "react";
import { useDarkMode } from "../../context/DarkMode";

export default function AntdTheme({ children }: { children: ReactNode }) {
  const { isDark } = useDarkMode();
  const primary = isDark ? "#4ea674" : "#0f766e";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primary,
          colorInfo: primary,
          colorSuccess: isDark ? "#4ade80" : "#059669",
          colorTextLightSolid: "#ffffff",
          fontFamily:
            '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
          borderRadius: 12,
          colorBgBase: isDark ? "#1d1d1d" : "#f3f6f4",
          colorBgContainer: isDark ? "#2b2b2b" : "#ffffff",
          colorBgLayout: isDark ? "#1d1d1d" : "#f3f6f4",
          colorBgElevated: isDark ? "#323232" : "#ffffff",
          colorBgMask: isDark ? "rgba(0, 0, 0, 0.55)" : "rgba(255, 255, 255, 0.45)",
          colorBorder: isDark ? "#373737" : "#dde7e2",
          colorText: isDark ? "#e8e8e8" : "#10211c",
          colorTextHeading: isDark ? "#f3f3f3" : "#10211c",
          colorTextSecondary: isDark ? "#b3b3b3" : "#5d716b",
          colorTextPlaceholder: isDark ? "#8f8f8f" : "#7a8c86",
          colorLink: isDark ? "#86d4a8" : "#0f766e",
          colorLinkHover: isDark ? "#b6e6cb" : "#115e59",
        },
        components: {
          Table: {
            headerBg: isDark ? "#242424" : "#eef6f2",
            headerColor: isDark ? "#d6d6d6" : "#4a5c57",
            rowHoverBg: isDark ? "#333333" : "#f4faf7",
            borderColor: isDark ? "#373737" : "#dde7e2",
            colorText: isDark ? "#e8e8e8" : "#10211c",
          },
          Button: {
            primaryShadow: "none",
            defaultShadow: "none",
            primaryColor: "#ffffff",
          },
          Spin: {
            colorPrimary: primary,
          },
          Input: {
            activeBorderColor: primary,
            colorText: isDark ? "#e8e8e8" : "#10211c",
            colorTextPlaceholder: isDark ? "#8f8f8f" : "#7a8c86",
          },
          Select: {
            colorText: isDark ? "#e8e8e8" : "#10211c",
            colorTextPlaceholder: isDark ? "#8f8f8f" : "#7a8c86",
          },
          Form: {
            labelColor: isDark ? "#e8e8e8" : "#10211c",
          },
          Modal: {
            contentBg: isDark ? "#2b2b2b" : "#ffffff",
            headerBg: isDark ? "#2b2b2b" : "#ffffff",
            titleColor: isDark ? "#f3f3f3" : "#10211c",
          },
          Drawer: {
            colorBgElevated: isDark ? "#2b2b2b" : "#ffffff",
          },
          Pagination: {
            itemActiveBg: primary,
            colorPrimary: primary,
          },
          Tag: {
            defaultColor: isDark ? "#e8e8e8" : "#10211c",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
