import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWeekend } from "date-fns";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { BsCalendar3, BsClock, BsFillClockFill } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { LuCalendarRange } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import "./Reservation.css";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedTime, setSelectedTime] = useState(new Date().setHours(8, 0));
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();

  const [axiosSecure] = useAxiosSecure();
  const datepickerRef = useRef(null);
  const timepickerRef = useRef(null);

  const { user } = useContext(AuthContext);

  const [minTime, setMinTime] = useState(
    isWeekend(new Date())
      ? new Date().setHours(10, 0)
      : new Date().setHours(8, 0)
  );
  const [maxTime, setMaxTime] = useState(
    isWeekend(new Date())
      ? new Date().setHours(23, 0)
      : new Date().setHours(22, 0)
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Determine if it's a weekend or weekday and set the min/max time accordingly
    if (isWeekend(date)) {
      setMinTime(new Date().setHours(10, 0));
      setMaxTime(new Date().setHours(23, 0));
    } else {
      setMinTime(new Date().setHours(8, 0));
      setMaxTime(new Date().setHours(22, 0));
    }
  };

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to book this table!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Conform it!",
    }).then((result) => {
      if (result.isConfirmed) {
        data.guest = data.guest === "custom" ? data.customGuest : data.guest;
        axiosSecure
          .post("/reservations", {
            userId: user?.uid,
            userName: user?.displayName,
            email: user?.email,
            date: selectedDate,
            time: startDate,
            guest: data.guest,
            name: data.name,
            phoneNo: data.phoneNo,
            bookingEmail: data.email,
            categoryType: "Reservation",
            price: 14.5,
            payment: "incomplete",
            availability: "",
            getService: "",
          })
          .then((res) => {
            if (res.data.insertedId) {
              toast.success("Reservation successful");
              reset();
              navigate('/dashboard/mybooking')
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Reservation</title>
      </Helmet>
      <div className="my-10">
        <div className="flex flex-col justify-center items-center m-10">
          <SectionTitle
            subtitle="Reservation"
            title="BOOK a Table"
            black={true}
          />
        </div>
        <h1 className="text-center text-3xl font-body font-semibold">
          Per Person: <span className="text-[#B58130]">$14.5</span>
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-2 sm:mx-6 md:mx-12 lg:mx-32 py-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Date*</span>
                </label>
                <div className="flex justify-between items-center gap-2 input input-bordered">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    placeholderText="mm/dd/yyyy"
                    required
                    className="focus:outline-none w-full"
                    ref={datepickerRef}
                  />
                  <BsCalendar3
                    onClick={() => {
                      if (datepickerRef.current) {
                        datepickerRef.current.setOpen(true);
                      }
                    }}
                    className="text-3xl text-gray-500 cursor-pointer"
                  ></BsCalendar3>
                </div>
                {errors.date && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Time*</span>
                </label>
                <div className="flex justify-between items-center gap-2 input input-bordered">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    dateFormat="h:mm aa"
                    placeholderText="-- / -- --"
                    required
                    minTime={minTime}
                    maxTime={maxTime}
                    className="focus:outline-none w-full"
                    ref={timepickerRef}
                  />
                  <BsClock
                    onClick={() => {
                      if (timepickerRef.current) {
                        timepickerRef.current.setOpen(true);
                      }
                    }}
                    className="text-3xl text-gray-500 cursor-pointer"
                  ></BsClock>
                </div>
                {errors.time && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Guest*</span>
                </label>
                <div className="flex justify-between items-center gap-2">
                  <select
                    defaultValue="0"
                    {...register("guest", { required: true })}
                    className="input input-bordered focus:outline-none flex-1"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="custom">Custom</option>
                  </select>
                  {watch("guest") === "custom" && (
                    <input
                      {...register("customGuest", { required: true })}
                      type="number"
                      placeholder="Enter guest number"
                      className="input input-bordered focus:outline-none"
                    />
                  )}
                </div>
                {errors.guest ||
                  (errors.customGuest && (
                    <span className="text-red-600">This field is required</span>
                  ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Name*</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered focus:outline-none"
                />
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Phone*</span>
                </label>
                <input
                  {...register("phoneNo", { required: true })}
                  type="number"
                  placeholder="Phone Number"
                  className="input input-bordered focus:outline-none"
                />
                {errors.phoneNo && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Email*</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered focus:outline-none"
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className="btn hover:bg-gray-500 text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
                }}
              >
                Book A Table
                <LuCalendarRange className="text-2xl text-white"></LuCalendarRange>
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center my-10">
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
      </div>
    </>
  );
};

export default Reservation;
