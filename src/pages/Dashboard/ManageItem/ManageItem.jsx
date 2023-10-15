/* eslint-disable react/no-unknown-property */
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItem = () => {
  const [menu, , refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

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
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Menu Deleted Successfully");
          } else {
            toast.error("Something went wrong");
          }
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Manage Item</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle
          subtitle="Hurry Up!"
          title="MANAGE ALL ITEMS"
          black={true}
        />
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>Quantity</th>
                <th className="py-6">ITEM IMAGE</th>
                <th>ITEM NAME</th>
                <th>Category</th>
                <th>PRICE</th>
                <th>ACTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td className="py-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <th>
                    <Link
                      to={`/dashboard/edititem/${item._id}`}
                      className="btn bg-[#D1A054] text-white hover:text-[#D1A054] btn-md text-2xl"
                    >
                      <TiEdit></TiEdit>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-red-600 text-white hover:text-[#D1A054] btn-md text-2xl"
                    >
                      <RiDeleteBinLine></RiDeleteBinLine>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItem;
