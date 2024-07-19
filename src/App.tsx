import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Dashboard from "./layout/Dashboard";
import Detail from "./Components/Detail";
import Home from "./Components/Home";
import Products from "./Components/Products";
import { IProduct } from "./interface/Product";
import client from "./layout/client";
import countcontext from "./contexts/countcontext";
import Privaterouter from "./privaterouter";
import Countcontext from "./contexts/countcontext";
import Client from "./layout/client";

type formType = Pick<IProduct, "title" | "price" | "image" | "category">; // Pick(Từ Đâu, lấy thành phần cần lấy)

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { register, handleSubmit, reset } = useForm<formType>();
  const [flag, setFlag] = useState<string | number>(0);

  const [click, setClick] = useState<boolean>(false);

  // HIỂN THỊ DỮ LIỆU
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    })();
  }, []);

  //DELETE
  const onDelete = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete")) {
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert("Xóa thành công");
        setProducts(products.filter((product: IProduct) => product.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //ADD
  const onAdd = async (dataproduct: formType) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        dataproduct
      );
      setProducts([...products, data]);
      alert("Thêm mới thành công");
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE

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
      alert("Cập nhật thành công");
      // reset()
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
  const routes = useRoutes([
    {
      path: "",
      element: (
        <Countcontext>
          <Client />
        </Countcontext>
      ),
      children: [
        { path: "home", element: <Home products={products} /> },
        { path: "detail", Component: Detail },
      ],
    },
    {
      path: "dashboard",
      element: (
        <Privaterouter userID={2}>
          <Dashboard />
        </Privaterouter>
      ),
      children: [{ path: "product", Component: Products }],
    },
  ]);
  return routes;
  // return (
  //   <>
  //     <Routes>
  //       <Route path="/" Component={home} />
  //       <Route path="edit" Component={EditProduct} />
  //       <Route path="detail" Component={Detail} />
  //       <Route path="dashboard" Component={Dashboard}>
  //         <Route path="product" Component={ProductList} />
  //       </Route>
  //     </Routes>
  //   </>
  // );
}

export default App;
