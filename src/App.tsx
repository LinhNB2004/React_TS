import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IProduct } from "./interface/Product";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [flag, setFlag] = useState<string | number>(0);

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

  // UPDATE
  const onEdit = (id: number | string) => {
    setFlag(id);
  };

  return (
    <div className="content">
      <AddProduct
        title="Thêm sản phẩm mới"
        products={products}
        setProducts={setProducts}
      />
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
                  key={product.id}
                  product={product}
                  products={products}
                  setProducts={setProducts}
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
