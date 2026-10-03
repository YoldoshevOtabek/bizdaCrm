import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const useBrandDetails = (id:string|null)=>{
  const {data,isLoading} = useQuery({
    queryKey: ["brand-details", id],
    queryFn: () => api.get(`/admin/brands/${id}`).then((res) => res?.data?.data),
    enabled: !!id,
  });

  return {data,isLoading}
}

export default useBrandDetails