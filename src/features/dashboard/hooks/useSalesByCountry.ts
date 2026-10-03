import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useSalesByCountry= ()=>{
  const {data:salesByCountry,isLoading:isLoadingsalesByCountry} = useQuery({
    queryKey:["sales-by-country"],
    queryFn:()=>api.get("/admin/dashboard/sales-by-country").then(res=>res?.data)
  })

  return {salesByCountry,isLoadingsalesByCountry}
}

export default useSalesByCountry