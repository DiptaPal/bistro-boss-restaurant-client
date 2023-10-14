/* eslint-disable react/no-unknown-property */
import { Helmet } from "react-helmet";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format, parseISO } from "date-fns";

const ManageBooking = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: reservation = [], refetch } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      const response = await axiosSecure.get("/reservations/all");
      return response.data;
    },
  });

  const handleAction = (id, selectedValue) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${selectedValue} this booking!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${selectedValue} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/reservation/${id}`, {
            availability: selectedValue,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              toast.success(`Booking ${selectedValue} successfully!`);
            }
          });
      }
    });
  };

  const handleComplete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to complete this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, complete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/reservation/${id}`, {
            getService: "complete",
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Manage Booking</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle
          subtitle="At a Glance!"
          title="MANAGE ALL BOOKINGS"
          black={true}
        />
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="font-body text-3xl font-bold mb-9">
          <h3>Total Orders: {reservation.length}</h3>
        </div>
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>User Email</th>
                <th className="py-6">Phone NUMBER</th>
                <th>Booking Date</th>
                <th>Booking Time</th>
                <th>Availability</th>
                <th>Payment</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {reservation.map((item) => (
                <tr key={item._id}>
                  <th>{item.bookingEmail}</th>
                  <td className="py-6">{item.phoneNo}</td>
                  <td>{format(parseISO(item.date), "yyyy-MM-dd")}</td>
                  <td>{format(parseISO(item.time), "h:mm a")}</td>

                  <td
                    className={`capitalize font-semibold ${
                      (item.availability === "available" && !item.getService)
                        ? "text-green-600"
                        : item.availability === "not available"
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  >
                    {item.getService
                      ? "Already Given"
                      : item.availability || <span>--</span>}
                  </td>
                  <td
                    className={`capitalize font-semibold ${
                      item.payment === "completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.payment}
                  </td>
                  <td>
                    {item.payment === "incomplete" ? (
                      <form>
                        <select
                          name="status"
                          className="select text-base flex-1 text-center"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            handleAction(item._id, selectedValue);
                          }}
                          value={item.availability}
                        >
                          {/* <option disabled selected>Action</option> */}
                          <option disabled value="" className="text-yellow-600">
                            Set Status
                          </option>
                          <option value="available" className="text-green-600">
                            Available
                          </option>
                          <option
                            value="not available"
                            className="text-red-600"
                          >
                            Not Available
                          </option>
                        </select>
                      </form>
                    ) : (
                      <button
                        disabled={item.getService}
                        onClick={() => handleComplete(item._id)}
                        className="btn btn-neutral"
                      >
                        Complete
                      </button>
                    )}
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

export default ManageBooking;
