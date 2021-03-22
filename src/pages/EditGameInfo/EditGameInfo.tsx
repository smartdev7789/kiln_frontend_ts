import codes from "iso-language-codes";
import { Button, Grid, Header, Placeholder, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { API } from "../../api/API";
import { Link, RouteComponentProps } from "react-router-dom";
import { PathHelpers } from "../../routes";
import { AppInfo } from "../../api/DataTypes";
import {
  FormField,
  FieldType,
  ValidatedForm,
} from "../../components/ValidatedForm/ValidatedForm";
import {
  EditGameInfoSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import {
  additionalFormFieldsForHuawei,
  huaweiCategoryDropdownData,
  huaweiID,
} from "../../platformData/Huawei";

export type LangCode = {
  name: string;
  nativeName: string;
  iso639_1: string;
  iso639_2T: string;
  iso639_2B: string;
};

const formFields: FormField[] = [
  {
    key: "name",
    label: "newGame.name",
    type: FieldType.Text,
    required: true,
    maxLength: 50,
  },
  {
    key: "default_language",
    type: FieldType.SearchDropdown,
    label: "newGame.default_language",
    options: codes
      .sort((a: LangCode, b: LangCode) => a.name.localeCompare(b.name))
      .map((code: LangCode) => ({
        key: code.iso639_1,
        text: code.name,
        value: code.iso639_1,
      })),
    required: true,
  },
  {
    key: "summary",
    label: "newGame.summary",
    type: FieldType.Textarea,
    required: true,
    maxLength: 80,
  },
  {
    key: "description",
    label: "newGame.description",
    type: FieldType.Textarea,
    required: true,
    maxLength: 1300,
  },
  {
    key: "type",
    type: FieldType.Radio,
    label: "newGame.type.label",
    options: [
      {
        key: "0",
        text: "newGame.type.free",
        value: 0,
      },
      {
        key: "1",
        text: "newGame.type.paid",
        value: 1,
      },
    ],
    required: true,
  },
];

export const EditGameInfo = ({
  history,
  location,
  match,
}: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [gameData, setGameData] = useState<AppInfo | null>(
    location.state ? ((location.state as any).app as AppInfo) : null
  );

  const handleSubmit = async (formData: object) => {
    setWaitingForResponse(true);

    const app = await API.updateApp(gameData!.id!, formData as AppInfo);

    setWaitingForResponse(false);

    history.push(PathHelpers.EditGameMonetisation({ id: app.id }), { app });
  };

  useEffect(() => {
    if (!gameData || !gameData.name) {
      API.app((match.params as { id: string }).id).then((app) => {
        setGameData(app);
      });
    }
  }, [gameData, gameData?.name, match.params]);

  if (gameData === null) return <Placeholder />;

  const allFields = formFields;

  if (gameData.platforms.find((plat) => plat.id === huaweiID)) {
    additionalFormFieldsForHuawei.forEach((field) => {
      allFields.push({ ...field });
    });
  }

  const initialFormData = allFields.reduce(
    (data: { [key: string]: any }, field) => {
      data[field.key] = (gameData as any)[field.key];

      return data;
    },
    {}
  );

  const categories_1 = huaweiCategoryDropdownData;

  return (
    <Grid>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {gameData.name} - {t("editGame.info.title")}
        </Header>{" "}
        <Button
          compact
          positive
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          as={Link}
          to={PathHelpers.EditGameMonetisation({ id: gameData.id })}
        >
          {t("editGame.nextStep")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <GameCreationSteps steps={EditGameInfoSteps} gameId={gameData.id!} />
      </Grid.Row>
      <Grid.Row>
        <Segment className="full-width">
          <ValidatedForm
            loading={waitingForResponse}
            onSubmit={handleSubmit}
            fields={allFields}
            initialFormData={initialFormData}
            additionalFieldData={{
              categories_1,
            }}
            buttons={[
              {
                text: "editGame.info.submit",
                positive: true,
                submit: true,
              },
            ]}
          />
        </Segment>
      </Grid.Row>
    </Grid>
  );
};
