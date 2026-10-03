import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useRealTimeUsers= ()=>{
  const {data:realTimeUsers,isLoading} = useQuery({
    queryKey:["real-time-users"],
    queryFn:()=>api.get("/admin/dashboard/realtime-users").then(res=>res?.data?.data)
  })

  return {realTimeUsers,isLoading}
}

export default useRealTimeUsers