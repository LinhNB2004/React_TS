import React, { useContext } from "react";
import { countCT } from "../../contexts/countcontext";

type Props = {};

const Footer = (props: Props) => {
  const count = useContext(countCT);
  return <div>Footer {count}</div>;
};

export default Footer;
