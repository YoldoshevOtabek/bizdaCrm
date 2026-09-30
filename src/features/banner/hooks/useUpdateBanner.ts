import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import http from "../../../services/http";

const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-banner"],

    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => {
      const response = await http.patch(
        `/admin/banners/${id}`,
        data
      );

      return response.data;
    },

    onSuccess: () => {
      

      queryClient.invalidateQueries({
        queryKey: ["banner"],
      });
    },

    onError: () => {
      message.error("Banner yangilashda xatolik yuz berdi");
    },
  });
};

export default useUpdateBanner;