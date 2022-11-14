import React, { useState } from "react";
import LoginComponent from "../../components/LoginComponent";
import LogoComponent from "../../components/LoginComponent/LogoComponent";

const Login = () => {
  return (
    <div className="container">
      <div className="flex w-screen h-screen bg-[url('/public/imgs/BG_Purple.svg')]">
        <LogoComponent />
        <div className="w-1/2">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;
