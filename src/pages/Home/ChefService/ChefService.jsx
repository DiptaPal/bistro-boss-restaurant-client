import bgImage from "../../../assets/home/chef-service.jpg";

const ChefService = () => {
  return (
    <div
      className="text-center my-20"
      style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      <div className="p-8 sm:p-[40px] md:p-[60px] lg:p-[120px]">
        <div className="bg-white px-4 py-4 sm:px-10 sm:py-10 md:py-16 md:px-16 lg:py-24 lg:px-40">
          <h1 className="capitalize font-body text-base sm:text-[24px] md:text-[45px]">Bistro Boss</h1>
          <p className="text-xs sm:text-base mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, libero accusamus laborum deserunt ratione dolor
            officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
            nihil iusto ducimus incidunt quibusdam nemo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefService;
