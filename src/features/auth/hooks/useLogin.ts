import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

type LoginValues = {
  email: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginValues) =>
      api.post("/admin/auth/login", data).then((res) => res?.data),
    onSuccess: (data) => {
      localStorage.setItem("crmAccessToken", data?.data?.accessToken);
      localStorage.setItem("crmRefreshToken", data?.data?.refreshToken);
      message.success("Success");
      navigate("/dashboard");
    },
    onError: () => {
      message.error("Error");
    },
  });
  return { isPending, mutate };
};

export default useLogin;
