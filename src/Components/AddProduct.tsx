import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";

type Props = {
  title: string;
  products: IProduct[];
  setProducts: (data: IProduct[]) => void;
};
type formType = Pick<IProduct, "title" | "price" | "image" | "category">;

const AddProduct = ({ title, products, setProducts }: Props) => {
  const {
    register,
    handleSubmit, // là một hàm để xử lý sự kiện gửi form.
    reset,
  } = useForm<formType>({});

  //ADD
  const onSubmit = async (formData: any) => {
    // console.log(data);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        formData
      );
      setProducts([...products, data]);
      alert("Thêm sp thành công");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="div1">
      {title}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group  ">
          <input
            className="form-control input"
            type="text"
            {...register("title")}
            placeholder="Title"
          />
          <input
            className="form-control input"
            type="text"
            {...register("price")}
            placeholder="price"
          />
          <input
            className="form-control input"
            type="text"
            {...register("image")}
            placeholder="image"
          />
          <input
            className="form-control input"
            type="text"
            {...register("category")}
            placeholder="category"
          />
          <button type="submit">Thêm Sản Phẩm</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
