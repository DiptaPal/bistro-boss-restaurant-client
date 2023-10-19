/* eslint-disable react/no-unknown-property */
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "./MyCart.css";
import Swal from "sweetalert2";

const MyCart = () => {
  const { cart, refetch } = useCart();
  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.price, 0.0)
    .toFixed(2);

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
        fetch(`https://bistro-boss-restaurant-server-eight.vercel.app//carts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Item deleted successfully");
              refetch();
            }
          });
      }
    });
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      updateCart(updatedItem);
    }
  };

  const increment = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    updateCart(updatedItem);
  };

  const customQuantity = (item, quantity) => {
    const updatedItem = { ...item, quantity: parseInt(quantity) };
    updateCart(updatedItem);
  };

  const updateCart = (updatedItem) => {
    fetch(`https://bistro-boss-restaurant-server-eight.vercel.app//carts/${updatedItem._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle subtitle="My Cart" title="WANNA ADD MORE?" black={true} />
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 sm:p-12 mb-20">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center font-body text-3xl font-bold mb-9">
          <h3>
            Total Orders: {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </h3>
          <h3>Total Price: ${totalPrice}</h3>
          <Link
            disabled={cart.length === 0}
            to="/dashboard/payment"
            className="btn btn-md bg-[#D1A054] text-white hover:text-[#D1A054] rounded-md"
          >
            Pay
          </Link>
        </div>
        <div className="overflow-x-auto rounded-t-xl">
          <table className="table text-center text-base">
            <thead className="bg-[#D1A054] text-white py-6">
              <tr className="uppercase">
                <th>Quantity</th>
                <th className="py-6">ITEM IMAGE</th>
                <th>ITEM NAME</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="5">
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
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <th>
                        <div className="flex flex-row h-10 w-full max-w-[120px] mx-auto rounded-lg relative bg-transparent mt-1">
                          <button
                            onClick={() => decrement(item)}
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                          >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input
                            type="number"
                            className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700"
                            name="custom-input-number"
                            value={item.quantity || 0}
                            onChange={(e) =>
                              customQuantity(item, e.target.value)
                            }
                          />
                          <button
                            onClick={() => increment(item)}
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </th>
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
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
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
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
