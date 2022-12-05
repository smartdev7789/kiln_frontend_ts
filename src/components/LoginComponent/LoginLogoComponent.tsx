import React from "react";

const LoginLogoComponent = () => {
  return (
    <div className="flex flex-col w-1/2">
      <div className="logo">
        <img className="h-8 m-8" src="imgs/GameBake_Logo.svg" alt="GameBake" />
      </div>
      <div className="content flex items-center justify-center flex-col flex-grow">
        <div className="title text-white w-90 float-left">
          <div className="text-5xl font-extrabold mb-6">Let’s get going!</div>
          <p className="text-xl">Login. Connect. Upload. Distribute.</p>
          <p className="text-xl">Really, it is that simple.</p>
        </div>
        <div className="image">
          <img className="w-80" src="imgs/GameBake_Hero_Motion2.gif" alt="GameBake" />
        </div>
      </div>
    </div>
  );
};

export default LoginLogoComponent;
