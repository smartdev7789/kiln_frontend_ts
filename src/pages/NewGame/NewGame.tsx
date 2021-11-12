import React, { useEffect, useState } from "react"; //, useContext
import codes from "iso-language-codes";
import { Grid, Header, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { API } from "../../api/API";
import { RouteComponentProps } from "react-router-dom";
import { PathHelpers } from "../../routes";
import { BasicAppInfo, APIResponse } from "../../api/DataTypes";
import {
  FormField,
  FieldType,
  ValidatedForm,
} from "../../components/ValidatedForm/ValidatedForm";
import { getToken } from "../../authentication/Authentication";

export type LangCode = {
  name: string;
  nativeName: string;
  iso639_1: string;
  iso639_2T: string;
  iso639_2B: string;
};

export const NewGame = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [ waitingForResponse, setWaitingForResponse ] = useState(false);
  const [error, setError] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(error) setError(false);
  };

  const fields: FormField[] = [
    {
      key: "name",
      label: "newGame.name",
      type: FieldType.Text,
      required: true,
      unique: false,
      maxLength: 50,
      onChange: handleNameChange,
    },
    {
      key: "pkg_name",
      label: "editGame.info.packageName",
      placeholder: "com.companyName.appName",
      type: FieldType.Text,
      required: false,
      maxLength: 150,
    },
    {
      key: "service_type",
      type: FieldType.SearchDropdown,
      label: "newGame.service_type.title",
      options: [
        { key: "self_serve", text: t("newGame.service_type.self_serve"), value: 1},
        { key: "tag_team", text: t("newGame.service_type.tag_team"), value: 2},
        { key: "hands_off", text: t("newGame.service_type.hands_off"), value: 3},
      ],
      required: true,
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
  
  const handleSubmit = async (formData: object) => {
    // Put spinner
    setWaitingForResponse(true);
    
    const token = await getToken();
    const response:APIResponse = await API.createApp(token, formData as BasicAppInfo);
    
    // remove spinner
    setWaitingForResponse(false);
    
    if (response._status === "OK") {
      history.push( PathHelpers.EditGamePlatforms( { id: response.id } ) );
    } else {
      setError(true);
    }

  };

  useEffect( () => {
    if (!error) {
      fields[0].unique = false;
    }
    else {
      fields[0].unique = true;
    }
     
    setFormFields(fields);
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])
  
  useEffect(() => {
    
  }, [formFields]);

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
              service_type: 0,
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
