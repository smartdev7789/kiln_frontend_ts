import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Segment, Header, Card } from "semantic-ui-react";
import { API, API_ADDRESS } from "../../../api/API";
import { Asset, AssetType, ResourcesData } from "../../../api/DataTypes";
import { SingleFileField } from "./SingleFileField";
import { getToken } from "../../../authentication/Authentication";

type FixedAssetListProps = {
  assetLists: FixedAssetListOptions;
};

interface AssetList {
  title: string;
  type: AssetType;
  amount: number;
  assets: ResourcesData[];
}

export interface FixedAssetListOptions {
  groups: AssetList[];
  appPlatformInfoId: number;
}

export const FixedAssetList = ({ assetLists }: FixedAssetListProps) => {
  const { t } = useTranslation();
  
  // We'll create a matrix of refs, because we need a ref to each input element
  // Man... this is so disgusting...
  const inputRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>(
    new Array<Array<React.RefObject<HTMLInputElement>>>(assetLists.groups.length)
  );
  for (let i = 0; i < inputRefs.current.length; i++) {
    inputRefs.current[i] = new Array<React.RefObject<HTMLInputElement>>(assetLists.groups[i].amount);
    for (let z = 0; z < assetLists.groups[i].amount; z++) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      inputRefs.current[i][z] = useRef<HTMLInputElement | null>(null)
    }
  }

  const [token] = useState(getToken())  
  const [assets, setAssets] = useState<FixedAssetListOptions>(assetLists);

  const handleChange = (groupIndex: number, assetIndex: number) => async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    const appPlatformInfoId = assets.appPlatformInfoId;
    const type = assets.groups[groupIndex].type.toString();
    
    // Upload file
    const response = await API.addResource(token, appPlatformInfoId, type, file!);
    
    // TODO: Check for error

    const resource = await API.getResource(token, appPlatformInfoId, response!.id!) as unknown as ResourcesData;

    const aux = {
      groups: [...assets.groups],
      appPlatformInfoId: assets.appPlatformInfoId
    };
    aux.groups[groupIndex].assets.push(resource);
    setAssets(aux);
  };

  const handleCloseClick = (groupIndex: number, assetIndex: number) => async (event: any) => {
    event.preventDefault();
    
    const asset = assets.groups[groupIndex].assets[assetIndex];
    
    const appPlatformInfoId = assets.appPlatformInfoId;

    if (asset._etag) {
      const response = await API.deleteResource(token, appPlatformInfoId, asset.id, asset._etag)

      if (response?._status === 'OK') {
        const aux = {
          groups: [...assets.groups],
          appPlatformInfoId: assets.appPlatformInfoId
        };
        aux.groups[groupIndex].assets.splice(assetIndex, 1);
        setAssets(aux);
      }
      else {
        // TODO
        console.log("Show error")
      }
    }
  };

  const handlePlusButtonClick = (groupIndex: number, assetIndex: number) => (event: any) => {
    event.preventDefault();
    inputRefs.current[groupIndex][assetIndex].current!.click();
  };

  useEffect(() => {
    // We want to redraw on assets update
  }, [assets]);

  return (
    (assets.groups ?
      <Segment>
        {assets.groups.map((assetList, groupIndex) => {
          return (
            <Segment key={groupIndex}>
              <Header size="tiny">{t(assetList.title)}</Header>
              <Card.Group className="fixed-margin">
                {[...Array(assetList.amount)].map((e, assetIndex) =>
                  <SingleFileField
                    inputRef={inputRefs.current[groupIndex][assetIndex]}
                    file={
                      assetList.assets[assetIndex] ?
                        
                        {
                          type: assetList.type,
                          url: `${API_ADDRESS}${assetList.assets[assetIndex].file?.file}`
                        } as Asset
                        
                      :
                        null
                    }
                    onChange={handleChange(groupIndex, assetIndex)}
                    onCloseClick={handleCloseClick(groupIndex, assetIndex)}
                    onPlusButtonClick={handlePlusButtonClick(groupIndex, assetIndex)}
                    accept={(assetList.type === AssetType.Video || assetList.type === AssetType.PromoVideo) ? "video/mp4,video/x-m4v,video/*" : "image/png, image/jpeg"}
                    key={assetIndex}
                  />
                )}
              </Card.Group>
            </Segment>
          )
        })}
    </Segment>
      :
      <div></div>)
  );
};
