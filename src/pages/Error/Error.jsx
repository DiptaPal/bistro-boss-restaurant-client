import { Link } from "react-router-dom";
import img from "../../assets/404.gif";
import { FaHome } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={img} />
      <Link
        to="/"
        className="bg-[#1F2937] py-3 px-7 rounded-md text-white text-xl flex items-center gap-2 mt-5"
      >
        <span>Home</span>
        <FaHome></FaHome>
      </Link>
    </div>
  );
};

export default Error;
