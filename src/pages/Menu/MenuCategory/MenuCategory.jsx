/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Cover from "../../../components/Cover/Cover";
import MenuItem from "../../../components/MenuItem/MenuItem";

const MenuCategory = ({ items, title, description, btn, bgImage }) => {
  return (
    <div>
      {title && <Cover bgImage={bgImage} title={title} description={description}></Cover>}
      <div className="grid md:grid-cols-2 gap-10 md:gap-8 my-12">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Link to={`/shop/${title}`} className="uppercase text-base sm:text-xl px-7 py-4 border-b-2 border-black rounded-b-md hover:bg-black hover:text-white hover:rounded-md duration-700">{btn}</Link>
      </div>
    </div>
  );
};

export default MenuCategory;
