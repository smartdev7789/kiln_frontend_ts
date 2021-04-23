import { Button, Form, Grid, Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import Logo from "../../images/logos/full-grey.png";
import { API } from "../../api/API";
import { DispatchContext } from "../../App";
import { ActionType } from "../../state/types";
import { Link, RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";
import { Authentication } from "../../authentication/Authentication";

export const LogIn = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { dispatch } = useContext(DispatchContext);

  const handleSubmit = async () => {
    setWaitingForResponse(true);

    const user = await API.login(formData.username, formData.password);

    dispatch({
      type: ActionType.SetUser,
      payload: {
        user,
      },
    });

    Authentication.handleSuccessfulLogin(user);

    setWaitingForResponse(false);

    history.push(Paths.Analytics);
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
          <Form.Field>
            <input
              name="username"
              value={formData.username}
              type="text"
              autoComplete="username"
              placeholder={t("login.username")}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="password"
              value={formData.password}
              type="password"
              autoComplete="current-password"
              placeholder={t("login.password")}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Button.Group widths="2">
            <Button type="submit">{t("login.login")}</Button>
            <Button as={Link} to={Paths.ForgotPassword}>
              {t("login.forgotPassword")}
            </Button>
          </Button.Group>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
