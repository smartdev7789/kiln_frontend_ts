import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Accordion, Button, Grid, Header, Icon } from "semantic-ui-react";
import { API } from "../../api/API";
import { Ad, APIResponse, AppInfo, AppService, Service, ServiceCategory } from "../../api/DataTypes";
import { AdsService } from "../../components/Services/AdsService";
import { EditGameServicesSteps, GameCreationSteps, } from "../../components/GameCreationSteps";
import { PathHelpers } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { getToken } from "../../authentication/Authentication";

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

// Component
export const EditGameServices = (props: RouteComponentProps) => {
  const { t } = useTranslation();
  const [gameData, setGameData] = useState<AppInfo | null>(null)
  const [gameID, setGameID] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1)
  const [token, setToken] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [appServices, setAppServices] = useState<AppService[]>([]);

  /**
   * 
   * @param type 
   * @param data 
   * @returns 
   */
  const ServiceForm = (type: string, serviceProviders: Service[], selectedProvider: number | undefined, data: Ad[]) => {
    
    /**
     * 
     * @param service_id 
     * @param extras 
     */
    const saveService = async (service_id: number, extras: string): Promise<boolean> => {
      const service_category = services.find(service => service.id === service_id)?.category;

      // TODO: Throw error if service_category is undefined
      if (service_category === undefined) return false;

      let service = appServices.filter(service => service.category === service_category)[0];

      let response: APIResponse;

      if (service === undefined) response = await API.createAppService(token, gameData!.id, service_id, service_category, extras);
      else response = await API.updateAppService(token, gameData!.id,
        { ...service, service: service_id, extras: extras },
        service._etag
      );

      if (response._status === 'OK') {
        const index = appServices.findIndex(s => service.id === s.id);
        if (index === -1) {
          setAppServices([
            ...appServices,
            {
              id: parseInt(response.id!),
              application: gameData!.id,
              service: service_id,
              category: service_category,
              extras: extras,
              _etag: response._etag,
            }
          ]);
        }
        else {
          setAppServices(
            appServices.map((service, i) => i === index ? { ...service, service: service_id, extras: extras, _etag: response._etag } : service)
          );
        }

        return true;
      }
      
      return false;
    };

    /**
     * 
     */
    const deleteService = async (service_id: number): Promise<boolean> => {
      const service_category = services.find(service => service.id === service_id)?.category;

      // TODO: Throw error if service_category is undefined
      if (service_category === undefined) return false;

      let service = appServices.filter(service => service.category === service_category)[0];

      if (service !== undefined) {
        const response = await API.deleteAppService(token, gameData!.id, service.id, service._etag);
        
        if (response._status === 'OK') {
          setAppServices(appServices.filter(s => service.id !== s.id));
          return true;
        }
      }

      return true;
    };

    switch (type) {
      case "Ads":
        return (
          <AdsService
            serviceProviders={serviceProviders}
            provider={selectedProvider}
            ads={data}
            onDelete={deleteService}
            onSave={saveService}
          />
        );
        
      case "Attribution":
      case "Analytics":
      default:
        return null;
    }
  }
  
  /**
   * Handles accordeon clicking
   * @param index 
   */
  const handleClick = (index: number) => {
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex( newIndex )
  }

  // Gets app id and sets the auth token
  useEffect( () => {
    if ( props.match.params! ) {
      setGameID( (props.match.params as { id: string }).id );
      const t = getToken();
      if ( t! ) {
        setToken(t);
      }
    }
  }, [ props.match.params ]);
  
  // Gets gameData
  useEffect(() => {
    if (token! && gameID!) {
      API.app(token, gameID).then((app) => {
        setGameData((app as AppInfo));

        // Get the app services
        API.getAppServices(token, app.id!).then((services) => {
          setAppServices(services._items as AppService[]);
        });
      });

      // Get supported service
      API.getSupportedServices(token).then((r) => {
        setServices(r._items as Service[]);
      })
    }
  }, [token, gameID])

  if (gameData === null) return <PagePlaceholder />;

  const servicesTypes: string[] = [];
  ["Ads", "Attribution", "Analytics", "Attribution"].forEach((type) => {
    if (services.filter(service => service.category === (ServiceCategory as any)[type.toUpperCase()]).length > 0) {
      servicesTypes.push(type);
    }
  });


  let adsData: AppService | { service: undefined, extras: string | undefined, _etag: string | undefined };
  
  adsData = appServices.filter(service => service.category === ServiceCategory.ADS)[0];

  if(adsData === undefined) adsData = {
    service: undefined,
    extras: undefined,
    _etag: undefined,
  };

  return (
    <Grid style={{ marginTop: "1em" }}>

      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {gameData.name} - {t("editGame.services.title")}
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
          steps={EditGameServicesSteps}
          gameId={gameData.id!}
        />
      </Grid.Row>

      {/* Services Types */}
      <Grid.Row>
  
        <Accordion styled style={styles.accordion.div} >
          {servicesTypes.map((service, i) => {
            
            return (
              <Fragment key={i}>
                <Accordion.Title
                  style={styles.accordion.title}
                  active={activeIndex === i}
                  index={i}
                  onClick={() => { handleClick(i) }}
                >
                  {service}
                  <Icon name='dropdown' style={styles.accordion.title.icon} />
                </Accordion.Title>

                <Accordion.Content active={activeIndex === i}>
                  {ServiceForm(
                    service,
                    services.filter((v) => { return v.category === ServiceCategory.ADS }),
                    adsData.service,
                    adsData.extras ? JSON.parse(adsData.extras) : [])}
                </Accordion.Content>
              </Fragment>
            )
          })}
        </Accordion>
  
      </Grid.Row>

    </Grid>
  );
};
