/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GiWallet } from "react-icons/gi";
import { FaStar, FaUsers } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { MdLocalGroceryStore, MdShoppingCart } from "react-icons/md";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Legend,
} from "recharts";

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["user-stats"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className=" mt-16 mx-6">
      <h1 className="font-body text-xl sm:text-3xl font-semibold mb-8">
        Hi, Welcome Back!
      </h1>
      <div className="flex justify-between flex-wrap gap-6">
        <div
          className="text-white flex justify-center items-center gap-6 py-8  px-8 sm:px-12 rounded-md flex-1"
          style={{
            background: "linear-gradient(90deg, #BB34F5 0%, #FCDBFF 100%)",
          }}
        >
          <GiWallet className="text-3xl sm:text-5xl"></GiWallet>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              {stats.products && stats.products.toString().length === 1
                ? `0${stats.products}`
                : stats.products}
            </h1>
            <p className="text-xl sm:text-2xl">Menu</p>
          </div>
        </div>
        <div
          className="text-white flex justify-center items-center gap-6 py-8 px-8 sm:px-12 rounded-md flex-1"
          style={{
            background: "linear-gradient(90deg, #D3A256 0%, #FDE8C0 100%)",
          }}
        >
          <FaUsers className="text-3xl sm:text-5xl"></FaUsers>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              {stats?.result?.length < 10 ? (
                <span>0{stats?.result?.length}</span>
              ) : (
                stats?.result?.length
              )}
            </h1>
            <p className="text-xl sm:text-2xl">Category</p>
          </div>
        </div>
        <div
          className="text-white flex justify-center items-center gap-6 py-8 px-8 sm:px-12 rounded-md flex-1"
          style={{
            background: "linear-gradient(90deg, #FE4880 0%, #FECDE9 100%)",
          }}
        >
          <MdLocalGroceryStore className="text-3xl sm:text-5xl"></MdLocalGroceryStore>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">03</h1>
            <p className="text-xl sm:text-2xl">Contact</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-16">
        <div className="w-full lg:w-1/2 bg-[#FFEDD5] py-20 border-b-4 md:border-r-4 md:border-b-0 border-[#D1A054] flex-1">
          <div className="flex flex-col items-center gap-8">
            <div className="w-1/4 h-1/4 rounded-full">
              <img
                src={user?.photoURL}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <p className="text-xl sm:text-3xl font-body">{user?.displayName}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-[#FEF9C3] flex-1 py-20">
          <div className="md:ml-24">
            <h1 className="uppercase text-xl lg:text-3xl font-body font-semibold text-center md:text-left">
              Your Activities
            </h1>
            <div className="space-y-2 mt-8">
              <div className="flex justify-center md:justify-start items-center gap-1 font-semibold text-lg sm:text-2xl font-body text-[#0088FE]">
                <MdShoppingCart /> <h4>Orders: {stats.totalOrders}</h4>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-1 font-semibold text-lg sm:text-2xl font-body text-[#00C4A1]">
                <FaStar /> <h4>Reviews: {stats.totalReviews}</h4>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-1 font-semibold text-lg sm:text-2xl font-body text-[#FFBB28]">
                <FaCalendarDays /> <h4>Bookings: {stats.totalBookings}</h4>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-1 font-semibold text-lg sm:text-2xl font-body text-[#FF8042]">
                <MdShoppingCart /> <h4>Payment: {stats.totalPayments}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
