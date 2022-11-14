import React from "react";
import Header from "../Header";

type Props = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="contents">
        <div className="bg-[#f7f7f7]">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
