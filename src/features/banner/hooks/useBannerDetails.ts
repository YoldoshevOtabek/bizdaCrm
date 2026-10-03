import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useBannerDetails = (id:string|null)=>{
  const {data,isLoading} = useQuery({
    queryKey:["banner-details"],
    queryFn:()=>api.get(`/admin/banners/${id}`).then(res=>res?.data?.data),
    enabled:!!id
  })

  return {data,isLoading}
}

export default useBannerDetails