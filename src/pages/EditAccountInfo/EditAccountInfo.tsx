import { Grid, Header, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { API } from "../../api/API";
import { RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";
import {
  FormField,
  FieldType,
  ValidatedForm,
} from "../../components/ValidatedForm/ValidatedForm";
import { DispatchContext } from "../../App";
import { EditTeamInfo } from "./EditTeamInfo"
import { Account, FormDataInterface } from "../../api/DataTypes";
import { getToken, handleAccountUpdate } from "../../authentication/Authentication";

const formFields: FormField[] = [
  {
    key: "name",
    label: "editAccountInfo.name",
    type: FieldType.Text,
    required: true,
    maxLength: 100,
  },
  {
    key: "email",
    label: "editAccountInfo.email",
    type: FieldType.Email,
    required: true,
    maxLength: 100,
  },
];

export const EditAccountInfo = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [token, setToken] = useState<string>('');
  const [initialFormData, setInitialFormData] = useState<FormDataInterface>()
  const { state } = useContext(DispatchContext);

  /**
   * 
   * @param formData 
   */
  const handleSubmit = async (formData: object) => {
    setWaitingForResponse(true);

    const auxAccount = state.account!;

    auxAccount.name = (formData as Account).name;
    auxAccount.email = (formData as Account).email;

    const response = await API.updateAccount(token, auxAccount, state.account!._etag);

    if (response._status === "OK") {
      auxAccount._etag = response._etag;
      handleAccountUpdate(auxAccount);
    }

    setWaitingForResponse(false);

    history.push(Paths.EditAccountInfo);
  };

  // Set the Token
  useEffect(() => {
    setToken(getToken());
  }, []);

  useEffect(() => {
    if (!state.account) return;

    const data: { [key: string]: any } = {};
    
    formFields.map((field) => {
      const value = (state.account as any)[field.key];
      data[field.key] = value || "";
      return field
    });

    setInitialFormData(data);
  }, [state]);
  
  return (
    <Grid>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {t("editAccountInfo.title")}
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
    
      <EditTeamInfo />
    
    </Grid>
    
    
  );
};
