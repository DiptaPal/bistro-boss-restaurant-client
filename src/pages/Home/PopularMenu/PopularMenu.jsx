import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../../components/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {

  const [menu, loading] = useMenu();
  const popularMenu = menu.filter((item) => item.category === "popular");

  return (
    <div className="px-4">
      <SectionTitle
        subtitle="Check it out"
        title="FROM OUR MENU"
        black={true}
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-10 md:gap-8 my-12">
        {/* {loading && <p>Loading...</p>} */}
        {popularMenu.map((item) => (
          <MenuItem key={item._id} item={item} loading={loading}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button className="uppercase text-xl px-7 py-4 border-b-2 border-black rounded-b-md hover:bg-black hover:text-white hover:rounded-md duration-700">
          View Full Menu
        </button>
      </div>
    </div>
  );
};

export default PopularMenu;
