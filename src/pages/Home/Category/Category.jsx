import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Category.css";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Category = () => {
  return (
    <div className="mt-14 px-4">
      <SectionTitle subtitle="From 11:00am to 10:00pm" title="ORDER ONLINE" black={true}></SectionTitle>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          340: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mt-12"
      >
        <SwiperSlide className="mr-0">
          <img className="w-full" src={slide1} />
          <h1 className="capitalize font-body text-3xl text-white text-center relative bottom-16">
            Salads
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide2} />
          <h1 className="capitalize font-body text-3xl text-white text-center relative bottom-16">
            Soups
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide3} />
          <h1 className="capitalize font-body text-3xl text-white text-center relative bottom-16">
            pizzas
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide4} />
          <h1 className="capitalize font-body text-3xl text-white text-center relative bottom-16">
            desserts
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide5} />
          <h1 className="capitalize font-body text-base sm:text-3xl text-white text-center relative bottom-6 sm:bottom-12 lg:bottom-16">
            Pasta
          </h1>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
