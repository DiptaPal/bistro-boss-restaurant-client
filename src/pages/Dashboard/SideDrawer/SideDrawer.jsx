/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaListUl,
  FaBook,
  FaUsers,
  FaSignOutAlt,
  FaHistory,
} from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { MdBorderColor, MdDoubleArrow, MdEmail, MdRateReview } from "react-icons/md";
import logo from "../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidCalendarEdit, BiSolidShoppingBag } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import { ImSpoonKnife } from "react-icons/im";
import useAdmin from "../../../hooks/useAdmin";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { isAdmin } = useAdmin();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logOut().then((result) => {
      navigate("/");
      toast.success("Logout Success");
    });
  };

  return (
    <div
      className={`transition-all ease-in-out duration-500 min-h-screen h-full ${
        isOpen ? "w-[260px]" : "w-16"
      }`}
    >
      <div className="bg-[#D1A054] h-full text-black flex flex-col">
        <button onClick={toggleDrawer} className="p-6">
          {isOpen ? (
            <MdDoubleArrow className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
        <div>
          <div className="flex flex-1 h-10 mb-20">
            {isOpen ? (
              <div className="font-body font-bold whitespace-nowrap p-6">
                <h1 className="text-xl">BISTRO BOSS</h1>
                <h3 className="text-lg">RESTAURANT</h3>
              </div>
            ) : (
              <div>
                <img className="w-16  p-2" src={logo} alt="" />
              </div>
            )}
          </div>
          <div className="flex p-6 font-body">
            <div>
              <div className="flex flex-col gap-6">
                {isAdmin ? (
                  <>
                    <NavLink
                      to="/dashboard/dashboardhome"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaHome className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        Admin Home
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/additem"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <ImSpoonKnife className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        add items
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/manageitem"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaListUl className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        manage items
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/manageorder"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <MdBorderColor className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        manage order
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/managebooking"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaBook className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        manage bookings
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/allusers"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaUsers className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        all users
                      </span>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/dashboard/dashboardhome"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaHome className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        User Home
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/reservation"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaCalendarAlt className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        Reservation
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/mycart"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaShoppingCart className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        My Cart
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/addreview"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <MdRateReview className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        Add Review
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/mybooking"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <BiSolidCalendarEdit className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        My Booking
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/order-history"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <FaHistory className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        Order History
                      </span>
                    </NavLink>
                    <NavLink
                      to="/dashboard/paymenthistory"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center space-x-2 mb-4 text-white"
                          : "flex items-center space-x-2 mb-4"
                      }
                    >
                      <GiWallet className="text-xl" />
                      <span
                        className={`whitespace-nowrap ${
                          isOpen ? "block" : "hidden"
                        } text-lg leading-none`}
                      >
                        Payment History
                      </span>
                    </NavLink>
                  </>
                )}

                <hr />
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center space-x-2 mb-4 text-white"
                      : "flex items-center space-x-2 mb-4"
                  }
                >
                  <FaHome className="text-xl" />
                  <span
                    className={`whitespace-nowrap ${
                      isOpen ? "block" : "hidden"
                    } text-lg leading-none`}
                  >
                    Home
                  </span>
                </NavLink>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center space-x-2 mb-4 text-white"
                      : "flex items-center space-x-2 mb-4"
                  }
                >
                  <HiMenu className="text-xl" />
                  <span
                    className={`whitespace-nowrap ${
                      isOpen ? "block" : "hidden"
                    } text-lg leading-none`}
                  >
                    Menu
                  </span>
                </NavLink>
                <NavLink
                  to="/shop/salad"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center space-x-2 mb-4 text-white"
                      : "flex items-center space-x-2 mb-4"
                  }
                >
                  <BiSolidShoppingBag className="text-xl" />
                  <span
                    className={`whitespace-nowrap ${
                      isOpen ? "block" : "hidden"
                    } text-lg leading-none`}
                  >
                    Shop
                  </span>
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center space-x-2 mb-4 text-white"
                      : "flex items-center space-x-2 mb-4"
                  }
                >
                  <MdEmail className="text-xl" />
                  <span
                    className={`whitespace-nowrap ${
                      isOpen ? "block" : "hidden"
                    } text-lg leading-none`}
                  >
                    Contact
                  </span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 mb-4"
                >
                  <FaSignOutAlt className="text-xl" />
                  <span
                    className={`whitespace-nowrap ${
                      isOpen ? "block" : "hidden"
                    } text-lg leading-none`}
                  >
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
