import React, { createContext } from "react";
import Header from "./Client/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Client/Footer";

type Props = {};
const Client = (props: Props) => {
  return (
    <div>
      <Header />
      <div className="max-w-[1200px] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Client;
