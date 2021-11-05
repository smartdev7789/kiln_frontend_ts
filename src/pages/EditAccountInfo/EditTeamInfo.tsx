import { Grid, Header, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { API, API_ADDRESS } from "../../api/API";
import {
  FormField,
  FieldType,
  ValidatedForm,
} from "../../components/ValidatedForm/ValidatedForm";
import { DispatchContext } from "../../App";
import { FormDataInterface, Team } from "../../api/DataTypes";
import { getToken } from "../../authentication/Authentication";
import { Link } from "react-router-dom";

export type LangCode = {
  name: string;
  nativeName: string;
  iso639_1: string;
  iso639_2T: string;
  iso639_2B: string;
};

export const EditTeamInfo = () => {
  const { t } = useTranslation();
  const {state} = useContext(DispatchContext);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [token, setToken] = useState<string>('');
  const [initialFormData, setInitialFormData] = useState<FormDataInterface>()
  const [file, setFile] = useState<File | null>(null);
  const [team, setTeam] = useState<Team>();

  const handleLicenseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const formFields: FormField[] = [
    {
      key: "team_name",
      label: "editTeamInfo.team_name",
      type: FieldType.Text,
      required: true,
      maxLength: 100,
    },
    {
      key: "company_name",
      label: "editTeamInfo.company_name",
      type: FieldType.Text,
      required: true,
      maxLength: 100,
    },
    {
      key: "company_number",
      label: "editTeamInfo.company_number",
      type: FieldType.Text,
      required: true,
      maxLength: 100,
    },
    {
      key: "contact_number",
      label: "editTeamInfo.contact_number",
      type: FieldType.PhoneNumber,
      required: true,
      maxLength: 100,
    },
    {
      key: "contact_email",
      label: "editTeamInfo.contact_email",
      type: FieldType.Email,
      required: true,
      maxLength: 100,
    },
    {
      key: "business_licence",
      label: "editTeamInfo.business_licence",
      type: FieldType.FileUpload,
      required: false,
      onChange: handleLicenseChange,
    },
  ];

  const handleSubmit = async (formData: object) => {
    if (!team) return;
    
    setWaitingForResponse(true);
    
    const response = await API.updateTeam(token, team.id, formData as Team, team._etag, file || undefined);

    if (response._status === "OK") {
      team._etag = response._etag;
    }

    setWaitingForResponse(false);
  };

  // Set the Token
  useEffect(() => {
    setToken(getToken());
  }, []);

  // Set the Team
  useEffect(() => {
    if (!token || !state.account) return;
    
    API.getTeam(token, state.account!.team_id).then(response => {
      const t = response as Team;
      const data: FormDataInterface = {};

      formFields.map((field) => {
        const value = (t as any)[field.key];
        data[field.key] = value || "";
        return field
      }); 
      
      setTeam(t);
      setInitialFormData(data as FormDataInterface);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, state.account]);
  
  return (
    <>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {t("editTeamInfo.title")}
        </Header>
      </Grid.Row>

      <Grid.Row>
        <Segment className="full-width">
          {initialFormData &&
            <ValidatedForm
              loading={waitingForResponse}
              onSubmit={handleSubmit}
              fields={formFields}
              initialFormData={initialFormData}
              buttons={[
                {
                  text: "editAccountInfo.submit",
                  positive: true,
                  submit: true,
                },
              ]}
          />
          }
          {team?.business_licence &&
            <a href={`${API_ADDRESS}${team?.business_licence.file}`} target="_blank" rel="noreferrer">
              Uploaded Business Licence
            </a>
          }
        </Segment>
      </Grid.Row>
    </>
  );
};
