/* eslint-disable no-unused-vars */
import { TiShoppingCart } from "react-icons/ti";
import { LuUserCircle } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut, loading, setLoading } = useContext(AuthContext);
  const { isAdmin } = useAdmin();

  const { cart } = useCart();

  const handleLogout = () => {
    logOut().then((result) => {
      toast.success("Logout Success");
    });
  };
  const navOptions = (
    <>
      <li className="text-2xl md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "hover:text-[#EEFF25]"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="text-2xl md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl">
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "hover:text-[#EEFF25]"
          }
        >
          Our Menu
        </NavLink>
      </li>
      <li className="text-2xl md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl">
        <NavLink
          to="/shop/salad"
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "hover:text-[#EEFF25]"
          }
        >
          Our Shop
        </NavLink>
      </li>
      {user && (
        <li className="text-2xl md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl">
          <NavLink
            to="/dashboard/dashboardhome"
            className={({ isActive }) =>
              isActive ? "text-[#EEFF25]" : "hover:text-[#EEFF25]"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li className="text-2xl md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl">
          <Link to="/dashboard/mycart">
            <div className="indicator">
              <span className="indicator-item indicator-bottom badge bg-red-500">
                {cart?.length}
              </span>
              <div className="grid bg-green-700 rounded-full p-2 place-items-center hover:text-[#EEFF25]">
                <TiShoppingCart></TiShoppingCart>
              </div>
            </div>
          </Link>
        </li>
      )}
      <li className="text-2xl md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "hover:text-[#EEFF25]"
          }
        >
          Contact us
        </NavLink>
      </li>
      <li className="text-2xl md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl">
        <div className="hover:text-[#EEFF25]">
          {user ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <span>
                <LuUserCircle></LuUserCircle>
              </span>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <span>
                <LuUserCircle></LuUserCircle>
              </span>
            </>
          )}
        </div>
      </li>
    </>
  );

  return (
    <>
      <div
        className="navbar justify-between  max-w-screen-2xl text-white py-1 sm:py-3 px-4 xl:px-14 fixed z-10"
        style={{ background: "rgba(21, 21, 21, 0.5)" }}
      >
        <div className="flex flex-row items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-64 text-xl capitalize font-extrabold ml-3"
              style={{ background: "rgba(21, 21, 21, 1)" }}
            >
              {navOptions}
            </ul>
          </div>
          <Link to='/' className="text-left">
            <span className="block font-body text-[24px] md:text-base lg:text-[27px] xl:text-[32px] font-[900]">
              BISTRO BOSS
            </span>
            <span className="block font-body text-[27px] md:text-lg xl:text-2xl font-bold tracking-wide lg:tracking-[9.12px]">
              Restaurant
            </span>
          </Link>
        </div>
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1 text-xl capitalize font-extrabold">
            {navOptions}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
