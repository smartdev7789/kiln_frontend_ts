import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Grid, Header, Table } from "semantic-ui-react";
import { API } from "../../api/API";
import {
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
import { IAPRow } from "./IAPRow";
import { getToken } from "../../authentication/Authentication";

export const IAPTypeText = {
  [IAPType.Consumable]: "iapType.consumable",
  [IAPType.NonConsumable]: "iapType.nonconsumable",
};

// Componente
export const EditGameMonetisation = (props: RouteComponentProps) => {
  const { t } = useTranslation();

  const [IAPsBeingEdited, setIAPsBeingEdited] = useState<number[]>([]);
  const [gameData, setGameData] = useState<AppInfo | null>( null )
  const [gameID, setGameID] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

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
    setIAPsBeingEdited(
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
