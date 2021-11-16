import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header, /*Segment*/ } from "semantic-ui-react";
import { API } from "../../api/API";
import {
  TopStats as TopStatsData,
  GraphData,
  StatData
} from "../../api/DataTypes";
import { DispatchContext } from "../../App";
// import { GraphCard } from "../../components/Cards/GraphCard";
import { StatsCard } from "../../components/Cards/StatsCard";
import { TopStatsCard } from "../../components/Cards/TopStatsCard";
import { Filters } from "../../components/Filters/Filters";
import { useQueryParams } from "../../hooks/useQueryParams";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
// import { GraphCardPlaceholder } from "../../components/Placeholders/GraphCardPlaceholder";
import { getToken } from "../../authentication/Authentication";

export const Analytics = (props: RouteComponentProps) => {
  // Translations.
  const { t } = useTranslation();

  const token:string|null = getToken();

  // State stats and graphs
  const [statsData, setStatsData] = useState<Stat[]>([]);
  const [graphsData, setGraphsData] = useState<GraphData[]>([]);

  // State Top stats
  const [topStatsData, setTopStatsData] = useState<TopStatsData>({
    top_games: [],
    top_platforms: [],
  });

  // Get context.
  const { state } = useContext(DispatchContext);

  // Filter Param.
  // const { getQueryParamNumber, getQueryParam, setQueryParams } = useQueryParams();
  const { getQueryParamNumber, getQueryParam } = useQueryParams();

  // State filters.
  const [filters, setFilters] = useState({
    platform_id: getQueryParamNumber("platform_id"),
    date: getQueryParam("date"),
    application_id: getQueryParam("app_id"),
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

  interface Stat {
    label: string;
    value: string | any;
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  const crunchData = (data: StatData[]): Stat[] => {
    const stats = data.reduce((acc: any, curr) => {
      if (acc[curr.label]) {
        acc[curr.label] += parseInt(curr.value);
      } else {
        acc[curr.label] = parseInt(curr.value);
      }
      return acc;
    }, {});

    const s: Stat[] = [];
    Object.entries(stats).forEach(([key, value]) => {
      s.push({ label: key, value: value });
    });
    console.log(data);
    console.log(s);
    return s;
  };

  // Get graphs and stats data.
  useEffect(() => {
    if ( filters.application_id! && filters.date! && filters.platform_id! ) {
      // API.graphs(token, filters).then((data) => { setGraphsData(data!._items as GraphData[]) })
      API.stats(filters, token)
        .then((data) => {
          
          const stats = crunchData(data!._items as StatData[]);
          
          setStatsData(stats);
        });
    } else {
      setGraphsData([])
      setStatsData([])
    }
    // setQueryParams(filters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filters])

  // Get top stats data when filters change.
  useEffect(() => {
    API.topStats(token).then((data) => { setTopStatsData(data) })
  }, [token]);

  if (!graphsData || !statsData) return <PagePlaceholder />;

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
        <Card.Group centered itemsPerRow={2}>
          { statsData.map((item, i) => { return <StatsCard key={i} {...item} />; })  }
        </Card.Group>
      </Grid.Row>

      {/* TODO */}
      {/* Graphp card  */}
      {/* { 
        graphsData.length !== 0
        ?
        <Grid.Row>
          { graphsData.length > 0 ? (
            <GraphCard data={graphsData as GraphData[]} />
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
      } */}
      
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
