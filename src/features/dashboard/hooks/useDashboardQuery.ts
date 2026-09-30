import { useQuery } from "@tanstack/react-query";
import http from "../../../services/http";

const useDashboard = () => {
  // KPI cards
  const {
    data: kpis,
    isLoading: kpisLoading,
    isError: kpisError,
  } = useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: async () => {
      const response = await http.get("/admin/dashboard/kpis");
      return response.data;
    },
  });

  // Weekly report + chart
  const {
    data: weeklyReport,
    isLoading: weeklyLoading,
    isError: weeklyError,
  } = useQuery({
    queryKey: ["dashboard-weekly-report"],
    queryFn: async () => {
      const response = await http.get(
        "/admin/dashboard/weekly-report"
      );
      return response.data;
    },
  });

  // Realtime-Users
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["realtime-users"],
    queryFn: async () => {
      const response = await http.get(
        "/admin/dashboard/realtime-users"
      );
      return response.data?.data ?? null;
    },
  });

  // Sales By Country
  const {
    data: salesByCountry,
    isLoading: countryLoading,
    isError: countryError,
  } = useQuery({
    queryKey: ["sales-by-country"],
    queryFn: async () => {
      const response = await http.get(
        "/admin/dashboard/sales-by-country"
      );
      return response.data?.data ?? [];
    },
  });
  // Top Products
  const {
    data: topProduct,
    isLoading: topProductLoading,
    isError: topProductError,
  } = useQuery({
    queryKey: ["top-product"],
    queryFn: async () => {
      const response = await http.get(
        "/admin/dashboard/top-products"
      );
      return response?.data?.data ?? [];
    },
  });
  // Best Sellers
  const {
    data: bestSell,
    isLoading: bestSellLoading,
    isError: bestSellError,
  } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: async () => {
      const response = await http.get(
        "/admin/dashboard/best-sellers"
      );
      return response?.data?.data ?? [];
    },
  });


  return {
    kpis,
    weeklyReport,
    usersData,
    salesByCountry,
    topProduct,
    bestSell,
   

    isLoading: kpisLoading || weeklyLoading || usersLoading || countryLoading || topProductLoading || bestSellLoading,
    isError: kpisError || weeklyError || usersError || countryError || topProductError || bestSellError,
  };
};

export default useDashboard;