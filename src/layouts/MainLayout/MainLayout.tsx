import React from "react";
import Header from "../Header";

type Props = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7] contents">{children}</main>
    </>
  );
};

export default MainLayout;
