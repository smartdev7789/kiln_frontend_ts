import { Button, Form, Grid, Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import Logo from "../../images/logos/full-grey.png";
import { API } from "../../api/API";
import { Link, RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";
import { TokenValidated } from "./TokenValidated";
import { useQueryParams } from "../../hooks/useQueryParams";

interface FormValidation {
  valid: boolean;
  error: string;
}

interface TokenValidation {
  validated: boolean,
  valid: boolean
}

export const ResetPassword = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [tokenValidated, setTokenValidated] = useState<TokenValidation>({ validated: false, valid: false });
  const [formData, setFormData] = useState({ password: "", confirm_password: "", token: "" });
  const passwordInput = useRef<HTMLInputElement>(null);

  const { getQueryParam, setQueryParams } = useQueryParams();

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.valid) {
      passwordInput.current!.setCustomValidity(validation.error);
      passwordInput.current!.reportValidity();

      return;
    }

    setWaitingForResponse(true);

    await API.changePassword(formData.password, formData.confirm_password, formData.token);

    setWaitingForResponse(false);
    
    history.push(Paths.LogIn);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    passwordInput.current!.setCustomValidity("");

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (): FormValidation => {
    if (formData.password.trim() === '') return { error: 'Password is required', valid: false };
          
    if (formData.password.trim().length < 8) return { error: 'Password needs to be at least 8 characters long', valid: false };
      
    if (formData.password !== formData.confirm_password)  return { error: 'Password and confirmation doesn\'t match', valid: false };
      
    return { valid: true, error: "" };
  };

  const resetRequestToken = getQueryParam("token");

  
  // User should arrive here after requesting a password change and following up on an email that he should receive.
  // 1. He should arrive here with a query string parameter named token with a UUID.
  // 2. We need to check against the backend that token, to see if it's valid and has not expired yet.
  // 3. If the token is valid, the backend will exchange it for another one that will get added as data to send,
  // along with the new password via a POST request to the change_password endpoint
  useEffect(() => {
    // If we don't have a reset request token, then this is all invalid
    if (!resetRequestToken) setTokenValidated({ validated: true, valid: false });

    // Call the API to see if the token we've got is valid and hasn't expired
    async function validateToken(token: string) {
      const response = await API.resetPasswordValidateToken("token");

      console.log(response);

      setTokenValidated({ validated: true, valid: true });
      setFormData({
        ...formData,
        token: resetRequestToken!,
      })
    }

    validateToken(formData.password);
  }, [resetRequestToken, formData]);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form loading={waitingForResponse} onSubmit={handleSubmit}>
          <Image src={Logo} />
          {(!tokenValidated.validated || !tokenValidated.valid) ? (
            <TokenValidated
              message={!tokenValidated.validated ? t("resetPassword.validatingToken") : t("resetPassword.invalidToken") } />
          ) : (
            <>
              <Form.Field>
                <input
                  name="password"
                  value={formData.password}
                  type="password"
                  required={true}
                  autoComplete="new-password"
                  placeholder={t("login.password")}
                  onChange={handleInputChange}
                  ref={passwordInput}
                />
              </Form.Field>
              <Form.Field>
                <input
                  name="confirm_password"
                  type="password"
                  required={true}
                  autoComplete="new-password"
                  placeholder={t("resetPassword.confirmPassword")}
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Button.Group widths="2">
                <Button as={Link} to={Paths.LogIn}>
                  {t("forgotPassword.backToLogin")}
                </Button>
                <Button type="submit">
                  {t("resetPassword.resetPassword")}
                </Button>
              </Button.Group>
            </>
          )}
        </Form>
      </Grid.Column>
    </Grid>
  );
};
