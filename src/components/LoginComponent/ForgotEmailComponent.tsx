import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { API } from "../../api/API";

const ForgotEmailComponent = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const handleSubmit = async () => {
    setWaitingForResponse(true);

    const { success } = await API.resetPassword(email);
    if (success) {
      setConfirmed(true);
    } else {
      setError(true);
    }
    setWaitingForResponse(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(false);
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center justify-center h-full w-full px-16">
      <div className="mb-3 w-full">
        <div className="flex flex-col justify-center">
          <input
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-full bg-gray150 text-gray-900 placeholder-gray-300 text-sm rounded-lg text-center block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder={t("forgotemail.email_pholder")}
            required
          />

          {error && (
            <p className="mt-1 text-sm text-[#fd0000] opacity-[0.6499999761581421] dark:text-green-500">
              {t("forgotemail.incorrect")}
            </p>
          )}
          {confirmed && (
            <p className="mt-1 text-sm text-[#1d6e00] opacity-[0.6499999761581421] dark:text-green-500">
              {t("forgotemail.confirmed")}
            </p>
          )}
        </div>
      </div>
      <div className="mb-6 w-full text-right">
        <button
          type="button"
          onClick={handleSubmit}
          className="text-lg text-white bg-[#ff9100] hover:bg-[#ee8000] shadow-lg rounded-md px-20 py-3 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          {t("forgotemail.submit")}
        </button>
      </div>
    </div>
  );
};

export default ForgotEmailComponent;
