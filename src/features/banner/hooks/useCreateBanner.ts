import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import http from "../../../services/http";

const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-banner"],

    mutationFn: async (data: any) => {
      const response = await http.post("/admin/banners", data);

      return response.data;
    },

    onSuccess: () => {
     

      queryClient.invalidateQueries({
        queryKey: ["banner"],
      });
    },

    onError: () => {
      message.error("Banner qo'shishda xatolik yuz berdi");
    },
  });
};

export default useCreateBanner;