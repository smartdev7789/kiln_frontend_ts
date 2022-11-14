import React, { useState } from "react";
import ForgotPasswordComponent from "../../components/LoginComponent/ForgotPasswordComponent";
import LogoComponent from "../../components/LoginComponent/LogoComponent";

const ForgotEmail = () => {
  return (
    <div className="container">
      <div className="flex w-screen h-screen bg-[url('/public/imgs/BG_Purple.svg')]">
        <LogoComponent />
        <div className="w-1/2">
          <ForgotPasswordComponent />
        </div>
      </div>
    </div>
  );
};

export default ForgotEmail;
