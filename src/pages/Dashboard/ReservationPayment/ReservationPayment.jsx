/* eslint-disable no-unused-vars */
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet";
import ReservationCheckoutForm from "./ReservationCheckoutForm";

const ReservationPayment = () => {
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
      <Helmet>
        <title>Bistro Boss | Payment</title>
      </Helmet>
      <Elements stripe={stripPromise}>
        <ReservationCheckoutForm price={price} quantity={quantity} cart={cart}/>
      </Elements>
    </div>
  );
};

export default ReservationPayment;
