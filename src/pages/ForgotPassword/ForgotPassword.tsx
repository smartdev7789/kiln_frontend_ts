import React, { useState } from "react";
import ForgotPasswordComponent from "../../components/LoginComponent/ForgotPasswordComponent";
import ForgotPasswordLogoComponent from "../../components/LoginComponent/ForgotPasswordLogoComponent";

const ForgotPassword = () => {
  return (
    <div className="container">
      <div className="flex w-screen h-screen bg-[#7700DF]">
        <ForgotPasswordLogoComponent />
        <div className="w-1/2">
          <ForgotPasswordComponent />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
