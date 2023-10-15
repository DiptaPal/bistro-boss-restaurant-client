import { Helmet } from "react-helmet-async";
import Hero from "../../../Shared/Hero/Hero";
import heroImage from "../../../assets/menu/banner3.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessertImage from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImage from "../../../assets/menu/pizza-bg.jpg";
import saladImage from "../../../assets/menu/salad-bg.jpg";
import soupImage from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Bistro Boss | Our Menu</title>
      </Helmet>
      <Hero
        coverImage={heroImage}
        title="OUR MENU"
        subtitle="Would you like to try a dish?"
      />
      <div className="max-w-screen-xl mx-auto">
        <div className="mt-32">
          <SectionTitle
            title="TODAY'S OFFER"
            subtitle="Don't miss"
            black={true}
          />
          <MenuCategory items={offered} btn="ORDER YOUR FAVORITE FOOD" />
        </div>
        <MenuCategory
          bgImage={dessertImage}
          items={dessert}
          title="dessert"
          description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btn="ORDER YOUR FAVORITE DESSERT"
        />

        <MenuCategory
          bgImage={pizzaImage}
          items={pizza}
          title="pizza"
          description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btn="ORDER YOUR FAVORITE PIZZA"
        />

        <MenuCategory
          bgImage={saladImage}
          items={salad}
          title="salad"
          description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btn="ORDER YOUR FAVORITE SALAD"
        />

        <MenuCategory
          bgImage={soupImage}
          items={soup}
          title="soup"
          description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          btn="ORDER YOUR FAVORITE SOUP"
        />
      </div>
    </div>
  );
};

export default Menu;
