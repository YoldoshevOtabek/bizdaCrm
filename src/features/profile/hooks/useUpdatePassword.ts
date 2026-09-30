import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import http from "../../../services/http";

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

const useUpdatePassword = () => {
  return useMutation({
    mutationKey: ["update-password"],

    mutationFn: async (data: UpdatePasswordData) => {
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      console.log("PASSWORD PAYLOAD:", payload);

      const response = await http.patch(
        "/admin/profile/password",
        payload
      );

      console.log(
        "PASSWORD RESPONSE:",
        response.data
      );

      return response.data;
    },

    onSuccess: () => {
      message.success("Password successfully updated");
    },

    onError: (error: any) => {
      console.log(
        "PASSWORD STATUS:",
        error?.response?.status
      );

      console.log(
        "PASSWORD ERROR:",
        error?.response?.data
      );

      message.error(
        error?.response?.data?.message ||
          "Password yangilashda xatolik"
      );
    },
  });
};

export default useUpdatePassword;