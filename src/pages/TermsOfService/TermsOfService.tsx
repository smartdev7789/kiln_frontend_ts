import {
  Button,
  Checkbox,
  Form,
  Grid,
  Image,
  Segment,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import "./TermsOfService.less";
import Logo from "../../images/logos/full-grey.png";
import { API } from "../../api/API";
import { Link, RouteComponentProps } from "react-router-dom";
import { Paths } from "../../routes";

export const TermsOfService = ({ history }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [serviceDetails, setServiceDetails] = useState("");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    API.getTermsOfService().then(({ tos }) => {
      setServiceDetails(tos);
    });
  }, []);

  const handleSubmit = async () => {
    setWaitingForResponse(true);

    await API.acceptTermsOfService();

    setWaitingForResponse(false);

    history.push(Paths.Analytics);
  };

  const serviceDetailsParas = serviceDetails
    .split("\n")
    .map((para, i) => <p key={i}>{para}</p>);

  return (
    <Grid textAlign="center">
      <Grid.Column>
        <Image src={Logo} size="medium" centered />
        <Segment
          loading={waitingForResponse}
          padded="very"
          textAlign="left"
          style={{ maxHeight: "40em", overflowY: "scroll" }}
        >
          {serviceDetailsParas}
        </Segment>
        <Form loading={waitingForResponse} onSubmit={handleSubmit}>
          <Form.Field inline style={{ float: "right" }}>
            <Checkbox
              checked={accepted}
              onChange={(_, props) => setAccepted(props.checked!)}
              label={t("termsOfService.iAccept")}
            />
            <Button disabled={!accepted} positive>
              {t("termsOfService.submit")}
            </Button>
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
