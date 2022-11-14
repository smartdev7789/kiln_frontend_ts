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
      <div className="mt-6">
        <button
          type="button"
          onClick={() => navigate(Paths.LogIn)}
          className="text-[#707070] text-opacity-[0.6499999761581421] bg-white hover:bg-gray-100 shadow-lg rounded-lg w-96 text-xl px-5 py-1 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          {t("forgotpassword.backtologin")}
        </button>
      </div>
    </>
  );
};
