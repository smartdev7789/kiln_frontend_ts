import { Grid, Header, Menu, Segment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { API } from "../../api/API";
import { Link, RouteComponentProps } from "react-router-dom";

const menuLinks = [
  {
    text: "documentation.gettingStarted",
    path: "/documentation/getting-started",
  },

  {
    text: "documentation.introduction",
    path: "/documentation/introduction",
  },

  {
    text: "documentation.unitySDK",
    path: "/documentation/unity",
  },
];

export const Documentation = ({ location }: RouteComponentProps) => {
  const { t } = useTranslation();
  const [serviceDetails, setServiceDetails] = useState("");

  useEffect(() => {
    API.getTermsOfService().then(({ tos }) => {
      setServiceDetails(tos);
    });
  }, []);

  const serviceDetailsParas = serviceDetails
    .split("\n")
    .map((para, i) => <p key={i}>{para}</p>);

  return (
    <Grid>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {t("documentation.title")}
        </Header>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Menu fluid vertical tabular>
            {menuLinks.map((link) => {
              return (
                <Menu.Item
                  key={link.path}
                  content={t(link.text)}
                  as={Link}
                  to={link.path}
                  active={location.pathname === link.path}
                />
              );
            })}
          </Menu>
        </Grid.Column>
        <Grid.Column width="12">
          <Segment padded="very" textAlign="left">
            {serviceDetailsParas}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
