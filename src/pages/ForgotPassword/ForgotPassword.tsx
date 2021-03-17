import { Button, Form, Grid, Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import "./ForgotPassword.less";
import Logo from "../../images/logos/full-grey.png";
import { API } from "../../api/API";
import { Link, RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";
import { PasswordRequested } from "./PasswordRequested";

export const ForgotPassword = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [passwordRequested, setPasswordRequested] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  const handleSubmit = async () => {
    setWaitingForResponse(true);

    await API.resetPassword(formData.email);

    setWaitingForResponse(false);
    setPasswordRequested(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form loading={waitingForResponse} onSubmit={handleSubmit}>
          <Image src={Logo} />
          {passwordRequested ? (
            <PasswordRequested />
          ) : (
            <>
              <Form.Field>
                <input
                  name="email"
                  value={formData.email}
                  type="email"
                  autoComplete="email"
                  placeholder={t("login.email")}
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Button.Group widths="2">
                <Button as={Link} to={Paths.LogIn}>
                  {t("forgotPassword.backToLogin")}
                </Button>
                <Button type="submit">
                  {t("forgotPassword.getNewPassword")}
                </Button>
              </Button.Group>
            </>
          )}
        </Form>
      </Grid.Column>
    </Grid>
  );
};
