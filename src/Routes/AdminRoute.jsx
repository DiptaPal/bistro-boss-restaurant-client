import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";
import useAdmin from "../hooks/useAdmin";

/* eslint-disable react/prop-types */
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const {isAdmin, isAdminLoading} = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto flex justify-center items-center pt-36">
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
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{from: location}} replace />;
};

export default AdminRoute;
