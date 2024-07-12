import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";

type formType = Pick<IProduct, "title" | "price" | "image" | "category">;

type Props = {
  product: IProduct;
  onUpdate: (data: formType) => void;
  setFlag: (id: string | number) => void;
};
const UpdateProduct = ({ product, onUpdate, setFlag }: Props) => {
  const { register, handleSubmit, reset } = useForm<formType>({
    defaultValues: {
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
    },
  });
  const onSubmitUpdate = (product: formType) => {
    onUpdate(product);
  };

  return (
    <tr>
      <td colSpan={6}>
        <div className="bg">
          <form onSubmit={handleSubmit(onSubmitUpdate)} className="form">
            <div className="form-group">
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
                placeholder="Price"
              />
              <input
                className="form-control input"
                type="text"
                {...register("image")}
                placeholder="Image"
              />
              <input
                className="form-control input"
                type="text"
                {...register("category")}
                placeholder="Category"
              />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setFlag(0)}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </td>
    </tr>
  );
};

export default UpdateProduct;
