import { useQuery } from "@tanstack/react-query";
import http from "../../../services/http";

const useBanner = () => {
  
  const {
    data: bannerData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await http.get("/admin/banners");
      return response?.data?.data;
    },
  });
  return {
    bannerData,
    isLoading,
    isError,
  
}      

}
export default useBanner;