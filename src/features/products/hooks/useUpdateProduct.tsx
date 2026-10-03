import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { ProductFormValues } from "../types/product";

const useUpdateProduct = () => {
  const query = useQueryClient();
  const { mutate: updateProduct, isPending } = useMutation({
    mutationKey: ["update-product"],
    mutationFn: ({ payload, id }: { payload: ProductFormValues; id?: string }) =>
      api.patch(`/admin/products/${id}`, payload),
    onSuccess: () => {
      message.success("Product updated");
      query.invalidateQueries({ queryKey: ["product-details"] });
      query.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updateProduct, isPending };
};

export default useUpdateProduct;
