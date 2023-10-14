/* eslint-disable react/no-unknown-property */
import { Helmet } from "react-helmet";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useBooking from "../../../hooks/useBooking";
import { RiDeleteBinLine } from "react-icons/ri";

const MyBooking = () => {
  const { reservation, refetch } = useBooking();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bistro-boss-restaurant-server-theta.vercel.app/reservation/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Reservation delete successfully");
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | My Booking</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle
          subtitle="Excellent Ambience"
          title="MY BOOKINGS"
          black={true}
        />
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center font-body text-3xl font-bold mb-9">
          <h3>Total Orders: {reservation.length}</h3>
        </div>
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>NO</th>
                <th className="py-6">GUEST NUMBER</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>Availability</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {reservation.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div>
                      <p className="text-2xl py-4">No items in cart</p>
                      <button className="btn bg-[#d1a054] text-white hover:bg-gray-600">
                        <Link to="/dashboard/reservation">Go to Booking Page</Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {reservation.map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td className="py-6">{item.guest}</td>
                      <td>${item.price}</td>
                      <td>
                        ${item.price * (item.guest === "0" ? 1 : item.guest)}
                      </td>
                      <td>
                        {item.getService ? (
                          <span className="text-yellow-600 font-semibold capitalize">
                            {item.getService && "Already Taken"}
                          </span>
                        ) : item.availability === "available" ? (
                          <span className="text-green-600 font-semibold">
                            We are Waiting
                          </span>
                        ) : item.availability === "not available" ? (
                          <span className="text-red-600 font-semibold">
                            Not Available
                          </span>
                        ) : (
                          <span className="text-black font-semibold">
                            Wait for Response
                          </span>
                        )}
                      </td>
                      <td>
                        {item.payment === "completed" ? (
                          <span className="font-semibold text-green-600">
                            Paid
                          </span>
                        ) : (
                          <div className="flex justify-center gap-4">
                            <Link
                              disabled={
                                item.availability === "not available" ||
                                !item.availability
                              }
                              to={`/dashboard/reservation-payment/${item._id}`}
                              className="btn btn-md bg-[#D1A054] text-white hover:text-[#D1A054] rounded-md"
                            >
                              Pay
                            </Link>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="btn bg-red-600 text-white hover:text-[#D1A054] btn-md text-2xl"
                            >
                              <RiDeleteBinLine></RiDeleteBinLine>
                            </button>
                          </div>
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

export default MyBooking;
