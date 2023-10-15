import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Error from "../pages/Error/Error";
import Menu from "../pages/Menu/Menu/Menu";
import Shop from "../pages/Shop/Shop/Shop";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import Payment from "../pages/Dashboard/Payment/Payment";
import Reservation from "../pages/Dashboard/Reservation/Reservation";
import MyBooking from "../pages/Dashboard/MyBooking/MyBooking";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import ManageItem from "../pages/Dashboard/ManageItem/ManageItem";
import ManageBooking from "../pages/Dashboard/ManageBooking/ManageBooking";
import AdminRoute from "./AdminRoute";
import Contact from "../pages/Contact/Contact";
import EditItem from "../pages/Dashboard/EditItem/EditItem";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ReservationPayment from "../pages/Dashboard/ReservationPayment/ReservationPayment";
import OrderHistory from "../pages/Dashboard/OrderHistory/OrderHistory";
import ManageOrder from "../pages/Dashboard/ManageOrder/ManageOrder";
import AdminDashboard from "../pages/Dashboard/DashboardHome/AdminDashboard";
import UserDashboard from "../pages/Dashboard/DashboardHome/UserDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/shop/:category",
        element: <Shop></Shop>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "additem",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "edititem/:id",
        element: (
          <AdminRoute>
            <EditItem></EditItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://bistro-boss-restaurant.onrender.com/menu/${params.id}`,
            {
              headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          ),
      },
      {
        path: "manageitem",
        element: (
          <AdminRoute>
            <ManageItem></ManageItem>
          </AdminRoute>
        ),
      },
      {
        path: "manageorder",
        element: (
          <AdminRoute>
            <ManageOrder></ManageOrder>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "managebooking",
        element: (
          <AdminRoute>
            <ManageBooking></ManageBooking>
          </AdminRoute>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "userhome",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "reservation",
        element: <Reservation></Reservation>,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "mycart",
        element: <MyCart></MyCart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "reservation-payment/:id",
        element: <ReservationPayment></ReservationPayment>,
        loader: ({ params }) =>
          fetch(
            `https://bistro-boss-restaurant.onrender.com/reservationpayment/${params.id}`,
            {
              headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          ),
      },
      {
        path: "addreview",
        element: <AddReview></AddReview>,
      },
      {
        path: "mybooking",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "order-history",
        element: <OrderHistory></OrderHistory>,
      },
    ],
  },
]);
