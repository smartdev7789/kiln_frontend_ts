import { Grid, Header, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api/API";
import {
  FormField,
  FieldType,
  ValidatedForm,
} from "../../components/ValidatedForm/ValidatedForm";
import { DispatchContext } from "../../App";
import { Team } from "../../api/DataTypes";
import { getToken } from "../../authentication/Authentication";
import { FieldValue } from "../../hooks/useForm";

export type LangCode = {
  name: string;
  nativeName: string;
  iso639_1: string;
  iso639_2T: string;
  iso639_2B: string;
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
    key: "business_license",
    label: "editTeamInfo.business_license",
    type: FieldType.FileUpload,
    required: true,
  },
];

interface FormDataInterface {
  [key: string]: FieldValue
}

export const EditTeamInfo = () => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [token, setToken] = useState<string>('');
  const { state } = useContext(DispatchContext);
  const [initialFormData, setInitialFormData] = useState<FormDataInterface>()

  const handleSubmit = async (formData: object) => {
    setWaitingForResponse(true);

    // await API.updateAccount(formData as Account);

    setWaitingForResponse(false);
  };

  // Set the Token
  useEffect(() => {
    setToken(getToken());
  }, []);

  // Set the Team
  useEffect(() => {
    if (!token) return;
    
    API.getTeam(token, state.account!.team_id).then(response => {
      // TODO: Do the real stuff once I get Saul's endpoint. For debugging atm.
      (response as Team).team_name = "tete";
      (response as Team).company_name = "tete corp";
      (response as Team).contact_number = "01234567";
      (response as Team).contact_email = "tete@tete.tete";

      const data: FormDataInterface = {};

      formFields.map((field) => {
        const value = (response as Team as any)[field.key];
        data[field.key] = value || "";
        return field
      }); 
      
      setInitialFormData(data as FormDataInterface);
    });
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
        </Segment>
      </Grid.Row>
    </>
  );
};
