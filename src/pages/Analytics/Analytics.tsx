import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header, Placeholder } from "semantic-ui-react";
import { API } from "../../api/API";
import {
  Analytics as AnalyticsData,
  TopStats as TopStatsData,
} from "../../api/DataTypes";
import { DispatchContext } from "../../App";
import { GraphCard } from "../../components/Cards/GraphCard";
import { StatsCard } from "../../components/Cards/StatsCard";
import { TopStatsCard } from "../../components/Cards/TopStatsCard";
import { Filters } from "../../components/Filters/Filters";
import "./Analytics.less";

export const Analytics = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [topStatsData, setTopStatsData] = useState<TopStatsData>({
    top_games: [],
    top_platforms: [],
  });
  const { state } = useContext(DispatchContext);

  const [filters, setFilters] = useState({
    platform: null,
    date: null,
    app_id: null,
  });

  const updateFilters = (
    key: "platform" | "date" | "app_id",
    value: number | null
  ) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  useEffect(() => {
    API.analytics(filters.platform, filters.app_id, filters.date).then(
      (data) => {
        setAnalyticsData(data);
      }
    );
  }, [filters]);

  useEffect(() => {
    API.topStats().then((data) => {
      setTopStatsData(data);
    });
  }, []);

  if (!analyticsData) return <Placeholder></Placeholder>;

  const { stats, graphs } = analyticsData;
  const { top_games, top_platforms } = topStatsData;

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge">{t("analytics.title")}</Header>
      </Grid.Row>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Filters
          onChange={updateFilters}
          platforms={state.platforms || []}
          apps={state.apps || []}
        />
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
      <Grid.Row>
        <Card.Group>
          <TopStatsCard
            header={t("analytics.top_games.header")}
            data={top_games}
          />
          <TopStatsCard
            header={t("analytics.top_platforms.header")}
            data={top_platforms}
          />
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
};
