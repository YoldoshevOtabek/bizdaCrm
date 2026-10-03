import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { CategoryFormValues } from "../types/categories";

const useCreateCategory = () => {
  const query = useQueryClient();
  const { mutate: createCategory, isPending } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: (data: CategoryFormValues) => api.post(`/admin/categories`, data),
    onSuccess: () => {
      message.success("Category created");
      query.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { createCategory, isPending };
};

export default useCreateCategory;
