import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useBrands = ()=>{
  const {data:brands,isLoading} = useQuery({
    queryKey:["brands"],
    queryFn:()=>api.get("/admin/brands").then(res=>res?.data)
  })

  return {brands,isLoading}
}

export default useBrands