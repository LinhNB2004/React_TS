import React, { createContext } from "react";

type Props = {
  children: React.ReactNode;
};
export const countCT = createContext<number>(0);

const Countcontext = ({ children }: Props) => {
  return (
    <div>
      <countCT.Provider value={10}>{children}</countCT.Provider>
    </div>
  );
};

export default Countcontext;
