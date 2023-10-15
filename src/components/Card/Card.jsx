/* eslint-disable react/prop-types */
const Card = ({cardImage, name, description}) => {
  return (
    <div className="card max-w-96 bg-base-100 shadow-xl rounded-t-none">
      <figure className="w-full">
        <img
          className="w-full object-cover object-center h-[300px]"
          src={cardImage}
        />
      </figure>
      <div className="card-body items-center text-center bg-[#F3F3F3]">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <button className="px-4 py-3 rounded-md uppercase text-xl hidden text-[#BB8506] border-b-2 border-[#BB8506] bg-[#E8E8E8] hover:bg-[#1F2937] hover:border-[#1F2937] duration-500">
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
