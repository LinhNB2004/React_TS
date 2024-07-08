import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { IProduct } from "./interface/Product";
import AddProduct from "./Components/AddProduct";

type formType = Pick<IProduct, "title" | "price" | "image" | "category">;

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const {
    register,
    handleSubmit, // là một hàm để xử lý sự kiện gửi form.
    reset,
  } = useForm<formType>({});
  const [flag, setFlag] = useState<string | number>(0);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      // console.log(data);
      setProducts(data);
    })();
  }, []);

  //ADD
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

  //DELETE
  const onDelete = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete")) {
        const { data } = await axios.delete(
          `http://localhost:3000/products/${id}`
        );
        alert("Xóa thành công");
        setProducts(products.filter((product: IProduct) => product.id !== id));
      }
    } catch (error) {}
  };

  //UPDATE
  const onSubmitUpdate = async (formData: any) => {
    // console.log(data);
    try {
      const { data } = await axios.put(
        "http://localhost:3000/products/" + flag,
        formData
      );
      //  console.log(data);
      console.log(flag);
      const newproduct = products.map((product: IProduct) => {
        if (product.id == flag) {
          product = data;
        }
        return product;
      });
      setProducts(newproduct);
      setFlag(0);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = (id: number | string) => {
    setFlag(id);
    const product = products.filter((p: IProduct) => p.id === id);
    reset({
      title: product[0].title,
      image: product[0].image,
      price: product[0].price,
      category: product[0].category,
    });
  };
  return (
    <>
      <div className="content">
        <AddProduct />
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
              {products.map((product: IProduct, index) =>
                product.id == flag ? (
                  <tr>
                    <td colSpan={5}>
                      <form
                        onSubmit={handleSubmit(onSubmitUpdate)}
                        className="form "
                      >
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
                          <button type="submit">Update</button>
                          <button type="button" onClick={() => setFlag(0)}>
                            Hủy
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                ) : (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                      <img width={100} src={product.image} alt="image" />
                    </td>
                    <td>{product.category}</td>

                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => onEdit(product.id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete(product.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      ;
    </>
  );
}

export default App;
