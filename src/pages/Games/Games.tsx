import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Icon, Image } from "semantic-ui-react";
import { API } from "../../api/API";
import { AppSummary } from "../../api/DataTypes";
import { Row, TableCard } from "../../components/Cards/TableCard";
import { StatusIndicator } from "../../components/StatusIndicator";
import { PathHelpers, Paths } from "../../routes";

const appDataToRow: (appData: AppSummary, edit: string) => Row = (
  appData: AppSummary,
  edit: string
) => {
  return {
    id: appData.id,
    cellContents: [
      <Header size="small">
        <Image avatar src={appData.icon} />
        {appData.name}
      </Header>,
      appData.id.toString(),
      appData.platforms.map((platformIconUrl, i) => (
        <Image key={i} avatar src={platformIconUrl} />
      )),
      <StatusIndicator status={1} />,
      <Button as={Link} to={PathHelpers.EditGameInfo({ id: appData.id })}>
        {edit}
      </Button>,
    ],
  };
};

export const Games = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [games, setGames] = useState<AppSummary[]>([]);

  useEffect(() => {
    API.games().then((data) => {
      setGames(data);
    });
  }, []);

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {t("games.title")}
          <span style={{ paddingLeft: "0.6em", fontSize: "0.6em" }}>
            ({games.length})
          </span>
        </Header>
        <Button
          compact
          positive
          icon
          labelPosition="left"
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          as={Link}
          to={Paths.NewGame}
        >
          <Icon name="plus" />
          {t("games.addGame")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <TableCard
          headers={["game", "id", "platforms", "status"]
            .map((string) => t(`games.table.headers.${string}`))
            .concat("")}
          rowContents={games.map((appData) =>
            appDataToRow(appData, t("games.table.edit"))
          )}
        />
      </Grid.Row>
    </Grid>
  );
};
