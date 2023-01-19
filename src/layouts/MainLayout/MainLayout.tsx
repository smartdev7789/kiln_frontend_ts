import React from "react";
import Header from "../Header";

type Props = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="overflow-y-scroll max-h-screen min-h-screen bg-[#f7f7f7]">
      <Header />
      <main className="contents">
        <div className="min-h-full">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
