import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";

export type PasswordUpdateValues = {
  currentPassword: string;
  newPassword: string;
};

const useUpdatePassword = () => {
  const { mutate: updatePassword, isPending } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: (data: PasswordUpdateValues) =>
      api.patch(`/admin/auth/change-password`, data),
    onSuccess: () => {
      message.success("Password updated");
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updatePassword, isPending };
};

export default useUpdatePassword;
