/* eslint-disable react/prop-types */
const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-0 lg:space-x-6 shadow-md lg:shadow-none rounded-md lg:rounded-none p-4 lg:p-0">
      <img className="w-[120px] rounded-e-full rounded-bl-full" src={image} />
      <div>
        <div className="uppercase font-body text-xl">
            {name} <span>------------------</span>
        </div>
        <p className="text-base">{recipe}</p>
      </div>
      <p className="text-xl text-[#BB8506] leading-6">${price}</p>
    </div>
  );
};

export default MenuItem;
