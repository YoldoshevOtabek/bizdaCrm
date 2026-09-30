import { useQuery } from "@tanstack/react-query";
import http from "../../../services/http";

const useProfile = () => {
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],

    queryFn: async () => {
      console.log("PROFILE REQUEST START");

      const response = await http.get("/admin/profile");

      console.log("PROFILE RESPONSE:", response.data);
      console.log("PROFILE DATA:", response.data?.data);

      // Backenddan kelayotgan haqiqiy profile
      const admin = response.data?.data;

      console.log("ADMIN FROM HOOK:", admin);

      return admin;
    },
  });

  return {
    profileData,
    isLoading,
    isError,
    error,
  };
};

export default useProfile;