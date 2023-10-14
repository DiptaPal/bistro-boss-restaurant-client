/* eslint-disable no-unused-vars */
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet";

const Payment = () => {
  const location = useLocation();
  const { cart, refetch } = useCart();
  //total price
  const price = cart
    .reduce((sum, item) => sum + item.quantity * item.price, 0.0)
    .toFixed(2);

  //quantity
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);


  const stripPromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  return (
    <div>
      {/* <div className="flex flex-col justify-center gap-9 items-center h-screen">
        <h1 className="text-4xl">PAYMENT</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2">
              <input
                {...register("cardNumber", { required: true })}
                type="text"
                placeholder="Recipe you liked most"
                className="input input-bordered focus:outline-none w-full py-10 text-base md:text-xl"
              />
              {errors.cardNumber && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <input
                {...register("paymentDate", { required: true })}
                type="text"
                placeholder="Recipe you liked most"
                className="input input-bordered focus:outline-none w-full py-10 text-base md:text-xl"
              />
              {errors.paymentDate && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>

        </form>
      </div> */}
      <Helmet>
        <title>Bistro Boss | Payment</title>
      </Helmet>
      <Elements stripe={stripPromise}>
        <CheckoutForm price={price} quantity={quantity} cart={cart}/>
      </Elements>
    </div>
  );
};

export default Payment;
