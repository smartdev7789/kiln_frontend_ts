import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header } from "semantic-ui-react";
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
import { useQueryParams } from "../../hooks/useQueryParams";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { GraphCardPlaceholder } from "../../components/Placeholders/GraphCardPlaceholder";
import { getToken } from "../../authentication/Authentication";

export const Analytics = (props: RouteComponentProps) => {
  // Translations.
  const { t } = useTranslation();

  const token:string|null = getToken();

  // State analytics
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    stats: [],
    graphs: [],
  });

  // State Top stats
  const [topStatsData, setTopStatsData] = useState<TopStatsData>({
    top_games: [],
    top_platforms: [],
  });

  // Get context.
  const { state } = useContext(DispatchContext);

  // ???
  const { getQueryParamNumber, setQueryParams } = useQueryParams();

  // State filters.
  const [filters, setFilters] = useState({
    platform: getQueryParamNumber("platform"),
    date: getQueryParamNumber("date"),
    app_id: getQueryParamNumber("app_id"),
  });

  // Filter onChange.
  const updateFilters = (
    key: "platform" | "date" | "app_id",
    value: number | null
  ) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  // Get analytics data when filters change.
  useEffect(() => {
    API.analytics(filters.platform, filters.app_id, filters.date, token).then(
      (data) => { setAnalyticsData(data); }
    );
    setQueryParams(filters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, token]);

  // Get top stats data when filters change.
  useEffect(() => {
    API.topStats(token).then((data) => {
      setTopStatsData(data);
    });
  }, [token]);

  if (!analyticsData) return <PagePlaceholder />;

  // const { stats, graphs } = analyticsData; // TODO
  const { stats, graphs } = { stats:[], graphs:[] };
  const { top_games, top_platforms } = topStatsData;

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge">{t("analytics.title")}</Header>
      </Grid.Row>
      
      {/* Filter */}
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Filters
          filters={filters}
          onChange={updateFilters}
          platforms={state.platforms || []}
          apps={state.apps || []}
        />
      </Grid.Row>
      
      {/*  */}
      <Grid.Row>
        <Card.Group>
          { stats.map((item, i) => { return <StatsCard key={i} {...item} />; })  }
        </Card.Group>
      </Grid.Row>

      {/* TODO */}
      {/* Graphp card  */}
      { 
        graphs.length !== 0
        ?
        <Grid.Row>
          { graphs.length > 0 ? (
            <GraphCard data={graphs} />
          ) : (
            <GraphCardPlaceholder />
          )}
        </Grid.Row>        
        :
        null
      }
      
      {/* Tops */}
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
