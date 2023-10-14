import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefService from "../ChefService/ChefService";
import Contact from "../Contact/Contact";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommend from "../Recommend/Recommend";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <Category />
        <ChefService />
        <PopularMenu />
        <Contact />
        <Recommend />
        <Featured />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
