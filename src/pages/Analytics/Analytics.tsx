import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header, Segment } from "semantic-ui-react";
import { API } from "../../api/API";
import {
  Analytics as AnalyticsData,
  TopStats as TopStatsData,
  GraphData
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
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({ stats: [], graphs: [] });

  const [graphData, setGraphData] = useState<GraphData[]>([]);

  // State Top stats
  const [topStatsData, setTopStatsData] = useState<TopStatsData>({
    top_games: [],
    top_platforms: [],
  });

  // Get context.
  const { state } = useContext(DispatchContext);

  // Filter Param.
  const { getQueryParamNumber, getQueryParam, setQueryParams } = useQueryParams();

  // State filters.
  const [filters, setFilters] = useState({
    platform_id: getQueryParamNumber("platform_id"),
    date: getQueryParam("date"),
    application_id: getQueryParam("application_id"),
  });

  // Filter onChange.
  const updateFilters = (
    key: "platform_id" | "date" | "application_id",
    value: string | number | null
  ) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  // Get analytics data when filters change.
  useEffect(() => {
    API.analytics(
      filters.platform_id, 
      filters.application_id, 
      filters.date,
      token).then(
      (data) => { setAnalyticsData(data); }
    );
    setQueryParams(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, token]);

  useEffect(() => {
    console.log(filters)
    if ( filters.application_id! && filters.date! && filters.platform_id! ) {
      console.log(filters)
      API.graphs(token, filters).then((data) => { setGraphData(data!._items as GraphData[]) })
      // API.stats(token).then((data) => { setGraphData(data!._items as GraphData[]) })
    } else {
      setGraphData([])
    }
  }, [token,filters])

  // Get top stats data when filters change.
  useEffect(() => {
    API.topStats(token).then((data) => { setTopStatsData(data) })
  }, [token]);

  // Si no existe analyticsData mostrar el spiner
  if (!analyticsData) return <PagePlaceholder />;

  const { stats } = {  stats:[] }
  
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
      
      {/* Stats */}
      <Grid.Row>
        <Card.Group>
          { stats.map((item, i) => { return <StatsCard key={i} {...item} />; })  }
        </Card.Group>
      </Grid.Row>

      {/* TODO */}
      {/* Graphp card  */}
      { 
        graphData.length !== 0
        ?
        <Grid.Row>
          { graphData.length > 0 ? (
            <GraphCard data={graphData as GraphData[]} />
          ) : (
            <GraphCardPlaceholder />
          )}
        </Grid.Row>
        :
        <Grid.Row>
          <Segment className="full-width borderless">
            <h3>{t("analytics.graphs.set-filter")}</h3>
          </Segment>
        </Grid.Row>
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
