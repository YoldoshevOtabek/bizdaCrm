import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../../services/api";

export type ProfileUpdateValues = {
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
};

const useUpdateProfile = () => {
  const query = useQueryClient();
  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (data: ProfileUpdateValues) => api.patch(`/admin/auth/profile`, data),
    onSuccess: () => {
      message.success("Profile updated");
      query.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { updateProfile, isPending };
};

export default useUpdateProfile;
