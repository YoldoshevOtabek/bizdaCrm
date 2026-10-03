import { useMutation,useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"


const useDeleteBrand = () => {
    const query = useQueryClient()
    const {mutate, isPending } = useMutation({
        mutationKey: ['remove-brand'],
        mutationFn: (id: string) => api.delete(`/admin/brands/${id}`),
        onSuccess: () => {
            message.success("Brand deleted")
            query.invalidateQueries({queryKey:["brands"]})
        },
        onError: () => {
            message.error("Error")
        }
    })
    return {mutate,isPending}
}

export default useDeleteBrand