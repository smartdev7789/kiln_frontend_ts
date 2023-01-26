const ForgotEmailLogoComponent = () => {
  return (
    <div className="flex flex-col w-1/2">
      <div className="logo">
        <img className="h-8 m-8" src="imgs/GameBake_Logo.svg" alt="GameBake" />
      </div>
      <div className="content flex items-center justify-center flex-col flex-grow px-28 mx-auto w-[40em]">
        <div className="title text-white w-85 float-left">
          <div className="text-5xl font-extrabold mb-6">That’s annoying</div>
          <p className="text-xl">
            Don’t worry, just let us know the email attached to your account and
            we will send over a reset link.
          </p>
        </div>
        <div className="image">
          <img
            className="w-80"
            src="imgs/GameBake_Hero_Motion2.gif"
            alt="GameBake"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotEmailLogoComponent;
