import React, { useState } from "react";
import AccountDetailComponent from "../../components/AccountDetailComponent";
import BillingDetailComponent from "../../components/BillingDetailComponent";
import BusinessDetailComponent from "../../components/BusinessDetailComponent";
import ProfileSidebarComponent from "../../components/ProfileSidebarComponent";
import MainLayout from "../../layouts/MainLayout";

const Profile = () => {
  const [selected, setSelected] = useState("account");

  return (
    <MainLayout>
      <div className="flex">
        <div className="w-1/6">
          <ProfileSidebarComponent selected={selected} onClick={setSelected} />
        </div>
        <div className="w-5/6 px-10 py-12">
          {selected === "account" && <AccountDetailComponent />}
          {selected === "business" && <BusinessDetailComponent />}
          {selected === "billing" && <BillingDetailComponent />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
