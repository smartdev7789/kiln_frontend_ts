import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router-dom";
import { Card, Grid, Header, Segment } from "semantic-ui-react";
import { API } from "../../api/API";
import {
  TopStats as TopStatsData,
  StatData
} from "../../api/DataTypes";
import { DispatchContext } from "../../App";
import { GraphCard } from "../../components/Cards/GraphCard";
import { AccountEarningsGraphCard } from "../../components/Cards/AccountEarningsGraphCard";
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

  const token: string | null = getToken();

  // State Top stats
  const [topStatsData, setTopStatsData] = useState<TopStatsData>({ top_games: [], top_platforms: [],});
  // State stats and graphs
  const [statsData, setStatsData] = useState<Stat[]>([]);
  const [graphsData, setGraphsData] = useState<Stat[]>([]);
  const [accountData, setAccountData] = useState<Stat[]>([]);

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
      if (acc["data"][curr.label]) {
        acc["data"][curr.label] += parseInt(curr.value);
        acc["counter"][curr.label] += 1;
      } else {
        acc["data"][curr.label] = parseInt(curr.value);
        acc["counter"][curr.label] = 1;
      }
      return acc;

    }, {data: {}, counter: {}});
    
    const s: Stat[] = [];
    Object.entries(stats["data"]).forEach(([key, value]) => {
      // In case we're filtering by more than a single day, then the DAU card
      // in reality is going to be an average of the DAU for each day.
      if (key === "DAU" && filters.date !== "0" /*stats["counter"]["DAU"] > 1*/) {
        let divider = 1.0;
        switch (filters.date) {
          case "1":
            divider = 7.0;
            break;
          
          case "2":
            divider = 14.0;
            break;
          
          case "3":
            divider = 30.0;
            break;
        }

        key = "Average DAU";
        // value = value as number / stats["counter"]["DAU"];
        value = value as number / divider;
      }

      s.push({ label: key, value: value });
    });
    
    return s;
  };

  /**
   * We'll rewrite the labels so that they can be used
   * to be displayed in the cards
   * @param data 
   * @returns 
   */
  const arrangeEarningData = (data: Object): Stat[] => {
    const returnData: Stat[] = [];
    // {yesterday: 3000230000, last_7_days: 26779612880, last_14_days: 26779612880, last_30_days: 26779612880, all_time: 26779612880}
    Object.entries(data).forEach(([key, value]) => {
      let label = key;
      label = label.replace(/_/g, " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);

      returnData.push({ label: label, value: value });
    });
    
    return returnData;
  };

  // Get graphs and stats data.
  useEffect(() => {
    if ( filters.application_id! && filters.date! && filters.platform_id! ) {
      // API.graphs(token, filters).then((data) => { setGraphsData(data!._items as GraphData[]) })
      API.stats(filters, token)
        .then((data) => {
          setStatsData(crunchData(data!._items as StatData[]));
          setGraphsData(data!._items as StatData[]);
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
    API.topStats(token).then((data) => { setTopStatsData(data as TopStatsData) })

    API.accountEarningsStats(token).then((data: any) => {
      setAccountData(arrangeEarningData(data));
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  

  if (!graphsData || !statsData) return <PagePlaceholder />;

  const { top_games, top_platforms } = topStatsData;

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge">{t("analytics.title")}</Header>
      </Grid.Row>

      {/* Account wide earnings */}
      <Grid.Row>
        <Card.Group centered itemsPerRow={5}>
          { accountData.map((item, i) => { return <StatsCard key={i} {...item} isEarning={true} />; })  }
        </Card.Group>
      </Grid.Row>

      <Grid.Row>
        <AccountEarningsGraphCard />
      </Grid.Row>

      {/* Top Games and Platforms */}
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

      {/* Custom reports */}
      <Grid.Row style={{ borderBottom: "1px solid #C4C4C4" }}>
        <Header size="large">{t("analytics.customReports")}</Header>
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
        <Card.Group centered itemsPerRow={5}>
          { statsData.map((item, i) => { return <StatsCard key={i} {...item} />; })  }
        </Card.Group>
      </Grid.Row>

      {/* Graphp card  */}
      { 
        graphsData.length !== 0
        ?
        <Grid.Row>
          { graphsData.length > 0 ? (
            <GraphCard data={graphsData as StatData[]} />
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

    </Grid>
  );
};
