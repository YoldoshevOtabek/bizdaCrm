import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import http from "../../../services/http";
import type { UpdateProfileData } from "../types/profile";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-profile"],

    mutationFn: async (data: UpdateProfileData) => {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        avatar: data.avatar,
      };

      console.log("UPDATE PROFILE PAYLOAD:", payload);

      const response = await http.patch(
        "/admin/profile",
        payload
      );

      console.log(
        "UPDATE PROFILE RESPONSE:",
        response.data
      );

      return response.data;
    },

    onSuccess: () => {
      message.success("Profile successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (error: any) => {
      console.log("STATUS:", error?.response?.status);
      console.log("BACKEND ERROR:", error?.response?.data);
      console.log("SENT DATA:", error?.config?.data);

      message.error(
        error?.response?.data?.message ||
          "Profile yangilashda xatolik"
      );
    },
  });
};

export default useUpdateProfile;