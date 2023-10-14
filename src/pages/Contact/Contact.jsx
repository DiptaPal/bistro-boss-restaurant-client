import { Helmet } from "react-helmet";
import Hero from "../../Shared/Hero/Hero";
import heroImage from "../../assets/contact/banner.jpg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { FaLocationDot, FaPaperPlane } from "react-icons/fa6";
import { BsFillClockFill } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const Contact = () => {

  const [disable, setDisable] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const checkCaptcha = (value) => {
    if(value) {
      setDisable(true);
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };



  return (
    <div className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Bistro Boss | Contact</title>
      </Helmet>
      <Hero
        coverImage={heroImage}
        title="CONTACT US"
        subtitle="Would you like to try a dish?"
      />
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col justify-center items-center m-10">
          <SectionTitle subtitle="Visit Us" title="OUR LOCATION" black={true} />
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-3 flex-wrap text-center mx-2 sm:mx-6 bg-[#F3F3F3]">
          <div>
            <div className="bg-[#D1A054] py-4 flex justify-center items-center">
              <BiSolidPhoneCall className="text-3xl text-white"></BiSolidPhoneCall>
            </div>
            <div className="py-20">
              <h3 className="uppercase text-2xl font-medium">PHONE</h3>
              <p>+38 (012) 34 56 789</p>
            </div>
          </div>
          <div>
            <div className="bg-[#D1A054] py-4  sm:mx-2 flex justify-center items-center">
              <FaLocationDot className="text-3xl text-white"></FaLocationDot>
            </div>
            <div className="py-20">
              <h3 className="uppercase text-2xl font-medium">ADDRESS</h3>
              <p>+38 (012) 34 56 789</p>
            </div>
          </div>
          <div>
            <div className="bg-[#D1A054] py-4 flex justify-center items-center">
              <BsFillClockFill className="text-3xl text-white"></BsFillClockFill>
            </div>
            <div className="py-20">
              <h3 className="uppercase text-2xl font-medium">WORKING HOURS</h3>
              <p>Mon - Fri: 08:00 - 22:00</p>
              <p>Sat - Sun: 10:00 - 23:00</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center m-10">
          <SectionTitle
            subtitle="Send Us a Message"
            title="CONTACT FORM"
            black={true}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-2 bg-[#F3F3F3] p-4 md:p-12"
        >
          <div className="flex flex-col md:flex-row justify-between md:gap-6 items-center md:mb-3">
            <div className="form-control w-full mb-3 md:mb-0">
              <label className="label">
                <span className="text-xl font-semibold">Name*</span>
              </label>
              <div className="flex justify-between items-center gap-2">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered focus:outline-none flex-1"
                />
              </div>
              {errors.name && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control w-full mb-3 md:mb-0">
              <label className="label">
                <span className="text-xl font-semibold">Email*</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <div className="form-control mb-3">
            <label className="label">
              <span className="text-xl font-semibold">Phone*</span>
            </label>
            <input
              {...register("phone", { required: true })}
              type="phone"
              placeholder="Enter your phone number"
              className="input input-bordered focus:outline-none"
            />
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="text-xl font-semibold">Message*</span>
            </label>
            <textarea
              {...register("message", { required: true })}
              type="text"
              placeholder="Write your message here"
              className="input input-bordered focus:outline-none w-full resize-none py-10 text-base md:text-xl h-52"
            />
            {errors.message && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control mb-3">
            <ReCAPTCHA sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY} onChange={checkCaptcha} />,
          </div>
          <div className="flex justify-center mt-16">
            <button
              type="submit"
              disabled={!disable}
              className="btn px-7 hover:bg-gray-500 text-white"
              style={{
                background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
              }}
            >
              Send Message
              <FaPaperPlane className="text-2xl text-white"></FaPaperPlane>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
