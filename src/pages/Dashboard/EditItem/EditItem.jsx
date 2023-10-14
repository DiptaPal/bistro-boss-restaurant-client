import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const EditItem = () => {
  const item = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const [axiosSecure] = useAxiosSecure();

  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleImageDelete = () => {
    URL.revokeObjectURL(image);
    const fileInput = document.querySelector("input[type=file]");
    fileInput.value = "";
    setImage(null);
  };

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const imageFormData = new FormData();
        imageFormData.append("image", data.image[0]);
        fetch(img_hosting_url, {
          method: "POST",
          body: imageFormData,
        })
          .then((res) => res.json())
          .then((imgResponse) => {
            if (imgResponse.success) {
              const imageURL = imgResponse.data.display_url;
              const { name, price, category, recipe } = data;
              const newItem = {
                name,
                recipe,
                image: imageURL,
                category,
                price: parseFloat(price),
              };

              axiosSecure.patch(`/menu/${item._id}`, newItem).then((res) => {
                if (res.data.modifiedCount > 0) {
                  toast.success("Item Updated Successfully");
                } else {
                  toast.error("Something went wrong");
                }
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Edit Item</title>
      </Helmet>
      <div>
        <h1 className="text-4xl text-center my-16">UPDATE ITEM</h1>
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
            defaultValue={item.name}
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
                defaultValue={item.category}
              >
                <option value="">Select Category</option>
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
              defaultValue={item.price}
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
            defaultValue={item.recipe}
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
            onChange={handleImageUpload}
          />
          {errors.image && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div>
          {image && (
            <div className="relative inline-block">
              <img
                src={image}
                alt="Uploaded"
                className="rounded-md w-44 h-auto inline"
              />
              <button
                onClick={handleImageDelete}
                className="absolute -top-2 -right-3 bg-transparent border-none text-red-500 text-2xl"
              >
                <MdDelete></MdDelete>
              </button>
            </div>
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

export default EditItem;
