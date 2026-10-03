import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";


const getCategoryDetails = (id:string|null)=>{
  const {data,isLoading} = useQuery({
    queryKey:["categories-details"],
    queryFn:()=>api.get(`/admin/categories/${id}`).then(res=>res?.data),
  })

  return {data,isLoading}
}

export default getCategoryDetails