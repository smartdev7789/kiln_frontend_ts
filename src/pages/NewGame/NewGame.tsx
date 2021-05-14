import React, { useState } from "react"; //, useContext
import codes from "iso-language-codes";
import { Grid, Header, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { API } from "../../api/API";
import { RouteComponentProps } from "react-router-dom";
import { PathHelpers, Paths } from "../../routes";
import { BasicAppInfo, APIResponse } from "../../api/DataTypes";
import {
  FormField,
  FieldType,
  ValidatedForm,
} from "../../components/ValidatedForm/ValidatedForm";
import { getToken } from "../../authentication/Authentication";
// import { DispatchContext } from "../../App";
// import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

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

export const NewGame = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [ waitingForResponse, setWaitingForResponse ] = useState(false);
  const [ error, setError ] = useState(false);

  // const { dispatch } = useContext(DispatchContext);

  const handleSubmit = async (formData: object) => {
    
    // Put spinner
    setWaitingForResponse(true);
    
    const token = await getToken();
    const response:APIResponse = await API.createApp(token, formData as BasicAppInfo);
    
    // remove spinner
    setWaitingForResponse(false);

    if ( response._status === "OK" ) {
      console.log(response);
      // history.push(PathHelpers.EditGamePlatforms({ id: response.id }), { "app" });
      // > http://localhost:3000/games/54084578-1b04-4945-8057-8bc2c208461f/edit/platforms
      // history.push( PathHelpers.EditGamePlatforms( { id: response.id } ) );
      history.push(Paths.Games)
    } else {
      console.log(response._error);
      setError(true);
    }

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
          <ValidatedForm
            loading={waitingForResponse}
            onSubmit={handleSubmit}
            fields={formFields}
            initialFormData={{
              name: "",
              default_language: "",
              description: "",
              summary: "",
              type: 0,
            }}
            buttons={[
              {
                text: "newGame.submit",
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
