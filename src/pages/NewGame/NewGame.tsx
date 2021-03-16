import { Button, Form, Grid } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import "./NewGame.less";
import { API } from "../../api/API";
import { RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";

export const NewGame = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState({ gameName: "" });

  const handleSubmit = async () => {
    setWaitingForResponse(true);

    await API.createApp(formData.gameName);

    setWaitingForResponse(false);

    history.push(Paths.Analytics);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  return (
    <Grid>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form loading={waitingForResponse} onSubmit={handleSubmit}>
          <Form.Field>
            <input
              onChange={handleInputChange}
              name="gameName"
              value={formData.gameName}
              type="text"
              placeholder={t("newGame.gameName")}
            />
          </Form.Field>
          <Button type="submit">{t("newGame.nextStep")}</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
