import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
// import { Button, Checkbox, Grid, Header, Image } from "semantic-ui-react";
import { Button, Checkbox, Grid, Header } from "semantic-ui-react";
import { API } from "../../api/API";
// import { AppInfo, Platform, AppPlatform } from "../../api/DataTypes";
import { AppInfo, Platform } from "../../api/DataTypes";
import { DispatchContext } from "../../App";
import { Row, TableCard } from "../../components/Cards/TableCard";
import {
  EditGamePlatformsSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import {
  StatusIndicator,
  StatusDisabled,
} from "../../components/StatusIndicator";
import { PathHelpers } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { getToken } from "../../authentication/Authentication";

// Muestra la fila 
// platformDataToRow: Resive 2 arcuemtneos un Platform y { enabled, onChange, status, }
const platformDataToRow = ( 
  platformData: Platform, 
  { enabled, onChange, status, }: { 
    enabled: boolean; 
    onChange: (platformId: number) => void; 
    status: number; }
  ) => {
    
    console.log(enabled);
    console.log(onChange);
    console.log(status);

    return {
      id: platformData.id,
      cellContents: [
        <Header size="small">
          {/* <Image avatar src={platformData.icon} /> */}
          {platformData.name}
        </Header>,
        platformData.market,
        <StatusIndicator status={status} />,
        <Checkbox onChange={() => onChange(platformData.id)} checked={enabled} />,
      ],
    } as Row;
  };

export const EditGamePlatforms = (props: RouteComponentProps) => {

  const { t } = useTranslation();
  const { state } = useContext(DispatchContext);
  const platforms:Platform[] = state.platforms || [] // Todas las plataformas
  
  // Solo para pruebas
  platforms.map( (p:Platform) => {
      console.log(`Platarorma: ${p}`);
      console.log(p.name);
      // TODO
      return p;
  })
  
  // States
  // Datos de la app/game
  const [gameData, setGameData] = useState<AppInfo | null >( null)
  // Platarormas del juego/app 
  const [gamePlatforms, setGamePlatforms] = useState<number[]>([])
  // Listas de IDs
  // const [gamePlatformIds, setGamePlatformIds] = useState<number[]>([])

  // On checkbox select
  const handlePlatformEnabledChange = (platformId: number) => {
    if (gameData === null) return;
    // if ( gameData.platforms_info!) {
    //   if (gameData.platforms_info.map((p) => p.id).includes(platformId)) {
    //     setGameData({
    //       ...gameData,
    //       platforms_info: gameData.platforms_info.filter((plat) => plat.id !== platformId),
    //     });
    //   } else {
    //     setGameData({
    //       ...gameData,
    //       platforms_info: [...gameData.platforms_info, { id: platformId, status: 0 }],
    //     });
    //   }
    // }
  };


  // Extrae el id (uuid) y obtiene la app
  useEffect( () => {
    const gameID = (props.match.params as { id: string }).id;
    const token = getToken() || '';
    API.app(token, gameID).then( ( app ) => { 
      setGameData( (app as AppInfo ) );
    });
  }, [ props.match.params ]);

    
  // Set gameplatforms y gameplatformIDs
  useEffect( () => {
    if ( gameData! && gameData.platforms_info!) {
      // TODO
      // const status = 1;
      setGamePlatforms(gameData.platforms_info);
      // TODO
      // if ( gamePlatforms !== null && gamePlatforms.length > 0 ) {
      //   const gamePlatformIds = (gamePlatforms as AppPlatform[]).map( (platform) => platform.id );
      //   setGamePlatformIds( gamePlatformIds );
      // }
    }
  },[gameData, gamePlatforms]);

  // Mientras no existan gameData mostrar el spinner
  if ( gameData === null ) { return <PagePlaceholder />;  }

  return (
    <>
      { ( gameData! ) ?
        <Grid style={{ marginTop: "1em" }}>
          <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
            <Header size="huge" style={{ marginBottom: 0 }}>
              {gameData.name} - {t("editGame.platforms.title")}
            </Header>
            <Button
              compact
              positive
              style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
              as={Link}
              to={PathHelpers.EditGameInfo({ id: gameData.id })}
            >
              {t("editGame.nextStep")}
            </Button>
          </Grid.Row>
          <Grid.Row>
            <GameCreationSteps
              steps={EditGamePlatformsSteps}
              gameId={gameData.id!}
            />
          </Grid.Row>
          {/* Plataforms */}
          <Grid.Row>
            <TableCard
              headers={["platform", "market", "status", "enabled"].map((string) =>
                t(`editGame.platforms.table.headers.${string}`)
              )}
              rowContents={ platforms.map( (data) => { 
                return platformDataToRow( data,
                  {
                    enabled: gamePlatforms.includes(data.id),
                    onChange: handlePlatformEnabledChange,
                    status: gamePlatforms.includes(data.id) 
                      ? 1 // TODO
                      : StatusDisabled,
                  }
                )
              }
              )}
            />
          </Grid.Row>
        </Grid>
      :
        null
      }
    </>
  );
};
