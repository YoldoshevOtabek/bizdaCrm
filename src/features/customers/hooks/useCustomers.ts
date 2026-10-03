import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useCustomers = ()=>{
  const {data,isLoading} = useQuery({
    queryKey:["customers"],
    queryFn:()=>api.get("/admin/customers").then(res=>res?.data)
  })

  return {data,isLoading}
}

export default useCustomers