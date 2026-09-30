import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.css";
import ThemeProvider from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./features/auth/context/UserContext";

const client = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
