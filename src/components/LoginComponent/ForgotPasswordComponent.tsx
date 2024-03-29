import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import { API } from "../../api/API";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../routes";
import { TokenValidated } from "./TokenValidated";
import { useQueryParams } from "../../hooks/useQueryParams";

interface FormValidation {
  valid: boolean;
  error: string;
}

interface TokenValidation {
  validated: boolean;
  valid: boolean;
}

const ForgotPasswordComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [tokenValidated, setTokenValidated] = useState<TokenValidation>({
    validated: false,
    valid: false,
  });
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
    token: "",
  });
  const passwordInput = useRef<HTMLInputElement>(null);

  const { getQueryParam } = useQueryParams();

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.valid) {
      passwordInput.current!.setCustomValidity(validation.error);
      passwordInput.current!.reportValidity();

      return;
    }

    setWaitingForResponse(true);

    await API.changePassword(
      formData.password,
      formData.confirm_password,
      formData.token
    );

    setWaitingForResponse(false);

    navigate(Paths.LogIn);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    passwordInput.current!.setCustomValidity("");

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (): FormValidation => {
    if (formData.password.trim() === "")
      return { error: "Password is required", valid: false };

    if (formData.password.trim().length < 8)
      return {
        error: "Password needs to be at least 8 characters long",
        valid: false,
      };

    if (formData.password !== formData.confirm_password)
      return { error: "Password and confirmation doesn't match", valid: false };

    return { valid: true, error: "" };
  };

  const resetRequestToken = getQueryParam("token");

  useEffect(() => {
    // If we don't have a reset request token, then this is all invalid
    if (!resetRequestToken)
      setTokenValidated({ validated: true, valid: false });

    // Call the API to see if the token we've got is valid and hasn't expired
    async function validateToken(token: string) {
      try {
        const response = await API.resetPasswordValidateToken(
          resetRequestToken!
        );

        setTokenValidated({ validated: true, valid: true });

        setFormData({
          ...formData,
          token: response["token"],
        });
      } catch (err) {
        setTokenValidated({ validated: true, valid: false });
      }
    }

    validateToken(formData.password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center justify-center h-full w-full px-16">
      <div className="mx-auto w-[35em]">
        {!tokenValidated.validated || !tokenValidated.valid ? (
          <TokenValidated
            message={
              !tokenValidated.validated
                ? t("resetPassword.validatingToken")
                : t("resetPassword.invalidToken")
            }
          />
        ) : (
          <>
            <div className="mb-6 w-full">
              <div className="flex justify-center">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  ref={passwordInput}
                  className="w-full bg-gray150 text-gray-900 placeholder-gray-300 text-sm rounded-lg text-center block p-2.5"
                  placeholder={t("forgotpassword.newpassword_pholder")}
                  required
                />
              </div>
            </div>
            <div className="mb-6 w-full">
              <div className="flex justify-center">
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className="w-full bg-gray150 text-gray-900 placeholder-gray-300 text-sm rounded-lg text-center block p-2.5"
                  placeholder={t("forgotpassword.repassword_pholder")}
                  required
                />
              </div>
            </div>

            <div className="mb-6 w-full text-right">
              <button
                type="button"
                onClick={handleSubmit}
                className="text-lg text-white bg-[#ff9100] hover:bg-[#ee8000] shadow-lg rounded-md px-20 py-3 mb-2"
              >
                {t("forgotpassword.submit")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
