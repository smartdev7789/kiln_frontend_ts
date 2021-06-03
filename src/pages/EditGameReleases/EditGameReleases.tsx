import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Header } from "semantic-ui-react";
import {
    EditGameReleasesSteps,
    GameCreationSteps,
  } from "../../components/GameCreationSteps";
import { Paths } from "../../routes";
import { Link, RouteComponentProps } from "react-router-dom";
import { API } from "../../api/API";
import { getToken } from "../../authentication/Authentication";
import { AppInfo } from "../../api/DataTypes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";


export const EditGameReleases = (props: RouteComponentProps) => {
    const { t } = useTranslation();
    const [gameData, setGameData] = useState<AppInfo | null>( null )
    const [gameID, setGameID] = useState<string | null>(null);
    const [token, setToken] = useState<string>('');

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

    return (
        <Grid style={{ marginTop: "1em" }}>
        <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
          <Header size="huge" style={{ marginBottom: 0 }}>
            {gameData.name} - {t("editGame.releases.title")}
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
            steps={EditGameReleasesSteps}
            gameId={gameData.id!}
          />
        </Grid.Row>
        
        </Grid>

    )
}