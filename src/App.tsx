import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Joi from "joi";

interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}
type formType = {
  title: string;
  image: string;
  price: number;
  category: string;
};

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const {
    register,
    handleSubmit, // là một hàm để xử lý sự kiện gửi form.
    reset,
  } = useForm<formType>({});
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      // console.log(data);
      setProducts(data);
    })();
  }, []);
  const onSubmit = async (formData: any) => {
    // console.log(data);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        formData
      );
      setProducts([...products, data]);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="content">
        <div className="div1">
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
        <div className="div2">
          <table className="table ">
            <thead>
              <tr>
                <th>STT</th>
                <th>Title</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: IProduct, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>
                    <img width={100} src={product.image} alt="image" />
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <button className="btn btn-warning">Sửa</button>
                    <button className="btn btn-danger"> Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      ;
    </>
  );
}

export default App;
