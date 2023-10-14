/* eslint-disable react/prop-types */
const SectionTitle = ({ subtitle, title, black }) => {
  return (
    <div className="text-center">
      <h4 className="text-xl text-[#ecb533] italic">---{subtitle}---</h4>
      <div className="max-w-[424px] h-1 bg-[#E8E8E8] mx-auto my-4" />
      <h1 className={`uppercase text-4xl ${black ? "text-black" : "text-white"}`}>{title}</h1>
      <div className="max-w-[424px] h-1 bg-[#E8E8E8] mx-auto my-4" />
    </div>
  );
};

export default SectionTitle;
