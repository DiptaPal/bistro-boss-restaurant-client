/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GiWallet } from "react-icons/gi";
import { FaTruckMoving, FaUsers } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
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
  Legend
} from "recharts";

const AdminDashboard = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  //color bar and pie chart
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  //bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
              {stats.revenue}
            </h1>
            <p className="text-xl sm:text-2xl">Revenue</p>
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
              {stats.users && stats.users.toString().length === 1 ? `0${stats.users}` : stats.users}
            </h1>
            <p className="text-xl sm:text-2xl">Customers</p>
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
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              {stats.products && stats.products.toString().length === 1 ? `0${stats.products}` : stats.products}
            </h1>
            <p className="text-xl sm:text-2xl">Products</p>
          </div>
        </div>
        <div
          className="text-white flex justify-center items-center gap-6 py-8 px-8 sm:px-12 rounded-md flex-1"
          style={{
            background: "linear-gradient(90deg, #6AAEFF 0%, #B6F7FF 100%)",
          }}
        >
          <FaTruckMoving className="text-3xl sm:text-5xl"></FaTruckMoving>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              {stats.orders && stats.orders.toString().length === 1 ? `0${stats.orders}` : stats.orders}
            </h1>
            <p className="text-xl sm:text-2xl">Orders</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-16 bg-gray-200">
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              // className="w-[200px] h-[150px] sm:w-[400px] sm:h-[300px] md:w-[500px] md:h-[400px]"
              width={500}
              height={500}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar
                dataKey="totalPrice"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-baseline justify-center gap-2 pb-3">
            <div className="w-4 h-3 bg-[#8884d8]"></div>
            <p className="text-center text-[#8884d8] text-xl font-bold leading-none">
              sold
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart width={500} height={500}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="itemCount"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend dataKey="category" fill="#8884d8" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
