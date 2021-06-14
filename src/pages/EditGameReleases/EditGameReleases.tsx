import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Accordion, Button, Grid, Header, Icon } from "semantic-ui-react";
import {
    EditGameReleasesSteps,
    GameCreationSteps,
  } from "../../components/GameCreationSteps";
import { Paths } from "../../routes";
import { Link, RouteComponentProps } from "react-router-dom";
import { API } from "../../api/API";
import { getToken } from "../../authentication/Authentication";
import { AppInfo, Release } from "../../api/DataTypes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { ReleaseForm } from "./ReleaseForm";

// Styles for accordion
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

export const EditGameReleases = (props: RouteComponentProps) => {
  const { t } = useTranslation();
  const [gameData, setGameData] = useState<AppInfo | null>( null )
  const [gameID, setGameID] = useState<string | null>( null );
  const [token, setToken] = useState<string>('');

  const [releases, setReleases] = useState<Release[] >( [] );
  const [drafting, setDrafting] = useState<boolean>( false );

  const [activeIndex, setActiveIndex] = useState(0)
  
  const handleClick = (index: number) => {
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex( newIndex )
  }

  const addNewRelease = () => {
    if (gameData === null) return;

    // We'll only allow to be editing one new release at a time
    if (drafting) return;
    
    setDrafting(true);
    
    let r: Release[] = [
      {
        application_id: gameData.id,
        regions: [],
        builds: [],
        package: {content_type: "", file: ""},
        id: 0,
        name: "New Draft",
        changelog: "",
        _etag: ""
      },
      ...releases
    ]
    setReleases(r);

    setActiveIndex(0);
  };

  const onSubmit = (release: Release, index: number, file?: File) => {
    if (releases[index].id === 0) return createRelease(release, index, file)
    else return updateRelease(release, index, file);
  };
  
  const createRelease = async (newRelease: Release, index: number, file?: File) => {
    if (gameData === null) return; 

    const response = await API.createAppRelease(token, gameData.id, newRelease, file);

    if (response._status === "OK") {
      newRelease.id = parseInt(response.id!);
      newRelease._etag = response._etag;
      
      // TODO: Do we need actual data on the upload ?
      if (file) newRelease.package = { file: "true", content_type: "" };

      setReleases(releases.map((r: Release, i: number) => (i === index ? newRelease : r)));

      setDrafting(false);
    }

    return response;
  }
  
  const updateRelease = async (release: Release, index: number, file?: File) => {
    if (gameData === null) return;

    release.id = releases[index].id;

    let key: keyof Release;
    let apiRelease = releases[index] as Release;
    for (key in release) {
      if (key in apiRelease) {
        //@ts-ignore
        apiRelease[key] = release[key];
      }
    }
    
    const response = await API.updateAppRelease(token, gameData.id, release, releases[index]._etag, file);

    if (response._status === "OK") {
      apiRelease._etag = response._etag;

      // TODO: Do we need actual data on the upload ?
      if (file) apiRelease.package = { file: "true", content_type: "" };
      
      setReleases(releases.map((r: Release, i: number) => (i === index ? apiRelease : r)));
    }

    return response;
  };

  const deleteRelease = async (index: number) => {
    if (gameData === null) return;

    if (window.confirm(t("editGame.releases.form.deleteMessage"))) {
      const response = await API.deleteAppRelease(token, gameData.id, releases[index], releases[index]._etag);
      
      if (response._status === "OK") {
        setReleases(releases.filter((r: Release, i: number) => (i !== index)));
      }
    }
  };  

  // Get the app id and set the access token
  useEffect( () => {
    if ( props.match.params! ) {
      setGameID( (props.match.params as { id: string }).id );
      const t = getToken();
      if ( t! ) {
        setToken(t);
      }
    }
  }, [ props.match.params ]);

  // Grab gameData
  useEffect(() => {
    if ( token! && gameID! ){
      API.app(token, gameID).then((app) => {
        setGameData( (app as AppInfo ) );
      })
    }
  }, [token, gameID])
  
  // Grab the releases
  useEffect(() => {
    if (gameData) {
      API.getAppReleases(token, gameID!).then((response) => {
        if(response !== undefined) setReleases(response._items as Release[]);
      })
    }
  }, [gameData, token, gameID]);

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

      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Button
          compact
          positive
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          onClick={addNewRelease}
          disabled={drafting}
        >
          {t("editGame.releases.new")}
        </Button>
      </Grid.Row>

      <Grid.Row>
        
        <Accordion styled style={styles.accordion.div} >
        
          {releases.map((release, index) => {
            return (

              <Fragment key={release.id}>
                <Accordion.Title
                  style={styles.accordion.title}
                  active={activeIndex === release.id}
                  onClick={ () => { handleClick(release.id) } }
                >
                  {release.name}
                  <Icon name='dropdown' style={ styles.accordion.title.icon }/>
                </Accordion.Title>

                <Accordion.Content active={activeIndex === release.id}>

                  <ReleaseForm index={index} release={release} onSubmit={onSubmit} onDelete={deleteRelease} />

                </Accordion.Content>
              </Fragment>

            )
          
          })}
        </Accordion>

      </Grid.Row>
      
    </Grid>

  )
}