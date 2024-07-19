import React from "react";

type Props = {
  children: React.ReactNode;
  userID: number;
};

const Privaterouter = ({ children, userID }: Props) => {
  return userID === 1 ? children : <>Bạn không có quyền truy cập</>;
};

export default Privaterouter;
