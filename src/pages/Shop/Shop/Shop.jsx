/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import Hero from "../../../Shared/Hero/Hero";
import heroImage from "../../../assets/shop/banner2.jpg";
import { useState } from "react";
import "./Shop.css";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Shop = () => {
  const itemsNames = ["salad", "pizza", "soup", "dessert", "drink"];

  const { category } = useParams();
  const categoryIndex = itemsNames.indexOf(category);

  const [tabIndex, setTabIndex] = useState(categoryIndex);

  const [menu, loading] = useMenu();

  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drink = menu.filter((item) => item.category === "drinks");

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  // Number of items to display per page
  const itemsPerPage = 9;

  // Calculate the total number of pages based on the filtered items
  const totalPages = Math.ceil(
    (tabIndex === 0
      ? salad.length
      : tabIndex === 1
      ? pizza.length
      : tabIndex === 2
      ? soup.length
      : tabIndex === 3
      ? dessert.length
      : drink.length) / itemsPerPage
  );

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calculate the start and end indexes for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Bistro Boss | Our Shop</title>
      </Helmet>
      <Hero
        coverImage={heroImage}
        title="OUR SHOP"
        subtitle="Would you like to try a dish?"
      />
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap mt-32 mb-14 gap-4 sm:gap-10 md:gap-14 justify-center">
          {itemsNames.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setTabIndex(index);
                setCurrentPage(0);
              }}
              className={`uppercase text-sm sm:text-2xl pb-2 border-b-2 ${
                index === tabIndex
                  ? "border-b-yellow-600 font-bold text-[#bb8506]"
                  : "border-b-transparent font-medium"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4">
          {(tabIndex === 0
            ? salad.slice(startIndex, endIndex)
            : tabIndex === 1
            ? pizza.slice(startIndex, endIndex)
            : tabIndex === 2
            ? soup.slice(startIndex, endIndex)
            : tabIndex === 3
            ? dessert.slice(startIndex, endIndex)
            : drink.slice(startIndex, endIndex)
          ).map((item) => (
            <FoodCard key={item._id} menu={item} />
          ))}
        </div>
        <div id="container" className="mt-24">
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={totalPages}
              onPageChange={handlePageChange}
              pageRangeDisplayed={totalPages}
              containerClassName="pagination"
              activeClassName="active"
              forcePage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
