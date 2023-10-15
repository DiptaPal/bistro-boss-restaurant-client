import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/order-history?email=${user?.email}`
      );
      return response.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order History</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle
          subtitle="Excellent Ambience"
          title="Order History"
          black={true}
        />
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>No</th>
                <th>Items</th>
                <th className="py-6">Email</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div>
                      <p className="text-2xl py-4">No items in cart</p>
                      <button className="btn bg-[#d1a054] text-white hover:bg-gray-600">
                        <Link to="/shop/salad">Go to Shop Page</Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {orders.map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td className="py-6">{item.totalQuantity} items</td>
                      <td>{item.email}</td>
                      <td>${item.totalPrice}</td>
                      <td className="text-green-600 font-semibold">Paid</td>
                      <td>
                        {item.orderStatus === "delivered" ? (
                          <span className="font-semibold text-green-600">
                            Delivered
                          </span>
                        ) : (
                          <span className="font-semibold text-red-600">
                            Not Delivered
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
