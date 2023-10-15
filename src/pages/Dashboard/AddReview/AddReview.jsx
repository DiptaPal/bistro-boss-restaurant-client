import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useForm } from "react-hook-form";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-toastify";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#d0d0d0",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const review = {
      userId: user?.uid,
      userName: user?.displayName,
      email: user?.email,
      ...data,
      rating,
    };

    fetch("https://bistro-boss-restaurant-server-eight.vercel.app/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Review added successfully");
          reset();
          setRating(0);
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Add Review</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center my-10">
        <SectionTitle
          subtitle="Sharing is Caring!!!"
          title="GIVE A REVIEW..."
          black={true}
        />
      </div>
      <div className="bg-[#F3F3F3] mx-2 sm:mx-6 md:mx-12 lg:mx-24 py-6 md:px-32 mb-20 text-center">
        <h1 className="font-body text-3xl font-medium">Rate Us!</h1>
        <div className="py-4 flex justify-center items-center">
          <Rating
            style={{ maxWidth: 300 }}
            value={rating}
            onChange={setRating}
            itemStyles={myStyles}
            isRequired={true}
          />
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-left"
          >
            <div className="form-control">
              <label className="label">
                <span className="text-xl font-semibold">
                  Which recipe you liked most?
                </span>
              </label>
              <input
                {...register("foodName", { required: true })}
                type="text"
                placeholder="Recipe you liked most"
                className="input input-bordered focus:outline-none w-full py-10 text-base md:text-xl"
              />
              {errors.foodName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-xl font-semibold">
                  Do you have any suggestion for us?
                </span>
              </label>
              <input
                {...register("suggestion", { required: true })}
                type="text"
                placeholder="Suggestion"
                className="input input-bordered focus:outline-none w-full py-10 text-base md:text-xl"
              />
              {errors.suggestion && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-xl font-semibold">
                  Kindly express your care in a short way.
                </span>
              </label>
              <textarea
                {...register("details", { required: true })}
                type="text"
                placeholder="Review in detail"
                className="input input-bordered focus:outline-none w-full resize-none py-10 text-base md:text-xl h-48"
              />
              {errors.details && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div className="flex items-start">
              <button
                type="submit"
                className="btn hover:bg-gray-500 text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
                }}
              >
                Send Review
                <BsFillRocketTakeoffFill className="text-2xl text-white"></BsFillRocketTakeoffFill>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
