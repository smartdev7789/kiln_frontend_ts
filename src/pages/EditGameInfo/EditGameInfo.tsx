import codes from "iso-language-codes";
import {
  Button,
  CheckboxProps,
  Dropdown,
  DropdownProps,
  Form,
  Grid,
  Header,
  Radio,
  Segment,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { API } from "../../api/API";
import { RouteComponentProps } from "react-router-dom";
import { PathHelpers } from "../../routes";
import { BasicAppInfo } from "../../api/DataTypes";

type LangCode = {
  name: string;
  nativeName: string;
  iso639_1: string;
  iso639_2T: string;
  iso639_2B: string;
};

const validateData = (formData: BasicAppInfo) => {
  const errors: { [key: string]: string } = {};

  if (formData.name === "") {
    errors["name"] = `name is invalid`;
  }

  if (formData.default_language === "") {
    errors["default_language"] = `default_language is invalid`;
  }

  if (formData.description === "" || formData.description.length > 1300) {
    errors["description"] = `description is invalid`;
  }

  if (formData.summary === "" || formData.summary.length > 80) {
    errors["summary"] = `summary is invalid`;
  }

  if (formData.type !== 0 && formData.type !== 1) {
    errors["type"] = `type is invalid`;
  }

  if (Object.keys(errors).length > 0) {
    console.warn(errors);
    return false;
  }

  return true;
};

export const NewGame = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState<BasicAppInfo>({
    name: "",
    default_language: "",
    description: "",
    summary: "",
    type: 0,
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    const valid = validateData(formData);

    setFormIsValid(valid);
  }, [formData]);

  const handleSubmit = async () => {
    setWaitingForResponse(true);

    const app = await API.createApp(formData);

    setWaitingForResponse(false);

    history.push(PathHelpers.EditGamePlatforms({ id: app.id }), { app });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleCheckBoxChange = (
    e: FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    setFormData({
      ...formData,
      [data.name!]: data.value,
    });
  };

  const handleDropdownChange = (
    e: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    console.log(data.name, data.value, data);
    setFormData({
      ...formData,
      [data.name!]: data.value,
    });
  };

  return (
    <Grid>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {t("newGame.title")}
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Segment className="full-width">
          <Form
            error={!formIsValid}
            loading={waitingForResponse}
            onSubmit={handleSubmit}
            className="bordered no-shadow"
          >
            <Form.Field>
              <label>{t("newGame.name")}</label>
              <input
                onChange={handleInputChange}
                name="name"
                value={formData.name}
                type="text"
                placeholder={t("newGame.name")}
              />
            </Form.Field>
            <Form.Field>
              <label>{t("newGame.default_language")}</label>
              <Dropdown
                onChange={handleDropdownChange}
                placeholder={t("newGame.default_language")}
                search
                selection
                name={"default_language"}
                options={codes
                  .sort((a: LangCode, b: LangCode) =>
                    a.name.localeCompare(b.name)
                  )
                  .map((code: LangCode) => ({
                    key: code.iso639_1,
                    text: code.name,
                    value: code.iso639_1,
                  }))}
              />
            </Form.Field>
            <Form.Field>
              <label>{t("newGame.summary")}</label>
              <textarea
                onChange={handleInputChange}
                name="summary"
                value={formData.summary}
                placeholder={t("newGame.summary")}
                maxLength={80}
                rows={3}
              />
            </Form.Field>
            <Form.Field>
              <label>{t("newGame.description")}</label>
              <textarea
                onChange={handleInputChange}
                name="description"
                value={formData.description}
                placeholder={t("newGame.description")}
                maxLength={1300}
                rows={10}
              />
            </Form.Field>
            <Form.Field>
              <label>{t("newGame.type.label")}</label>
              <Radio
                name="type"
                value={0}
                label={t("newGame.type.free")}
                onChange={handleCheckBoxChange}
                checked={formData.type === 0}
              />
              <Radio
                name="type"
                value={1}
                label={t("newGame.type.paid")}
                onChange={handleCheckBoxChange}
                checked={formData.type === 1}
              />
            </Form.Field>
            <Button
              disabled={!formIsValid}
              floated="right"
              positive
              type="submit"
            >
              {t("newGame.nextStep")}
            </Button>
          </Form>
        </Segment>
      </Grid.Row>
    </Grid>
  );
};
