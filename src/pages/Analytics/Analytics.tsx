import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header } from "semantic-ui-react";
import { GraphCard } from "../../components/Cards/GraphCard";
import { StatsCard } from "../../components/Cards/StatsCard";
import "./Analytics.less";

const statsItems = [
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

const graphs = [
  {
    title: "Active Users",
    x_axis: ["2/2", "3/2", "4/2", "5/2", "6/2", "7/2", "8/2"],
    y_axis: ["1,000", "2,000", "3,000", "4,000", "5,000", "6,000"],
    values: [4000, 3050, 4000, 4010, 4070, 5000, 4040],
  },
  {
    title: "Revenue",
    x_axis: ["2/2", "3/2", "4/2", "5/2", "6/2", "7/2", "8/2"],
    y_axis: ["$100", "$200", "$300", "$400", "$500", "$600"],
    values: [300, 350, 400, 410, 470, 500, 440],
  },
];

export const Analytics = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge">{t("analytics.title")}</Header>
      </Grid.Row>
      <Grid.Row>
        <Header>Filters</Header>
      </Grid.Row>
      <Grid.Row>
        <Card.Group>
          {statsItems.map((item, i) => {
            return <StatsCard key={i} {...item} />;
          })}
        </Card.Group>
      </Grid.Row>
      <Grid.Row>
        <GraphCard data={graphs} />
      </Grid.Row>
    </Grid>
  );
};
