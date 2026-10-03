import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useOrdersDetails= (id:string|null)=>{
  const {data:order,isLoading} = useQuery({
    queryKey:["orders-details", id],
    queryFn:()=>api.get(`/admin/orders/${id}`).then(res=>res?.data?.data),
    enabled:!!id
  })

  return {order,isLoading}
}

export default useOrdersDetails