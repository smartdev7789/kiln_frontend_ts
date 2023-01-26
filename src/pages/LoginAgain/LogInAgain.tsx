import LoginAgainComponent from "../../components/LoginComponent/LoginAgainComponent";
import LoginAgainLogoComponent from "../../components/LoginComponent/LoginAgainLogoComponent";

const LogInAgain = () => {
  return (
    <div className="container" style={{fontSize: "0.8rem"}}>
      <div className="flex w-screen h-screen bg-[#7700DF]">
        <LoginAgainLogoComponent />
        <div className="w-1/2">
          <LoginAgainComponent />
        </div>
      </div>
    </div>
  );
};

export default LogInAgain;
