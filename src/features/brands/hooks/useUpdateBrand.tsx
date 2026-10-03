import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { BrandFormValues } from "../types/brand";

const useUpdateBrand = () => {
  const query = useQueryClient();
  const { mutate: updateBrand, isPending } = useMutation({
    mutationKey: ["update-brand"],
    mutationFn: ({ payload, id }: { payload: BrandFormValues; id?: string }) =>
      api.patch(`/admin/brands/${id}`, payload),
    onSuccess: () => {
      message.success("Brand updated");
      query.invalidateQueries({ queryKey: ["brand-details"] });
      query.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updateBrand, isPending };
};

export default useUpdateBrand;
