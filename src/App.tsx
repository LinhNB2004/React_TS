import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IProduct } from "./interface/Product";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import { useForm } from "react-hook-form";
import CustomElement from "./Components/Button";

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
  return (
    <div className="content">
      {/* <button onClick={() => setClick(!click)}>Giỏ hàng</button> */}
      {/* <Sidebar isActive={click}/> */}
      {/* <h2>
        Đây là button{" "}
        <CustomElement el="button" title="Xem thêm" type="submit" />
      </h2>
      <h2>
        Đây là thẻ a{" "}
        <CustomElement
          el="anchor"
          title="Xem thêm"
          href="https://google.com"
          target="_blank"
        />
      </h2> */}
      <AddProduct title="Thêm sản phẩm mới" onAdd={onAdd} />
      <div className="div2">
        <table className="table">
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
            {products.map((product, index) =>
              product.id === flag ? (
                <UpdateProduct
                  product={product}
                  onUpdate={onSubmitUpdate}
                  setFlag={setFlag}
                />
              ) : (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>
                    <img width={100} src={product.image} alt={product.title} />
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
  );
}

export default App;
