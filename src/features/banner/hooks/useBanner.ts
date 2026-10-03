import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useBanners = ()=>{
  const {data:banners,isLoading} = useQuery({
    queryKey:["banners"],
    queryFn:()=>api.get("/admin/banners").then(res=>res?.data)
  })

  return {banners,isLoading}
}

export default useBanners