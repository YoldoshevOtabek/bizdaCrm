import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useTopProducts= ()=>{
  const {data:topProducts,isLoading} = useQuery({
    queryKey:["top-products"],
    queryFn:()=>api.get("/admin/dashboard/top-products").then(res=>res?.data?.data)
  })

  return {topProducts,isLoading}
}

export default useTopProducts