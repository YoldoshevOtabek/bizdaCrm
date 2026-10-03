import { useMutation,useQueryClient } from "@tanstack/react-query"
import api from "../../../services/api"
import { message } from "antd"


const useDeleteBanner = () => {
    const query = useQueryClient()
    const {mutate, isPending } = useMutation({
        mutationKey: ['remove-banner'],
        mutationFn: (id: string) => api.delete(`/admin/banners/${id}`),
        onSuccess: () => {
            message.success("Banner deleted")
            query.invalidateQueries({queryKey:["banners"]})
        },
        onError: () => {
            message.error("Error")
        }
    })
    return {mutate,isPending}
}

export default useDeleteBanner