import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../../api/API";
import { ActionType } from "../../state/types";
import { DispatchContext } from "../../App";
import { Authentication } from "../../authentication/Authentication";
import { Paths } from "../../routes";
import { Card } from "../../api/DataTypes";

const LoginComponent = () => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const { dispatch } = useContext(DispatchContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Put spinner loading
    setWaitingForResponse(true);

    // Get login data { token, account }
    const { token, account } = await API.login(
      formData.email,
      formData.password
    );

    // Set context account.
    if (account) {
      dispatch({
        type: ActionType.SetAccount,
        payload: {
          account,
        },
      });
    }

    // Save token in localstorare
    if (token) {
      Authentication.handleSuccessfulLogin(token, account);
      const card: any = await API.getCardDetails(token);
      dispatch({
        type: ActionType.SetCard,
        payload: { card },
      });
      if(card.brand === null) {
        navigate(Paths.Paymentcard);
      } else {
        navigate(Paths.Dashboard);
      }
    } else {
      Authentication.clearToken();
      setError(true);
    }

    // Remove spinner loading
    setWaitingForResponse(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setError(false);
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center justify-center h-full w-full px-16">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6 w-full">
          <div className="flex justify-center">
            <input
              name="email"
              className="w-full bg-gray150 text-gray-900 placeholder-gray-300 text-sm rounded-lg text-center block p-2.5"
              placeholder={t("login.email_pholder")}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-6 w-full">
          <div className="flex flex-col justify-center">
            <input
              type="password"
              name="password"
              className="w-full bg-gray150 text-gray-900 placeholder-gray-300 text-sm rounded-lg text-center block p-2.5"
              placeholder={t("login.password_pholder")}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {error && (
              <p className="mt-2 text-sm text-[#fd0000] opacity-[0.6499999761581421]">
                {t("login.incorrect")}
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-end">
            <div>
              <label className="checkbox_container">
                <span className="text-xs text-[#707070] opacity-[0.6499999761581421]">
                  Remember me?
                </span>
                <input type="checkbox" />
                <span className="check_mark"></span>
              </label>
            </div>
            <button
              type="submit"
              className="text-lg text-white bg-[#ff9100] hover:bg-[#ee8000] shadow-lg rounded-md px-20 py-3 mb-2"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <p className="text-right mb-6 w-full">
        <button
          onClick={() => navigate("/forgotemail")}
          className="text-xs text-[#707070] opacity-[0.6499999761581421] border-0"
        >
          {t("login.forgot")}
        </button>
      </p>
    </div>
  );
};

export default LoginComponent;
