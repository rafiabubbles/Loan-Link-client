import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://micro-loan-server.vercel.app",
});

const useAxiosSecure = () => {
  const { currentUser, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Request Interceptor: Token refresh logic
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (currentUser) {
          // .accessToken bad diye .getIdToken() use kora must
          const token = await currentUser.getIdToken(true);
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2. Response Interceptor: 401/403 handle
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOutUser();
          navigate("/login");
          toast.error("Session expired. Please login again.");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser, logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;