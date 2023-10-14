import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {  Navigate, useLocation } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";

/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto flex justify-center items-center pt-36">
        <div className="flex flex-col items-center gap-7">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
          {/* <p className="text-red-600 font-bold text-2xl">Please Login First</p>
          <Link
            to="/login"
            className="btn hover:bg-gray-500 text-white"
            style={{
              background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
            }}
          >
            Login
          </Link> */}
        </div>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
