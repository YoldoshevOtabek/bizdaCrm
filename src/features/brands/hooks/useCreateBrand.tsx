import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { BrandFormValues } from "../types/brand";

const useCreateBrand = () => {
  const query = useQueryClient();
  const { mutate: createBrand, isPending } = useMutation({
    mutationKey: ["create-brand"],
    mutationFn: (data: BrandFormValues) => api.post(`/admin/brands`, data),
    onSuccess: () => {
      message.success("Brand created");
      query.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { createBrand, isPending };
};

export default useCreateBrand;
