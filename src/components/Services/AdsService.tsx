import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownItemProps, DropdownProps, Grid, Label, Table } from "semantic-ui-react";
import { TableCard } from "../Cards/TableCard";
import { useTranslation } from "react-i18next";
import { Ad, AdStatus, AdType, Service } from "../../api/DataTypes";
import { AdRow } from "./AdRow";
import { Link } from "react-router-dom";

export interface AdsServiceProps {
  serviceProviders: Service[],
  provider: number | undefined;
  ads: Ad[];
  onSave: (service_id: number, extras: string) => Promise<boolean>;
  onDelete: (service_id: number) => Promise<boolean>;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export const AdsService = ({ serviceProviders, provider, ads, onSave, onDelete }: AdsServiceProps) => {
  const { t } = useTranslation();
  const [adsBeingEdited, setAdsBeingEdited] = useState<number[]>([]);
  const [gameAds, setGameAds] = useState<Ad[]>([])
  const [selectedProvider, setSelectedProvider] = useState<number | undefined>();
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [duplicateAdsIndexes, setDuplicateAdsIndexes] = useState<number[]>([]);

  const adsModules: DropdownItemProps[] = [];
  serviceProviders.forEach((e) => {
    adsModules.push({
      key: e.name.replace(" ", ""), text: e.name, value: e.id
    })
  })
  
  /**
   * 
   * @param event 
   * @param data 
   */
  const handleProviderChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const selection = data.value as number;

    if (data.value === "" || data.value === undefined) {
      setSelectedProvider(undefined);
    }
    else {
      setSelectedProvider(selection);
    }
    
    setHasChanges(selection !== provider);
  };

  /**
   * 
   * @param newAd 
   * @param index 
   * @returns 
   */
  const handleAdChange = (newAd: Ad, index: number) => {
    setGameAds(
      gameAds.map((ad: Ad, i:number) => (i === index ? newAd : ad)),
    );

    setHasChanges(true);
  };

  /**
   * 
   * @returns 
   */
  const addNewAd = () => {
    setGameAds([
      ...gameAds,
      { type: AdType.Banner, kiln_id: "NEW_AD", status: AdStatus.Draft },
    ]);
    
    enablAdEditing(gameAds.length);
    
    setHasChanges(true);
  };

  /**
   * 
   * @param index 
   * @returns 
   */
   const deleteAd = async (index: number) => {
    const removeAd = () => {
      setGameAds(gameAds.filter((a, i) => i !== index));

      removeAdEditing(index);
    };
     
     removeAd();
     
     setHasChanges(true);
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
   * This is used to disable all fields in edit mode from the parent component.
   * When saving, the parent component will call this function to disable the fields.
   */
  const disableAdEditing = () => {
    setAdsBeingEdited([]);

    setHasChanges(false);
  }
  
  /**
   * 
   */
  const deleteService = async () => {
    if (selectedProvider === undefined) return;

    onDelete(selectedProvider);
  }

  /**
   * 
   * @param index 
   * @returns 
   */
  const saveService = async () => {
    if (selectedProvider === undefined) return;

    if (!validateData()) return;

    let success = await onSave(selectedProvider, JSON.stringify(gameAds));

    if (success) disableAdEditing()
  };

  /**
   * Validate that provided Ids for ads are not duplicate
   */
  const validateData = (): boolean => {
    const dupes: number[] = [];

    for (let i = 0; i < gameAds.length; i++) {
      const ad = gameAds[i];

      if (gameAds.filter((a: Ad) => a.kiln_id === ad.kiln_id).length > 1) {
        dupes.push(i);
      }
    }

    setDuplicateAdsIndexes(dupes);
      
    return dupes.length === 0;
  };
  
  useEffect(() => {
    setSelectedProvider(provider);
    
    setGameAds(ads);
  }, [provider, ads]);

  if (!gameAds) return (<></>);
  
  return (
    <>
      <Grid.Row>
        <Dropdown
          onChange={handleProviderChange}
          placeholder="Choose provider"
          value={selectedProvider}
          search={true}
          selection
          name="service_type"
          options={adsModules}
          required={true}
          clearable={true}
        />

        {!selectedProvider ? 
          
          <Label
            as={Link}
            to="#"
            color="teal"
            size="large"
            tag={true}
            style={{ marginBottom: 0, marginLeft: "30px" }}
            onClick={(e) => {
              window.location.href = "mailto:support@gamebake.io";
              e.preventDefault();
            }}
          >
          {t("editGame.services.unsupportedService")}
          </Label>
          
          :

          <></>
        }
        
        {selectedProvider ?
          
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
                message={duplicateAdsIndexes.includes(i) ? t("editGame.monetisation.idError") : ""}
                onChange={handleAdChange}
                onDelete={deleteAd}
                enableEditing={enablAdEditing}
              />
            ))}
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
              <Button
                  floated="right"
                  labelPosition="left"
                  icon="trash"
                  negative
                  content={t("editGame.monetisation.adTable.delete")}
                  onClick={deleteService}
                />
                <Button
                  floated="right"
                  labelPosition="left"
                  icon="save"
                  positive
                  disabled={!hasChanges}
                  content={t("editGame.monetisation.adTable.saveChanges")}
                  onClick={saveService}
                />
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

          :

          <></>
        }
      </Grid.Row>
    </>
  )
}
