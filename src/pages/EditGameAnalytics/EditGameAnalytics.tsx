import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Table } from "semantic-ui-react";
import { API } from "../../api/API";
import { APIResponse, AppInfo, Event } from "../../api/DataTypes";
import { TableCard } from "../../components/Cards/TableCard";
import {
  EditGameAnalyticsSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import { PathHelpers } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { EventRow } from "./EventRow";
import { getToken } from "../../authentication/Authentication";

export const EditGameAnalytics = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [eventsBeingEdited, setEventsBeingEdited] = useState<number[]>([]);
  const [gameData, setGameData] = useState<AppInfo | null>( null )
  const [gameID, setGameID] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

  /**
   * 
   * @param events 
   * @returns 
   */
  const setEvents = (events: Event[]) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      events,
    });
  };

  /**
   * 
   * @param newEvent 
   * @param index 
   * @returns 
   */
  const handleEventChange = (newEvent: Event, index: number) => {
    if (gameData === null) return;

    setEvents(
      gameData.events.map((event, i) => (i === index ? newEvent : event))
    );
  };

  /**
   * 
   * @param index 
   * @returns 
   */
   const deleteEvent = async (index: number) => {
    if (gameData === null) return;

    const event = gameData.events[index];

    const removeEvent = () => {
      setGameData({
        ...gameData,
        events: gameData.events.filter((a, i) => i !== index),
      });

      removeEventEditing(index);
    };

    // If this is a new, non saved ad
    if (!event.id) {
      removeEvent();
    }
    else {
      const response = await API.deleteEvent(token, gameData.id, event.id!, event._etag!)

      if (response._status === "OK") {
        removeEvent();
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
  const addNewEvent = () => {
    if (gameData === null) return;

    setEvents([...gameData.events, { id: null, kiln_id: "NEW_EVENT", _etag: null }]);

    enableEventEditing(gameData.events.length);
  };

  /**
   * 
   * @param index 
   * @returns 
   */
  const saveEvent = async (index: number) => {
    if (!gameData) return;

    const event = gameData!.events.filter((event: Event, i: number) => (i === index))[0];

    let response: APIResponse;
    
    if (!event.id) response = await API.createEvent(token, gameData.id, event);
    else response = await API.updateEvent(token, gameData.id, event, event._etag!); 

    if (response._status === "OK") {
      gameData.events[index]._etag = response._etag;
      if (!gameData.events[index].id && response.id) {
        gameData.events[index].id = parseInt(response.id);
      }

      setEventsBeingEdited(eventsBeingEdited.filter((number) => number !== index));
    }

    return response;
  };
  
  /**
   * 
   * @param index 
   */
  const enableEventEditing = (index: number) => {
    setEventsBeingEdited([...eventsBeingEdited, index]);
  };

  /**
   * 
   * @param index 
   */
   const removeEventEditing = (index: number) => {
    setEventsBeingEdited(
      eventsBeingEdited.filter((number) => number !== index).map((n) => {
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
        
        // TODO
        // const appEvent = {
        //   ...app,
        //   events: [] 
        // }
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
          to={PathHelpers.EditGameReleases({ id: gameData.id })}
        >
          {t("editGame.nextStep")}
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
              enableEditing={enableEventEditing}
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
