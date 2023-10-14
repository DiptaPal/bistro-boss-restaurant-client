/* eslint-disable react/prop-types */

const Cover = ({ title, description, bgImage }) => {
  return (
    <div
      className="text-center my-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-8 sm:p-[40px] md:p-[60px] lg:p-[120px]">
        <div style={{background: "rgba(21, 21, 21, 0.60)"}} className="text-white px-4 py-4 sm:px-10 sm:py-10 md:py-16 md:px-16 lg:py-24 lg:px-40">
          <h1 className="uppercase font-body text-base sm:text-[24px] md:text-[45px]">
            {title}
          </h1>
          <p className="text-xs sm:text-base mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
