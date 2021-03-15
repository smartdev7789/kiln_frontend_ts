import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header } from "semantic-ui-react";
import { StatsCard } from "../../components/Menu/Cards/StatsCard";
import "./Analytics.less";

const items = [
  {
    label: "DAU",
    value: 1986527,
  },
  {
    label: "MAU",
    value: 15986527,
  },
  {
    label: "Purchases",
    value: 11514,
  },
  {
    label: "ARPDAU",
    value: "$0.34",
  },
  {
    label: "Gross Revenue",
    value: "$657,419.89",
  },
];

export const Analytics = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  return (
    <Grid divided="vertically">
      <Grid.Row>
        <Header>{t("analytics.title")}</Header>
      </Grid.Row>
      <Grid.Row>
        <Card.Group>
          {items.map((item, i) => {
            return <StatsCard key={i} {...item} />;
          })}
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
};
