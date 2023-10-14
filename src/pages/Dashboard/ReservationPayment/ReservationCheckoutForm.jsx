/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import "./ReservationCheckoutForm.css";
import { useLoaderData, useNavigate } from "react-router-dom";

const ReservationCheckoutForm = () => {
  const { user } = useAuth();
  const item = useLoaderData();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cartError, setCartError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (item.price > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: parseFloat(item.price).toFixed(2) * parseInt(item.guest),
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [item.price, item.guest, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCartError(error.message);
    } else {
      setCartError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("[error]", confirmError);
      setCartError(confirmError.message);
    }
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      //save payment info to database
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        date: new Date(),
        totalPrice: parseFloat(item.price).toFixed(2) * parseInt(item.guest),
        guest: item.guest,
        phoneNo: item.phoneNo,
        bookingMail: item.bookingMail,
        categoryType: "Reservation",
        orderId: item._id,

      };
      axiosSecure.post("/reservationpayments", payment).then((res) => {
        if (res.data.result.insertedId) {
          toast.success("Payment successful");
          navigate("/dashboard/mybooking");
        }
      });
    }
  };

  return (
    <div className="mx-2 sm:mx-6 md:mx-12 lg:mx-24">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="w-full mx-auto">
          <h1 className="text-4xl text-center my-10">PAYMENT</h1>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="my-10">
            {cartError && (
              <span className="text-red-600 text-center">{cartError}</span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={!stripe || !clientSecret || processing}
              className="btn hover:bg-gray-500 text-white text-xl w-3/4 sm:w-1/3 mx-auto mt-10"
              style={{
                background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
              }}
            >
              Pay
            </button>
          </div>
        </form>
        {transactionId && (
          <p className=" my-10 text-center text-base text-green-600">
            Transaction complete with transactionId:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ReservationCheckoutForm;
