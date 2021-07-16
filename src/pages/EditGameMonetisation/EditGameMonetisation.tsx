import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Table } from "semantic-ui-react";
import { API } from "../../api/API";
import {
  Ad,
  AdStatus,
  AdType,
  APIResponse,
  AppInfo,
  IAP,
  IAPType,
} from "../../api/DataTypes";
import { TableCard } from "../../components/Cards/TableCard";
import {
  EditGameMonetisationSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import { PathHelpers } from "../../routes";
import { PagePlaceholder } from "../../components/Placeholders/PagePlaceholder";
import { AdRow } from "./AdRow";
import { IAPRow } from "./IAPRow";
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

// Componente
export const EditGameMonetisation = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [adsBeingEdited, setAdsBeingEdited] = useState<number[]>([]);
  const [IAPsBeingEdited, setIAPsBeingEdited] = useState<number[]>([]);
  const [gameData, setGameData] = useState<AppInfo | null>( null )
  const [gameID, setGameID] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

  /**
   * 
   * @param newAd 
   * @param index 
   * @returns 
   */
  const handleAdChange = (newAd: Ad, index: number) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      ads: gameData.ads.map((ad: Ad, i:number) => (i === index ? newAd : ad)),
    });
  };

  /**
   * 
   * @returns 
   */
  const addNewAd = () => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      ads: [
        ...gameData.ads,
        { id: null, _etag: null, type: AdType.Banner, kiln_id: "NEW_AD", status: AdStatus.Draft },
      ],
    });

    enablAdEditing( gameData.ads.length);
  };

  /**
   * 
   * @param index 
   * @returns 
   */
  const deleteAd = async (index: number) => {
    if (gameData === null) return;

    const ad = gameData.ads[index];

    const removeAd = () => {
      setGameData({
        ...gameData,
        ads: gameData.ads.filter((a, i) => i !== index),
      });

      removeAdEditing(index);
    };

    // If this is a new, non saved ad
    if (!ad.id) {
      removeAd();
    }
    else {
      const response = await API.deleteAd(token, gameData.id, ad.id!, ad._etag!)

      if (response._status === "OK") {
        removeAd();
      }
      else {
        // Error
        console.log(response);
      }
    }
  };

  /**
   * 
   * @param index 
   * @returns 
   */
  const saveAd = async (index: number) => {
    if (!gameData) return;

    const ad = gameData!.ads.filter((ad: Ad, i: number) => (i === index))[0];

    let response: APIResponse;
    
    if (!ad.id) response = await API.createAd(token, gameData.id, ad);
    else response = await API.updateAd(token, gameData.id, ad, ad._etag!); 

    if (response._status === "OK") {
      gameData.ads[index]._etag = response._etag;
      if (!gameData.ads[index].id && response.id) {
        gameData.ads[index].id = parseInt(response.id);
      }

      setAdsBeingEdited(adsBeingEdited.filter((number) => number !== index));
    }

    return response;
  };
  
  /**
   * 
   * @param index 
   */
  const enablAdEditing = (index: number) => {
    setAdsBeingEdited([...adsBeingEdited, index]);
  };

  /**
   * 
   * @param index 
   */
  const removeAdEditing = (index: number) => {
    setAdsBeingEdited(
      adsBeingEdited.filter((number) => number !== index).map((n) => {
        if (n > index) return n - 1;

        return n;
      })
    );
  };

  /**
   * 
   * @param newIAP 
   * @param index 
   * @returns 
   */
  const handleIAPChange = (newIAP: IAP, index: number) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      iaps: gameData.iaps.map((iap, i) => (i === index ? newIAP : iap)),
    });
  };

  /**
   * 
   * @returns 
   */
  const addNewIAP = () => {
    if (!gameData) return;

    setGameData({
      ...gameData,
      iaps: [
        ...gameData.iaps,
        { id: null, type: 0, kiln_id: "NEW_IAP", price: 1, name: "New item", _etag: null },
      ],
    });

    enablIAPEditing( gameData.iaps.length);
  };
  
  /**
   * 
   * @param index 
   * @returns 
   */
  const deleteIAP = async (index: number) => {
    if (!gameData) return;

    const iap = gameData.iaps[index];

    const removeIap = () => {
      setGameData({
        ...gameData,
        iaps: gameData.iaps.filter((a, i) => i !== index),
      });

      removeIAPEditing(index);
    }

    // If this is a non saved IAP
    if (!iap.id) {
      removeIap();
    }
    else {
      const response = await API.deleteIAP(token, gameData.id, iap.id!, iap._etag!)

      if (response._status === "OK") {
        removeIap();
      }
      else {
        // Error
        console.log(response);
      }
    }
  };

  /**
   * 
   * @param index 
   * @returns 
   */
  const saveIAP = async (index: number) => {
    if (!gameData) return;

    const iap = gameData!.iaps.filter((iap: IAP, i: number) => (i === index))[0];

    let response: APIResponse;
    
    if (!iap.id) response = await API.createIAP(token, gameData.id, iap);
    else response = await API.updateIAP(token, gameData.id, iap, iap._etag!); 

    if (response._status === "OK") {
      gameData.iaps[index]._etag = response._etag;
      if (!gameData.iaps[index].id && response.id) {
        gameData.iaps[index].id = parseInt(response.id);
      }

      setIAPsBeingEdited(IAPsBeingEdited.filter((number) => number !== index));
    }
    
    return response;
  };
  
  /**
   * 
   * @param index 
   */
  const enablIAPEditing = (index: number) => {
    setIAPsBeingEdited([...IAPsBeingEdited, index]);
  };

  /**
   * 
   * @param index 
   */
  const removeIAPEditing = (index: number) => {
    setAdsBeingEdited(
      IAPsBeingEdited.filter((number) => number !== index).map((n) => {
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
        setGameData( (app as AppInfo ) );
      })
    }
  },[token, gameID])

  if (gameData === null) return <PagePlaceholder />;

  const gameAds = gameData.ads || [];
  const gameIAPs = gameData.iaps || [];

  return (
    <Grid style={{ marginTop: "1em" }}>
      <Grid.Row style={{ borderBottom: "2px solid #C4C4C4" }}>
        <Header size="huge" style={{ marginBottom: 0 }}>
          {gameData.name} - {t("editGame.monetisation.title")}
        </Header>
        <Button
          compact
          positive
          style={{ marginBottom: 0, marginLeft: "auto", padding: "0.5em" }}
          as={Link}
          to={PathHelpers.EditGameLeaderboards({ id: gameData.id })}
        >
          {t("editGame.nextStep")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <GameCreationSteps
          steps={EditGameMonetisationSteps}
          gameId={gameData.id!}
        />
      </Grid.Row>
      <Grid.Row>
        <TableCard
          headers={["type", "id", "status", "actions"].map((string) =>
            t(`editGame.monetisation.adTable.headers.${string}`)
          )}
        >
          {gameAds.map((adData, i) => (
            <AdRow
              key={i}
              index={i}
              ad={adData}
              editing={adsBeingEdited.includes(i)}
              onChange={handleAdChange}
              onDelete={deleteAd}
              enableEditing={enablAdEditing}
              onSave={saveAd}
            />
          ))}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                icon="plus"
                labelPosition="left"
                positive
                content={t("editGame.monetisation.adTable.new")}
                onClick={addNewAd}
              />
            </Table.Cell>
          </Table.Row>
        </TableCard>
      </Grid.Row>
      <Grid.Row>
        <TableCard
          headers={[
            "itemName",
            "id",
            "type",
            "price",
            "status",
            "actions",
          ].map((string) =>
            t(`editGame.monetisation.iapTable.headers.${string}`)
          )}
        >
          {gameIAPs.map((iapData, i) => (
            <IAPRow
              key={i}
              index={i}
              iap={iapData}
              editing={IAPsBeingEdited.includes(i)}
              onChange={handleIAPChange}
              onDelete={deleteIAP}
              enableEditing={enablIAPEditing}
              onSave={saveIAP}
            />
          ))}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                icon="plus"
                labelPosition="left"
                positive
                content={t("editGame.monetisation.iapTable.new")}
                onClick={addNewIAP}
              />
            </Table.Cell>
          </Table.Row>
        </TableCard>
      </Grid.Row>
    </Grid>
  );
};
