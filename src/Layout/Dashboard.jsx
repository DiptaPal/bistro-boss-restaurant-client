import { Outlet } from "react-router-dom";
import SideDrawer from "../pages/Dashboard/SideDrawer/SideDrawer";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <SideDrawer></SideDrawer>
      </div>
      <div className="w-full" style={{ overflowY: 'scroll', height: '100vh' }}>
          <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
