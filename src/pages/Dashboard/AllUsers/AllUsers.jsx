/* eslint-disable react/no-unknown-property */
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { RiDeleteBinLine, RiShieldUserFill } from "react-icons/ri";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {

  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user as a admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bistro-boss-restaurant-server-eight.vercel.app//users/admin/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "admin" }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              toast.success("User role updated successfully");
            }
          });
      }
    });
  };

  const handleDelete = (user) => {
    if (user.role === "admin") {
      toast.error("You can't delete an admin");
      return;
    } else {
      // Swal.fire({
      //   title: "Are you sure?",
      //   text: "You won't be able to revert this!",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonColor: "#3085d6",
      //   cancelButtonColor: "#d33",
      //   confirmButtonText: "Yes, delete it!",
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     deleteUser(user)
      //       .then(() => {
      //         fetch(`https://bistro-boss-restaurant-server-eight.vercel.app//users/${user._id}`, {
      //           method: "DELETE",
      //         })
      //           .then((res) => res.json())
      //           .then((data) => {
      //             if (data.deletedCount > 0) {
      //               toast.success("Reservation delete successfully");
      //               refetch();
      //             }
      //           });
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   }
      // });
      toast.error("Firebase does not modify it 🥲!")
    }
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle
          subtitle="How many??"
          title="MANAGE ALL USERS"
          black={true}
        />
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center font-body text-3xl font-bold mb-9">
          <h3>Total Users: {users.length}</h3>
        </div>
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>NO</th>
                <th className="py-6">NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td className="py-6">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="flex justify-center">
                      {user.role === "admin" ? (
                        <button
                          title="User"
                          className="btn bg-[#54d15e] text-white hover:text-[#D1A054] btn-md text-2xl"
                        >
                          <RiShieldUserFill />
                        </button>
                      ) : (
                        <button
                          title="Make Admin"
                          onClick={() => handleAdmin(user._id)}
                          className="btn bg-[#D1A054] text-white hover:text-[#D1A054] btn-md text-2xl"
                        >
                          <FaUsers />
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn bg-red-600 text-white hover:text-[#D1A054] btn-md text-2xl"
                    >
                      <RiDeleteBinLine />
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

export default AllUsers;
