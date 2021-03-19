import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Placeholder, Table } from "semantic-ui-react";
import { API } from "../../api/API";
import { Ad, AdType, AppInfo, IAP, IAPType } from "../../api/DataTypes";
import { TableCard } from "../../components/Cards/TableCard";
import {
  EditGameMonetisationSteps,
  GameCreationSteps,
} from "../../components/GameCreationSteps";
import { PathHelpers } from "../../routes";
import { AdRow } from "./AdRow";
import { IAPRow } from "./IAPRow";

export const AdTypeText = {
  [AdType.Interstitial]: "adType.interstitial",
  [AdType.Banner]: "adType.banner",
  [AdType.RewardedVideo]: "adType.rewardedVideo",
};

export const IAPTypeText = {
  [IAPType.Consumable]: "iapType.consumable",
  [IAPType.NonConsumable]: "iapType.nonconsumable",
};

export const EditGameMonetisation = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [adsBeingEdited, setAdsBeingEdited] = useState<number[]>([]);
  const [IAPsBeingEdited, setIAPsBeingEdited] = useState<number[]>([]);
  const [gameData, setGameData] = useState<AppInfo | null>(
    props.location.state ? ((props.location.state as any).app as AppInfo) : null
  );

  const saveGame = () => {
    if (gameData === null) return;

    API.updateApp(gameData.id!, gameData);
  };

  const handleAdChange = (newAd: Ad, index: number) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      ads: gameData.ads.map((ad, i) => (i === index ? newAd : ad)),
    });
  };

  const deleteAd = (index: number) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      ads: gameData.ads.filter((a, i) => i !== index),
    });
  };

  const addNewAd = () => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      ads: [...gameData.ads, { type: 0, kiln_id: "NEW_AD" }],
    });

    enablAdEditing(gameData.ads.length);
  };

  const saveAd = (index: number) => {
    setAdsBeingEdited(adsBeingEdited.filter((number) => number !== index));
    saveGame();
  };
  const enablAdEditing = (index: number) => {
    setAdsBeingEdited([...adsBeingEdited, index]);
  };

  const handleIAPChange = (newIAP: IAP, index: number) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      iap: gameData.iap.map((iap, i) => (i === index ? newIAP : iap)),
    });
  };

  const deleteIAP = (index: number) => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      iap: gameData.iap.filter((a, i) => i !== index),
    });
  };

  const addNewIAP = () => {
    if (gameData === null) return;

    setGameData({
      ...gameData,
      iap: [
        ...gameData.iap,
        { type: 0, kiln_id: "NEW_IAP", price: 1, name: "New item" },
      ],
    });

    enablIAPEditing(gameData.iap.length);
  };

  const saveIAP = (index: number) => {
    setIAPsBeingEdited(IAPsBeingEdited.filter((number) => number !== index));
    saveGame();
  };
  const enablIAPEditing = (index: number) => {
    setIAPsBeingEdited([...IAPsBeingEdited, index]);
  };

  useEffect(() => {
    if (!gameData || !gameData.name) {
      API.app((props.match.params as { id: string }).id).then((app) => {
        setGameData(app);
      });
    }
  }, [gameData, gameData?.name, props.match.params]);

  if (gameData === null) return <Placeholder />;

  const gameAds = gameData.ads;
  const gameIAPs = gameData.iap;

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
          to={PathHelpers.EditGameAnalytics({ id: gameData.id })}
        >
          {t("editGame.nextStep")}
        </Button>
      </Grid.Row>
      <Grid.Row>
        <GameCreationSteps steps={EditGameMonetisationSteps} />
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