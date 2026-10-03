import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { CategoryFormValues } from "../types/categories";

const useUpdateCategory = () => {
  const query = useQueryClient();
  const { mutate: updateCategory, isPending } = useMutation({
    mutationKey: ["update-category"],
    mutationFn: ({ values, id }: { values: CategoryFormValues; id?: string }) =>
      api.patch(`/admin/categories/${id}`, values),
    onSuccess: () => {
      message.success("Category updated");
      query.invalidateQueries({ queryKey: ["categories-details"] });
      query.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updateCategory, isPending };
};

export default useUpdateCategory;
