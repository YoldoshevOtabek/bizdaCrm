import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";

const useUpdateCustomerStatus = () => {
  const query = useQueryClient();
  const { mutate: updateCustomerStatus, isPending } = useMutation({
    mutationKey: ["update-customer-status"],
    mutationFn: ({ values, id }: { values: { isActive: boolean }; id: string }) =>
      api.patch(`/admin/customers/${id}/status`, values),
    onSuccess: () => {
      message.success("Status updated");
      query.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updateCustomerStatus, isPending };
};

export default useUpdateCustomerStatus;
