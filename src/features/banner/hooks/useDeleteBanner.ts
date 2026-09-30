import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import http from "../../../services/http";

const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-banner"],

    mutationFn: async (id: string) => {
      const response = await http.delete(`/admin/banners/${id}`);

      return response.data;
    },

    onSuccess: () => {
      message.success("Banner deleted");

      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },

    onError: () => {
      message.error("Banner o'chirishda xatolik yuz berdi");
    },
  });
};

export default useDeleteBanner;