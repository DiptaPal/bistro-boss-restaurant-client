import useAdmin from "../../../hooks/useAdmin";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { isAdmin } = useAdmin();

  return <div>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</div>;
};

export default DashboardHome;
