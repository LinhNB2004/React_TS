import React from "react";
import { IProduct } from "../interface/Product";
import ProductItem from "./ProductItem";

type Props = {
  products: IProduct[];
};

const Home = ({ products }: Props) => {
  return (
    <>
      {/* <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[36px] text-center">Danh sách sản phẩm</h1>
        <table className="mx-auto w-[800px] table-auto border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">STT</th>
              <th className="border border-slate-300">Ảnh</th>
              <th className="border border-slate-300">Tên sản phẩm</th>
              <th className="border border-slate-300">Giá tiền</th>
              <th className="border border-slate-300">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="border border-slate-300">{index + 1}</td>
                <td className="border border-slate-300">
                  <img width={90} src={product.image} />
                </td>
                <td className="border border-slate-300">{product.title}</td>
                <td className="border border-slate-300">{product.price}</td>
                <td className="border border-slate-300">
                  <button>Sửa</button>
                  <button>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[36px] text-center">Danh sách sản phẩm</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
