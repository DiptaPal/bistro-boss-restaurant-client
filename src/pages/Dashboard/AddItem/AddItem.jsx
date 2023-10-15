import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const img_hosting_token=import.meta.env.VITE_Image_Upload_token;
  const img_hosting_url=`https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const [axiosSecure] = useAxiosSecure(); 

  const onSubmit = (data) => {
    const imageFormData = new FormData();
    imageFormData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: imageFormData,
    })
    .then((res) => res.json())
    .then(imgResponse => {
      if(imgResponse.success){
        const imageURL=imgResponse.data.display_url;
        const {name, price, category, recipe} = data;
        const newItem = {name, recipe, image: imageURL, category, price: parseFloat(price)};
        
        axiosSecure.post("/menu", newItem)
        .then( res => {
          if(res.data.insertedId){
            toast.success("Item added successfully");
            reset();
          }
        })
      }
    })
    
  };
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Add Item</title>
      </Helmet>
      <div className="my-10">
        <SectionTitle
          title="ADD AN ITEM"
          subtitle="What's new?"
          black={true}
        ></SectionTitle>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-2 sm:mx-6 md:mx-12 lg:mx-32 bg-[#F3F3F3] p-4 md:p-12"
      >
        <div className="form-control mb-3">
          <label className="label">
            <span className="text-xl font-semibold">Recipe name*</span>
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Recipe name"
            className="input input-bordered focus:outline-none"
          />
          {errors.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between md:gap-6 items-center md:mb-3">
          <div className="form-control w-full mb-3 md:mb-0">
            <label className="label">
              <span className="text-xl font-semibold">Category*</span>
            </label>
            <div className="flex justify-between items-center gap-2">
              <select
                {...register("category", { required: true })}
                className="input input-bordered focus:outline-none flex-1"
                defaultValue="Select Category"
              >
                <option value="">
                  Select Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drink">Drink</option>
              </select>
            </div>

            {errors.category && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control w-full mb-3 md:mb-0">
            <label className="label">
              <span className="text-xl font-semibold">Price*</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="text"
              placeholder="Price"
              className="input input-bordered focus:outline-none"
            />
            {errors.price && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>
        <div className="form-control mb-6">
          <label className="label">
            <span className="text-xl font-semibold">Recipe Details*</span>
          </label>
          <textarea
            {...register("recipe", { required: true })}
            type="text"
            placeholder="Recipe Details"
            className="input input-bordered focus:outline-none w-full resize-none py-10 text-base md:text-xl h-48"
          />
          {errors.recipe && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="form-control mb-3">
          <input
            type="file"
            {...register("image", { required: true })}
            className="text-xl text-slate-600 file:mr-4 file:p-4 file:border-0 file:text-xl file:font-semibold file:bg-[#e8e8e8] file:text-[#444]"
          />
          {errors.image && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex items-start mt-6">
          <button
            type="submit"
            className="btn px-7 hover:bg-gray-500 text-white"
            style={{
              background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)",
            }}
          >
            Add Item
            <ImSpoonKnife className="text-2xl text-white"></ImSpoonKnife>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
