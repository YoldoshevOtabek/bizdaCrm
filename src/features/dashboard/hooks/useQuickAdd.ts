import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useQuickAdd= ()=>{
  const {data,isLoading} = useQuery({
    queryKey:["quick-add"],
    queryFn:()=>api.get("/admin/dashboard/quick-add").then(res=>res?.data?.data)
  })

  return {data,isLoading}
}

export default useQuickAdd