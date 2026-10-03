import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";
import type { BannerPayload } from "../types/banner";

const useUpdateBanner = () => {
  const query = useQueryClient();
  const { mutate: updateBanner, isPending } = useMutation({
    mutationKey: ["update-banner"],
    mutationFn: ({ payload, id }: { payload: BannerPayload; id?: string }) =>
      api.patch(`/admin/banners/${id}`, payload),
    onSuccess: () => {
      message.success("Banner updated");
      query.invalidateQueries({ queryKey: ["banner-details"] });
      query.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updateBanner, isPending };
};

export default useUpdateBanner;
