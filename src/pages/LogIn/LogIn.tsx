import { Button, Form, Grid, Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import "./LogIn.less";
import Logo from "../../images/logos/full-grey.png";
import { API } from "../../api/API";
import { DispatchContext } from "../../App";
import { ActionType } from "../../state/types";
import { RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";
import { Authentication } from "../../authentication/Authentication";

export const LogIn = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { dispatch } = useContext(DispatchContext);

  const handleSubmit = async () => {
    setWaitingForResponse(true);

    const user = await API.login(formData.email, formData.password);

    dispatch({
      type: ActionType.SET_USER,
      payload: {
        user,
      },
    });

    Authentication.handleSuccessfulLogin(user);

    setWaitingForResponse(false);

    history.push(Paths.Analytics);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form loading={waitingForResponse} onSubmit={handleSubmit}>
          <Image src={Logo} />
          <Form.Field>
            <input
              onChange={handleInputChange}
              name="email"
              value={formData.email}
              type="email"
              placeholder={t("login.email")}
            />
          </Form.Field>
          <Form.Field>
            <input
              onChange={handleInputChange}
              name="password"
              value={formData.password}
              type="password"
              placeholder={t("login.password")}
            />
          </Form.Field>
          <Button.Group widths="2">
            <Button type="submit">{t("login.login")}</Button>
            <Button>{t("login.forgotPassword")}</Button>
          </Button.Group>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
