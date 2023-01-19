import React, { useState } from "react";
import AccountDetailComponent from "../../components/AccountDetailComponent";
import BillingDetailComponent from "../../components/BillingDetailComponent";
import BusinessDetailComponent from "../../components/BusinessDetailComponent";
import ProfileSidebarComponent from "../../components/SidebarComponent";
import MainLayout from "../../layouts/MainLayout";

const Profile = () => {
  const [selected, setSelected] = useState("billing");

  return (
    <MainLayout>
      <div className="flex" style={{ fontSize: "0.9rem" }}>
        <div className="w-1/6">
          <ProfileSidebarComponent selected={selected} onClick={setSelected} />
        </div>
        <div className="w-[80em] px-10 py-12">
          {selected === "account" && <AccountDetailComponent />}
          {selected === "business" && <BusinessDetailComponent />}
          {selected === "billing" && <BillingDetailComponent />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
