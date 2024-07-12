import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";

type Props = {
  title: string;
  onAdd: (data: formType) => void;
};
type formType = Pick<IProduct, "title" | "price" | "image" | "category">; // Pick(Từ Đâu, lấy thành phần cần lấy)

const AddProduct = ({ title, onAdd }: Props) => {
  const { register, handleSubmit, reset } = useForm<formType>();
  const onSubmit = async (formData: any) => {
    onAdd(formData);
    reset();
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
