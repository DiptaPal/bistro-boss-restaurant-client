import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating, StickerStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://bistro-boss-restaurant-server-eight.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  });

  const myStyles = {
    itemShapes: StickerStar,
    activeFillColor: "#cd9003",
    inactiveFillColor: "#a1a1a1",
  };

  return (
    <div className="mb-32">
      <SectionTitle
        subtitle="What Our Clients Say"
        title="Testimonials"
        black={true}
      />
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col items-center mt-2">
                <Rating
                  style={{ maxWidth: 180, border: "none" }}
                  value={review.rating}
                  readOnly
                  itemStyles={myStyles}
                />
                <FaQuoteLeft className="text-3xl sm:text-6xl mt-4"></FaQuoteLeft>
                <div className="text-center px-10 sm:px-16">
                  <p className="text-lg">{review.details}</p>
                  <h1 className="text-3xl text-[#CD9003] uppercase">
                    {review.userName}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
