import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

/* eslint-disable react/prop-types */
const FoodCard = ({ menu }) => {
  const { name, recipe, image, price, _id } = menu;
  const { refetch } = useCart();

  const { user } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const item = {
    userId: user?.uid,
    userName: user?.displayName,
    email: user?.email,
    foodId: _id,
    name,
    image,
    price,
    categoryType: "Food Order",
  };
  const handleAddToCart = () => {
    if (user && user?.email) {
      fetch("https://bistro-boss-restaurant-server-woad.vercel.app/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Added to cart");
            refetch(); // refetch cart to update the number of items in the cart
          }
        });
    } else {
      toast.error("Please login first");
      navigate("/login", { state: { from: location } });
    }
  };
  return (
    <div className="card max-w-96 bg-base-100 shadow-xl rounded-t-none">
      <figure className="w-full">
        <img
          className="w-full object-cover object-center h-[300px]"
          src={image}
        />
      </figure>
      <p className="absolute bg-black py-2 px-3 rounded-md text-white right-5 top-5">
        ${price}
      </p>
      <div className="card-body items-center text-center bg-[#F3F3F3]">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={() => handleAddToCart()}
            className={`px-4 py-3 rounded-md uppercase text-xl text-[#BB8506] border-b-2 border-[#BB8506] bg-[#E8E8E8] hover:bg-[#1F2937] hover:border-[#1F2937] duration-500 ${
              isAdmin && "hidden"
            }`}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
