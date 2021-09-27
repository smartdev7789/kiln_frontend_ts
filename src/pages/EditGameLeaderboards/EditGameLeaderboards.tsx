import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Table } from "semantic-ui-react";
import { API } from "../../api/API";
import { APIResponse, AppInfo, Leaderboard, LeaderboardOrder } from "../../api/DataTypes";
import { TableCard } from "../../components/Cards/TableCard";
import { EditGameLeaderboardsSteps, GameCreationSteps } from "../../components/GameCreationSteps";
import { PathHelpers } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { LeaderboardRow } from "./LeaderboardRow";
import { getToken } from "../../authentication/Authentication";

export const LeaderboardOrderText = {
  [LeaderboardOrder.Ascending]: "leaderboardOrder.ascending",
  [LeaderboardOrder.Descending]: "leaderboardOrder.descending",
};

export const EditGameLeaderboards = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [leaderboardsBeingEdited, setLeaderboardsBeingEdited] = useState<number[]>([]);
  const [gameData, setGameData] = useState<AppInfo | null>( null )
  const [gameID, setGameID] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

  /**
   * 
   * @param events 
   * @returns 
   */
  const setLeaderboards = (leaderboards: Leaderboard[]) => {
    if (gameData === null) return;
    
    setGameData({
      ...gameData,
      leaderboards,
    });
  };

  /**
   * 
   * @param newEvent 
   * @param index 
   * @returns 
   */
  const handleLeaderboardChange = (newLeaderboard: Leaderboard, index: number) => {
    if (gameData === null) return;
    
    setLeaderboards(
      gameData.leaderboards.map((l, i) => (i === index ? newLeaderboard : l))
    );
  };

  /**
   * 
   * @param index 
   * @returns 
   */
   const deleteLeaderboard = async (index: number) => {
    if (gameData === null) return;

    const leaderboard = gameData.leaderboards[index];

    const removeLeaderboard = () => {
      setGameData({
        ...gameData,
        leaderboards: gameData.leaderboards.filter((a, i) => i !== index),
      });

      removeLeaderboardEditing(index);
    };

    // If this is a new, non saved ad
    if (!leaderboard.id) {
      removeLeaderboard();
    }
    else {
      const response = await API.deleteLeaderboard(token, gameData.id, leaderboard.id!, leaderboard._etag!)

      if (response._status === "OK") {
        removeLeaderboard();
      }
      else {
        // Error
        console.log(response);
      }
    }
   };

  /**
   * 
   * @returns 
   */
  const addNewLeaderboard = () => {
    if (gameData === null) return;

    setLeaderboards([...gameData.leaderboards, { id: null, kiln_id: "NEW_LEADERBOARD", order: 0, _etag: null }]);

    enableLeaderboardEditing(gameData.leaderboards.length);
  };

  /**
   * 
   * @param index 
   * @returns 
   */
  const saveLeaderboard = async (index: number) => {
    if (!gameData) return;

    const leaderboard = gameData!.leaderboards.filter((l: Leaderboard, i: number) => (i === index))[0];

    let response: APIResponse;
    
    if (!leaderboard.id) response = await API.createLeaderboard(token, gameData.id, leaderboard);
    else response = await API.updateLeaderboard(token, gameData.id, leaderboard, leaderboard._etag!); 

    if (response._status === "OK") {
      gameData.leaderboards[index]._etag = response._etag;
      if (!gameData.leaderboards[index].id && response.id) {
        gameData.leaderboards[index].id = parseInt(response.id);
      }

      setLeaderboardsBeingEdited(leaderboardsBeingEdited.filter((number) => number !== index));
    }

    return response;
  };
  
  /**
   * 
   * @param index 
   */
  const enableLeaderboardEditing = (index: number) => {
    setLeaderboardsBeingEdited([...leaderboardsBeingEdited, index]);
  };

  /**
   * 
   * @param index 
   */
   const removeLeaderboardEditing = (index: number) => {
    setLeaderboardsBeingEdited(
      leaderboardsBeingEdited.filter((number) => number !== index).map((n) => {
        if (n > index) return n - 1;

        return n;
      })
    );
  };

  // obtiene el ID de la app y setea el token
  useEffect( () => {
    if ( props.match.params! ) {
      setGameID( (props.match.params as { id: string }).id );
      const t = getToken();
      if ( t! ) {
        setToken(t);
      }
    }
  }, [ props.match.params ]);
  
  // Obtiene y setea gameData.
  useEffect(() => {
    if ( token! && gameID! ){
      API.app( token, gameID ).then( ( app ) => {         
        setGameData(app as AppInfo);
      })
    }
  },[token, gameID])

  if (gameData === null) return <PagePlaceholder />;

  const gameLeaderboards = gameData.leaderboards;

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {gameData.name} - {t("editGame.analytics.title")}
        </Header>
        <Button
          compact
          positive
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          as={Link}
          to={PathHelpers.EditGameReleases({ id: gameData.id })}
        >
          {t("editGame.nextStep")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <GameCreationSteps
          steps={EditGameLeaderboardsSteps}
          gameId={gameData.id!}
        />
      </Grid.Row>
      <Grid.Row>
        <TableCard
          headers={["id", "order", "actions"].map((string) =>
            t(`editGame.leaderboards.leaderboardTable.headers.${string}`)
          )}
        >
          {gameLeaderboards.map((leaderboardData, i) => (
            <LeaderboardRow
              key={i}
              index={i}
              leaderboard={leaderboardData}
              editing={leaderboardsBeingEdited.includes(i)}
              onChange={handleLeaderboardChange}
              onDelete={deleteLeaderboard}
              enableEditing={enableLeaderboardEditing}
              onSave={saveLeaderboard}
            />
          ))}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                icon="plus"
                labelPosition="left"
                positive
                content={t("editGame.leaderboards.leaderboardTable.new")}
                onClick={addNewLeaderboard}
              />
            </Table.Cell>
          </Table.Row>
        </TableCard>
      </Grid.Row>
    </Grid>
  );
};
