import ForgotEmailComponent from "../../components/LoginComponent/ForgotEmailComponent";
import ForgotEmailLogoComponent from "../../components/LoginComponent/ForgotEmailLogoComponent";

const ForgotEmail = () => {
  return (
    <div className="container" style={{fontSize: "0.8rem"}}>
      <div className="flex w-screen h-screen bg-[#7700DF]">
        <ForgotEmailLogoComponent />
        <div className="w-1/2">
          <ForgotEmailComponent />
        </div>
      </div>
    </div>
  );
};

export default ForgotEmail;
