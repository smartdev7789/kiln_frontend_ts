import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Table } from "semantic-ui-react";
import { API } from "../../api/API";
import { AdType, AppInfo, Event, IAPType } from "../../api/DataTypes";
import { TableCard } from "../../components/Cards/TableCard";
import {
  EditGameAnalyticsSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import { Paths } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { EventRow } from "./EventRow";
import { getToken } from "../../authentication/Authentication";

export const AdTypeText = {
  [AdType.Interstitial]: "adType.interstitial",
  [AdType.Banner]: "adType.banner",
  [AdType.RewardedVideo]: "adType.rewardedVideo",
};

export const IAPTypeText = {
  [IAPType.Consumable]: "iapType.consumable",
  [IAPType.NonConsumable]: "iapType.nonconsumable",
};

export const EditGameAnalytics = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [eventsBeingEdited, setEventsBeingEdited] = useState<number[]>([]);
  const [gameData, setGameData] = useState<AppInfo | null>( null )
  const [gameID, setGameID] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

  const saveGame = () => {
    if (gameData === null) return;
    API.updateApp(token, gameData.id!, gameData, gameData._etag);
  };

  const setEvents = (events: Event[]) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      events,
    });
  };

  const handleEventChange = (newEvent: Event, index: number) => {
    if (gameData === null) return;

    setEvents(
      gameData.events.map((event, i) => (i === index ? newEvent : event))
    );
  };

  const deleteEvent = (index: number) => {
    if (gameData === null) return;

    setEvents(gameData.events.filter((e, i) => i !== index));
  };

  const addNewEvent = () => {
    if (gameData === null) return;

    setEvents([...gameData.events, { kiln_id: "NEW_EVENT" }]);

    // enablEventEditing(gameData.events.length);
  };

  const saveEvent = (index: number) => {
    setEventsBeingEdited(
      eventsBeingEdited.filter((number) => number !== index)
    );
    saveGame();
  };
  const enablEventEditing = (index: number) => {
    setEventsBeingEdited([...eventsBeingEdited, index]);
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
        setGameData( (app as AppInfo ) );
      })
    }
  },[token, gameID])

  if (gameData === null) return <PagePlaceholder />;

  const gameEvents = gameData.events;

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
          to={Paths.Games}
        >
          {t("editGame.end")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <GameCreationSteps
          steps={EditGameAnalyticsSteps}
          gameId={gameData.id!}
        />
      </Grid.Row>
      <Grid.Row>
        <TableCard
          headers={["id", "actions"].map((string) =>
            t(`editGame.analytics.eventTable.headers.${string}`)
          )}
        >
          {gameEvents.map((eventData, i) => (
            <EventRow
              key={i}
              index={i}
              event={eventData}
              editing={eventsBeingEdited.includes(i)}
              onChange={handleEventChange}
              onDelete={deleteEvent}
              enableEditing={enablEventEditing}
              onSave={saveEvent}
            />
          ))}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                icon="plus"
                labelPosition="left"
                positive
                content={t("editGame.analytics.eventTable.new")}
                onClick={addNewEvent}
              />
            </Table.Cell>
          </Table.Row>
        </TableCard>
      </Grid.Row>
    </Grid>
  );
};
