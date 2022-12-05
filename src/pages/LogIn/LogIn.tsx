import LoginComponent from "../../components/LoginComponent";
import LoginLogoComponent from "../../components/LoginComponent/LoginLogoComponent";

const LogIn = () => {
  return (
    <div className="container">
      <div className="flex w-screen h-screen bg-[#7700DF]">
        <LoginLogoComponent />
        <div className="w-1/2">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
