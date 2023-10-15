import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageOrder = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["manage-orders"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get("/orders/all");
      return response.data;
    },
  });

  const handleDeliver = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Order is delivered?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, conform it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/payments/${id}`)
        .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              toast.success(`Order delivered !!!`);
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Manage Order</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle
          subtitle="Excellent Ambience"
          title="Manage Order"
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
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
                  <td>
                    <button
                      onClick={() => handleDeliver(item._id)}
                      disabled={item.orderStatus === "delivered"}
                      className="btn btn-md bg-yellow-600 text-white px-4 py-2 rounded-md ml-2"
                    >
                      Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
