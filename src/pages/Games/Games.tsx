import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Icon } from "semantic-ui-react";
import { API } from "../../api/API";
import { AppSummary } from "../../api/DataTypes";
import { TableCard } from "../../components/Cards/TableCard";
import { getToken } from "../../authentication/Authentication";
import { Paths } from "../../routes";
// import { Game } from "../../components/Game/Game";
import { appDataToRow } from "../../components/Game/AppDataToRow"


export const Games = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [games, setGames] = useState<AppSummary[] | null >([]);
  const [totalGames, setTotalGames] = useState<number>(0);
  const token = getToken();

  useEffect(() => {
    API.apps(token).then(
      (data) => {
        setTotalGames(data._meta.total)
        setGames(data._items);
      }
    );
  }, [token]);

  const tableHeaders = [ "game", "platforms", "type", "default_language", "status", "actions", "releases" ];

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        
        <Header size="huge" style={{ marginBottom: 0 }}>
            {t("games.title")}
            <span style={{ paddingLeft: "0.6em", fontSize: "0.6em" }}>({totalGames})</span>
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
        {
          Array.isArray(games) ?
            <TableCard
              headers = { tableHeaders.map( (string) => t( `games.table.headers.${string}` ) ) }
              rowContents={ games.map( 
                ( appData ) => appDataToRow( appData, t("games.table.edit" ), t("games.table.addRelease") ) ) 
              }
            />
          : null
        }
      </Grid.Row>

    </Grid>
  );
};
