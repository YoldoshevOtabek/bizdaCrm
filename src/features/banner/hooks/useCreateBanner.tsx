import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { BannerPayload } from "../types/banner";

const useCreateBanner = () => {
  const query = useQueryClient();
  const { mutate: createBanner, isPending } = useMutation({
    mutationKey: ["create-banner"],
    mutationFn: (data: BannerPayload) => api.post(`/admin/banners`, data),
    onSuccess: () => {
      message.success("Banner created");
      query.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { createBanner, isPending };
};

export default useCreateBanner;
