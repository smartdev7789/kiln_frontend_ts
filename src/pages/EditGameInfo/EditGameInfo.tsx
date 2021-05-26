import codes from "iso-language-codes";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
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

import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { getToken } from "../../authentication/Authentication";

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
  {
    key: "privacy_policy",
    label: "newGame.privacy_policy",
    placeholder: "https://example.com",
    type: FieldType.URL,
    required: true,
    maxLength: 150,
  },
];

// Componente.
export const EditGameInfo = ({ history, match }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [gameID, setGameID] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');
  const [gameData, setGameData] = useState<AppInfo | null>( null );

  // Submit.
  const handleSubmit = async (formData: object) => {   
    // Start sniper
    setWaitingForResponse(true);
    const app = await API.updateApp(token, gameData!.id, formData as AppInfo, gameData!._etag);
    // Stop sniper
    setWaitingForResponse(false);
    history.push(PathHelpers.EditGamePlatforms({ id: app!.id! }), { app });
  };
  
  // obtiene el ID de la app y setea el token
  useEffect( () => {
    if ( match.params! ) {
      setGameID( (match.params as { id: string }).id );
      setToken( getToken()! );
    }
  }, [ match.params ]);

  // Obtiene y setea gameData.
  useEffect(() => {
    if ( token! && gameID! ){
      API.app( token, gameID ).then( ( app ) => {
        setGameData( (app as AppInfo ) );
      })
    }
  },[token, gameID])

  // Show roulette until gameData is populated
  if (gameData === null) return <PagePlaceholder />;

  // Return initial form data.
  const initialFormData = () => {
      const data: { [key: string]: any } = {};
      formFields.map( (field) => {
        data[field.key] = (gameData as any)[field.key];
        return field
      })
      console.log(data)
      return data
  }
  
  return (
    <Grid>
      {/* Header */}
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {gameData.name} - {t("editGame.info.title")}
        </Header>{" "}
        <Button
          compact
          positive
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          as={Link}
          to={PathHelpers.EditGamePlatforms({ id: gameData.id })}
        >
          {t("editGame.nextStep")}
        </Button>
      </Grid.Row>
      
      {/* Steps */}
      <Grid.Row>
        <GameCreationSteps steps={EditGameInfoSteps} gameId={gameData.id!} />
      </Grid.Row>

      {/* Form */}
      <Grid.Row>
        <Segment className="full-width"> 
          <ValidatedForm
            loading={ waitingForResponse }
            onSubmit={ handleSubmit }
            fields={ formFields }
            initialFormData={ initialFormData() }
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
