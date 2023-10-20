/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import loginBgImage from "../../assets/others/authentication.png";
import loginImg from "../../assets/others/authentication2.png";
import { BiLogoFacebook, BiLogoGoogle, BiLogoGithub } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // You can use a different icon library if you prefer
import { Helmet } from "react-helmet-async";

const Registration = () => {
  const navigate = useNavigate();


  const {
    createUser,
    updateUserProfile,
    googleSignIn,
    facebookSignIn,
    githubSignIn,
    user
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            fetch("https://bistro-boss-restaurant-server-l2ff0sdju-diptapal.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                userUid: result.user.uid,
                name: data.name,
                email: data.email,
                photoURL: data.photoURL,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  toast.success("Registration Success");
                  navigate("/");
                }
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      fetch("https://bistro-boss-restaurant-server-l2ff0sdju-diptapal.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userUid: user.uid,
          name: user.name,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId || data.message === "User already exists") {
            toast.success("Registration Success");
            navigate("/");
          }
        });
    });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn().then((result) => {
      const user = result.user;
      fetch("https://bistro-boss-restaurant-server-l2ff0sdju-diptapal.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userUid: user.uid,
          name: user?.name,
          email: user?.email,
          photoURL: user?.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId || data.message === "User already exists") {
            toast.success("Registration Success");
            navigate("/");
          }
        });
    });
  };

  const handleGithubSignIn = () => {
    githubSignIn().then((result) => {
      const user = result.user;
      fetch("https://bistro-boss-restaurant-server-l2ff0sdju-diptapal.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userUid: user.uid,
          name: user?.name,
          email: user?.email,
          photoURL: user?.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId || data.message === "User already exists") {
            toast.success("Registration Success");
            navigate("/");
          }
        });
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Registration</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${loginBgImage})`,
        }}
        className="py-28 px-2"
      >
        <div
          className="hero max-w-screen-2xl mx-auto py-10"
          style={{ boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-[100px] px-4">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h3 className="font-bold text-4xl text-center">Sign Up</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Name</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered focus:outline-none w-full"
                  />
                  {errors.name && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Photo URL</span>
                  </label>
                  <input
                    {...register("photoURL", { required: true })}
                    type="text"
                    placeholder="URL"
                    className="input input-bordered focus:outline-none w-full"
                  />
                  {errors.photoURL && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Email</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Type here"
                    className="input input-bordered focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{6,}$/,
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="input input-bordered focus:outline-none w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 text-xl flex items-center pr-3 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-600">
                      {errors.password?.type === "required" &&
                        "Password is required"}
                      {errors.password?.type === "minLength" &&
                        "Password must be at least 6 characters long"}
                      {errors.password?.type === "maxLength" &&
                        "Password must not exceed 20 characters"}
                      {errors.password?.type === "pattern" && (
                        <>
                          Password must contain:
                          <ul>
                            <li>At least one uppercase letter</li>
                            <li>At least one lowercase letter</li>
                            <li>
                              At least one special character (!, @, #, $, &, *)
                            </li>
                            <li>At least one numeric digit</li>
                          </ul>
                        </>
                      )}
                    </span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    value="Sign Up"
                    type="submit"
                    className="btn bg-[#D1A054] hover:bg-gray-500 text-white"
                  />
                </div>
              </form>
              <div>
                <p className="text-center text-xl pt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#D1A054] hover:text-gray-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <p className="text-center text-xl">Or sign up with</p>
              <div>
                <div className="flex justify-center gap-12">
                  <button
                    onClick={() => {
                      handleFacebookSignIn();
                    }}
                    className="p-3 hover:bg-gray-500 text-2xl hover:text-white rounded-full border border-gray-500 duration-500"
                  >
                    <BiLogoFacebook></BiLogoFacebook>
                  </button>
                  <button
                    onClick={() => {
                      handleGoogleSignIn();
                    }}
                    className="p-3 hover:bg-gray-500 text-2xl hover:text-white rounded-full border border-gray-500 duration-500"
                  >
                    <BiLogoGoogle></BiLogoGoogle>
                  </button>
                  <button
                    onClick={() => {
                      handleGithubSignIn();
                    }}
                    className="p-3 hover:bg-gray-500 text-2xl hover:text-white rounded-full border border-gray-500 duration-500"
                  >
                    <BiLogoGithub></BiLogoGithub>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <img src={loginImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
