import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";
import axios from "axios";

type formType = Pick<IProduct, "title" | "price" | "image" | "category">;

type Props = {
  product: IProduct;
  products: IProduct[];
  setProducts: (products: IProduct[]) => void; //hàm dùng để cập nhật danh sách sản phẩm.
  setFlag: (value: string | number) => void;
};

const UpdateProduct = ({ product, products, setProducts, setFlag }: Props) => {
  const { register, handleSubmit, reset } = useForm<formType>({
    defaultValues: {
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    },
  });

  const onSubmitUpdate = async (formData: formType) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        formData
      );
      const updatedProducts = products.map((prod) =>
        prod.id === product.id ? data : prod
      );
      setProducts(updatedProducts);
      setFlag(0);
      reset();
      alert("Update sp thành công");
    } catch (error) {
      console.log(error);
    }
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
