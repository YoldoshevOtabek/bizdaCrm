import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useBestSellingProducts= ()=>{
  const {data:bestSellingProducts,isLoading} = useQuery({
    queryKey:["best-selling-products"],
    queryFn:()=>api.get("/admin/dashboard/best-selling").then(res=>res?.data?.data)
  })

  return {bestSellingProducts,isLoading}
}

export default useBestSellingProducts