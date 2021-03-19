import { Grid, Header, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import { API } from "../../api/API";
import { RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";
import { User } from "../../api/DataTypes";
import {
  FormField,
  FieldType,
  ValidatedForm,
} from "../../components/ValidatedForm/ValidatedForm";
import { DispatchContext } from "../../App";

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
  {
    key: "company_name",
    label: "editAccountInfo.company_name",
    type: FieldType.Text,
    required: true,
    maxLength: 100,
  },
  {
    key: "contact_number",
    label: "editAccountInfo.contact_number",
    type: FieldType.PhoneNumber,
    required: true,
    maxLength: 100,
  },
  {
    key: "contact_email",
    label: "editAccountInfo.contact_email",
    type: FieldType.Email,
    required: true,
    maxLength: 100,
  },
  {
    key: "business_license",
    label: "editAccountInfo.business_license",
    type: FieldType.FileUpload,
    required: true,
  },
];

export const EditAccountInfo = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const { state } = useContext(DispatchContext);

  const handleSubmit = async (formData: object) => {
    setWaitingForResponse(true);

    await API.updateAccountInfo(formData as User);

    setWaitingForResponse(false);

    history.push(Paths.Platforms);
  };

  return (
    <Grid>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {t("editAccountInfo.title")}
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Segment className="full-width">
          <ValidatedForm
            loading={waitingForResponse}
            onSubmit={handleSubmit}
            fields={formFields}
            initialFormData={{ ...(state.user || {}) }}
            buttons={[
              {
                text: "editAccountInfo.submit",
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
