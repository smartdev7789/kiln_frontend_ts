import React, { useState } from "react";
import DocSidebarComponent from "../../components/SidebarComponent/DocSidebarComponent";
import MainLayout from "../../layouts/MainLayout";

const Documentation = () => {
  const [selected, setSelected] = useState("account");
  const orders = [
    { name: "ya", title: "Your account" },
    { name: "hkw", title: "How KILN works" },
    { name: "suyg", title: "Setting up your game" },
    { name: "cs", title: "Connecting services" },
    { name: "wsic", title: "What should I change?" },
  ];

  return (
    <MainLayout>
      <div className="flex">
        <div className="w-1/6">
          <DocSidebarComponent
            orders={orders}
            selected={selected}
            onClick={setSelected}
          />
        </div>
        <div className="w-5/6 px-10 py-12 h-screen"></div>
      </div>
    </MainLayout>
  );
};

export default Documentation;
