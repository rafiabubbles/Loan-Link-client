import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-role", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${currentUser?.email}`);
      return res.data;
    },
    enabled: !!currentUser?.email,
  });

  return { role, isLoading };
};

export default useRole;
