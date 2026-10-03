import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useOrders= ()=>{
  const {data:orders,isLoading} = useQuery({
    queryKey:["orders"],
    queryFn:()=>api.get("/admin/orders").then(res=>res?.data?.data)
  })

  return {orders,isLoading}
}

export default useOrders