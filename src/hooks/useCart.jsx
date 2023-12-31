import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useCart = () => {
  const { user, loading } = useAuth();
  // const accessToken = localStorage.getItem('accessToken');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    // queryFn: async () => {
    //     const res = await fetch(`https://bistro-boss-restaurant-server-l2ff0sdju-diptapal.vercel.app/carts?email=${user?.email}`, { headers: {
    //         authorization: `bearer ${token}`
    //     }})
    //     return res.json();
    // },
    queryFn: async () => {
      if (!user || loading) {
        return [];
      }
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      // console.log("res from axios", res);
      return res.data;
    },
  });

  return { cart, refetch };
};
export default useCart;
