/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginBgImage from "../../assets/others/authentication.png";
import loginImg from "../../assets/others/authentication2.png";
import { BiLogoFacebook, BiLogoGoogle, BiLogoGithub } from "react-icons/bi";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [validationCode, setValidationCode] = useState("");
  const [validationError, setValidationError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const { signIn, googleSignIn, facebookSignIn, githubSignIn } =
    useContext(AuthContext);

  const handleValidateCaptcha = (e) => {
    // const captchaCode = e.target.value;
    // if (validateCaptcha(captchaCode) == true) {
    //   setDisabled(false);
    // } else {
    //   setDisabled(true);
    // }
    if (validateCaptcha(validationCode) == true) {
      setDisabled(false);
      setValidationError("");
    } else {
      setDisabled(true);
      setValidationError("Doesn't match. Please try again.");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Login Success");
        navigate(from, { replace: true });
        form.reset();
      })
      .catch((error) => {
        toast.error("Login Failed. Check your email and password.");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      fetch("https://bistro-boss-restaurant-server-theta.vercel.app/users", {
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
            toast.success("Login Success");
            navigate(from, { replace: true });
          }
        });
    });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn().then((result) => {
      const user = result.user;
      fetch("https://bistro-boss-restaurant-server-theta.vercel.app/users", {
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
            toast.success("Login Success");
            navigate(from, { replace: true });
          }
        });
    });
  };

  const handleGithubSignIn = () => {
    githubSignIn().then((result) => {
      const user = result.user;
      fetch("https://bistro-boss-restaurant-server-theta.vercel.app/users", {
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
            toast.success("Login Success");
            navigate(from, { replace: true });
          }
        });
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${loginBgImage})`,
        }}
        className="py-[80px] px-2 bg-fixed h-fit bg-cover bg-center bg-no-repeat"
      >
        <div
          className="hero max-w-screen-2xl mx-auto py-10"
          style={{ boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-[100px] px-4">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <form onSubmit={handleLogin}>
                <h3 className="font-bold text-4xl text-center">Login</h3>
                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Email</span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Type here"
                    className="input input-bordered focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      required
                      name="password"
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
                </div>
                <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate className="text-[#5D5FEF]" />
                  </label>
                  <input
                    name="captchaCode"
                    onChange={(e) => setValidationCode(e.target.value)}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered focus:outline-none"
                  />
                </div>
                <p className="text-red-500 text-sm">{validationError}</p>
                <div className="form-control mt-4">
                  <button
                    type="button"
                    disabled={validationCode.length !== 6}
                    onClick={() => handleValidateCaptcha()}
                    className="btn bg-gray-500 text-white"
                  >
                    Check Validation
                  </button>
                </div>
                <div className="form-control mt-6">
                  <input
                    disabled={disabled}
                    value="Sign In"
                    type="submit"
                    className="btn bg-[#D1A054]"
                  />
                </div>
              </form>
              <div>
                <p className="text-center text-xl pt-4">
                  New here?{" "}
                  <Link
                    to="/registration"
                    className="text-[#D1A054] hover:text-gray-500"
                  >
                    Create a New Account
                  </Link>
                </p>
              </div>
              <p className="text-center text-xl">Or sign in with</p>
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

export default Login;
