import React, { Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Accordion, Icon, Label } from "semantic-ui-react";
import { API } from "../../api/API";
import { AppInfo, Platform, PlatformInfo, TeamPlatform } from "../../api/DataTypes";
import { DispatchContext } from "../../App";
import {
  EditGamePlatformsSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import { PathHelpers, Paths } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { getToken } from "../../authentication/Authentication";

// Platforms
// Huawei
import { HuaweiForm } from "../../platforms/HuaweiForm";
import { DefaultForm } from "../../platforms/Default";


// Defino algunos estilos
const styles = {
  accordion: {
    div: { width: '100%' },
    title: {
      fontSize: '1.2rem',
      color: '#7a7a7a',
      icon: {
        position: 'absolute',
        right: '0',
      },
    },

  } 
}

/**
 * Renders the form
 * @param appID 
 * @param platformID 
 * @param platformsInfo 
 * @returns 
 */
const PlatformForm = (appID: string, platformID: number, platformsInfo: PlatformInfo[] | null) => {
  switch (platformID) {
    case 1:
      // Huawei

      // Get just platforminfo for this platform
      const onePlatformInfo = platformsInfo?.filter((element) => {
        return element.platform === 1 ? element.id : null
      })
      let platformInfoID
      if ( onePlatformInfo!.length >= 1 ) {
        platformInfoID = onePlatformInfo![0].platform === 1 ? onePlatformInfo![0].id : null
      } else {
        platformInfoID = null
      }

      return <HuaweiForm appID={ appID } platformInfoID={ platformInfoID } />
    default:
      return <DefaultForm/>
  }
}


export const EditGamePlatforms = (props: RouteComponentProps) => {
  const { t } = useTranslation();
  const { state } = useContext(DispatchContext);
  const [token] = useState(getToken())
  const [activeIndex, setActiveIndex] = useState(0)
  const [connectedPlatforms, setConnectedPlatforms] = useState<Platform[]>([]);
  
  // States
  // Datos de la app/game
  const [gameData, setGameData] = useState<AppInfo | null >( null)
  // Platarormas del juego/app 
  // const [gamePlatforms, setGamePlatforms] = useState<number[]>([])

  const handleClick = (index:number) => {
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex( newIndex )
  }
  
  // Extrae el id (uuid) y obtiene la app
  useEffect( () => {
    const gameID = (props.match.params as { id: string }).id;   
    API.app(token, gameID).then( ( app ) => { 
      setGameData( (app as AppInfo ) );
    });
  }, [ props.match.params, token ])

  // Set gameplatforms y gameplatformIDs
  useEffect( () => {
    if ( gameData! && gameData.platforms_info!) {
      // TODO - Obtener los datos de las plataformas del juego / Si es que no viene tedo junto.
      // setGamePlatforms(gameData.platforms_info)
    }
  }, [gameData]);
  
  // We'll set which platforms are connected to the team
  useEffect(() => {
    if (!token || !state.account || !state.platforms) return;
      
    API.getTeamPlatforms(token, state.account!.team_id).then(response => {
      if (response._items) {
        const connectedIds = (response._items as TeamPlatform[]).map(x => x.platform);
        setConnectedPlatforms(state.platforms!.filter(p => connectedIds.includes(p.id) ));
      }
    });
  }, [token, state.account, state.platforms]);

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
              to={PathHelpers.EditGameMonetisation({ id: gameData.id })}
            >
              {t("editGame.nextStep")}
            </Button>
          </Grid.Row>
          
          {/* Steps */}
          <Grid.Row>
            <GameCreationSteps
              steps={EditGamePlatformsSteps}
              gameId={gameData.id!}
            />
          </Grid.Row>

          {/* Platforms accordion */}
          <Grid.Row>
            { connectedPlatforms.length > 0 ?
              <Accordion styled style={ styles.accordion.div } >
                { connectedPlatforms.map( (platform) => {
                  
                  return (
                    <Fragment key={platform.id}>
                      <Accordion.Title
                        style={ styles.accordion.title }
                        active= { activeIndex === platform.id }
                        index={ platform.id }
                        onClick={ () => { handleClick(platform.id) } }
                      >
                        {platform.name}
                        <Icon name='dropdown' style={ styles.accordion.title.icon }/>
                      </Accordion.Title>

                      <Accordion.Content active={ activeIndex === platform.id }>
                        { PlatformForm( gameData.id, platform.id, gameData.platforms_info ) }
                      </Accordion.Content>
                    </Fragment>
                  )  
                })}
              </Accordion>
              :
              <Label
                as={Link}
                to={Paths.Platforms}
                size="huge"
                style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }}
              >
                {t("editGame.platforms.noPlatforms")}
              </Label>
            }

          </Grid.Row>

        </Grid>
      :
        null
      }
    </>
  )
}
