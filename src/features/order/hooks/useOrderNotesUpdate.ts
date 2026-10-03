import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";

const useOrderNotesUpdate = () => {
  const query = useQueryClient();
  const { mutate: updateOrderNotes, isPending } = useMutation({
    mutationKey: ["update-order-notes"],
    mutationFn: ({ values, id }: { values: string; id?: string }) =>
      api.patch(`/admin/orders/${id}`, { notes: values }),
    onSuccess: () => {
      message.success("Order notes updated");
      query.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updateOrderNotes, isPending };
};

export default useOrderNotesUpdate;
