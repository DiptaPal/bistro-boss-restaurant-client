/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBooking = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: reservation = [] } = useQuery({
    queryKey: ["reservations", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/reservations?email=${user?.email}`);
      return response.data;
    },
  });
  return { reservation, refetch };
};

export default useBooking;
