import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../routes";

interface Properties {
  message: string;
}

export const TokenValidated = (props: Properties) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {props.message}
      <div className="mt-6 w-full text-right">
        <button
          type="button"
          onClick={() => navigate(Paths.LogIn)}
          className="text-lg text-white bg-[#ff9100] hover:bg-[#ee8000] shadow-lg rounded-md px-20 py-3 mb-2"
        >
          {t("forgotpassword.backtologin")}
        </button>
      </div>
    </>
  );
};
