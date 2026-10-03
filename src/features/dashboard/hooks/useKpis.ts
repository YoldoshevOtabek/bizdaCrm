import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useKpis= ()=>{
  const {data:kips,isLoading:isLoadingKpis} = useQuery({
    queryKey:["kpis"],
    queryFn:()=>api.get("/admin/dashboard/kpis").then(res=>res?.data)
  })

  return {kips,isLoadingKpis}
}

export default useKpis