import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";

const Featured = () => {
  const currentDate = new Date();
  const currentMonth = new Date().toLocaleString([], {
    month: "long",
  });
  return (
    <div className="my-32 py-32" style={{background: `linear-gradient(0deg, rgba(21, 21, 21, 0.70) 0%, rgba(21, 21, 21, 0.70) 100%), url(${featuredImg}) lightgray 50% / cover no-repeat`, backgroundAttachment: "fixed"}}>
      <SectionTitle
        subtitle="Check it out"
        title="FROM OUR MENU"
        black={false}
      ></SectionTitle>
      <div className="max-w-md md:max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-16 mt-12 px-4">
        <div className="w-full md:w-1/2">
          <img className="rounded-md md:rounded-none" src={featuredImg} alt="" />
        </div>
        <div className="text-white flex flex-col items-center text-center md:items-start md:text-left w-full md:w-1/2">
          <h2 className="text-[22px] md:text-base lg:text-[22px]">
            {currentMonth} {currentDate.getDate()}, {currentDate.getFullYear()}
          </h2>
          <h1 className="uppercase text-2xl md:text-base lg:text-2xl">WHERE CAN I GET SOME?</h1>
          <p className="pt-2 pb-4 md:pb-2 lg:pb-4 text-base md:text-xs lg:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="uppercase text-xl text-white px-7 py-3 border-b-2 border-white rounded-b-md hover:bg-black hover:text-white hover:rounded-md duration-700">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
