/* eslint-disable react/prop-types */
import { Parallax } from "react-parallax";

const Hero = ({ coverImage, title, subtitle }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={coverImage}
      strength={-200}
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="p-8 sm:px-32 md:px-44 xl:px-64 mx-auto pt-32 pb-16 lg:py-[175px] text-center">
          <div
            style={{ background: "rgba(21, 21, 21, 0.60)" }}
            className="font-body font-bold text-white uppercase py-10 sm:py-20 md:py-24 lg:py-28"
          >
            <h1 className="text-[32px] md:text-[45px] lg:text-[88px]">
              {title}
            </h1>
            <p className="text-xs lg:text-2xl">{subtitle}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Hero;
