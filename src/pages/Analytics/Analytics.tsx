import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header, Placeholder } from "semantic-ui-react";
import { API } from "../../api/API";
import { Analytics as AnalyticsData } from "../../api/DataTypes";
import { GraphCard } from "../../components/Cards/GraphCard";
import { StatsCard } from "../../components/Cards/StatsCard";
import "./Analytics.less";

export const Analytics = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  useEffect(() => {
    API.stats(1, 1, 1).then((data) => {
      setAnalyticsData(data);
    });
  }, []);

  if (!analyticsData) return <Placeholder></Placeholder>;

  const { stats, graphs } = analyticsData;

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
          {stats.map((item, i) => {
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
