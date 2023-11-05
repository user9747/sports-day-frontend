import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { LOCALSTORAGE_KEYS } from "../../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ userName }) => {
      return axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        userName,
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Unable to login");
    },
    onSuccess: (data, i) => {
      auth.setAppState({
        token: data?.data?.data.token,
        userName: i.userName,
        role: "",
        isAuthenticated: true,
      });
      localStorage.setItem(LOCALSTORAGE_KEYS.TOKEN, data?.data?.data.token);
      localStorage.setItem(LOCALSTORAGE_KEYS.ROLE, "");
      localStorage.setItem(LOCALSTORAGE_KEYS.USERNAME, i.userName);
      navigate("/");
    },
  });
};
