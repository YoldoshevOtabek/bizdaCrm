import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { ProductFormValues } from "../types/product";

const useCreateProduct = () => {
  const query = useQueryClient();
  const { mutate: createProduct, isPending } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: (data: ProductFormValues) => api.post(`/admin/products`, data),
    onSuccess: () => {
      message.success("Product created");
      query.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { createProduct, isPending };
};

export default useCreateProduct;
