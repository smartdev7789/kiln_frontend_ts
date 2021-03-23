import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Segment, Image, Icon, Button, Card, Header } from "semantic-ui-react";
import { Asset, AssetType } from "../../api/DataTypes";
import { MultipleFileField } from "./MultipleFileField";

type MultipleAssetFieldProps = {
  assets: Asset[];
};

export const MultipleAssetField = ({ assets }: MultipleAssetFieldProps) => {
  const { t } = useTranslation();

  const inputEl = useRef<
    { [assetType in AssetType]: React.RefObject<HTMLInputElement> }
  >({
    [AssetType.Icon]: useRef<HTMLInputElement | null>(null),
    [AssetType.Screenshot]: useRef<HTMLInputElement | null>(null),
    [AssetType.Video]: useRef<HTMLInputElement | null>(null),
  });

  const [newFiles, setNewFiles] = useState<
    { [assetType in AssetType]: File[] }
  >({
    [AssetType.Icon]: [],
    [AssetType.Screenshot]: [],
    [AssetType.Video]: [],
  });

  const handleChange = (assetType: AssetType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = [];
    for (let index = 0; index < event.target.files!.length; index++) {
      const file = event.target.files![index];
      files.push(file);
    }
    setNewFiles({
      ...newFiles,
      [assetType]: [...newFiles[assetType], ...files],
    });
  };

  const handleCloseClick = (assetType: AssetType) => (file: File) => (
    event: any
  ) => {
    event.preventDefault();
    setNewFiles({
      ...newFiles,
      [assetType]: newFiles[assetType].filter((f) => f !== file),
    });
  };

  const handlePlusButtonClick = (assetType: AssetType) => (event: any) => {
    event.preventDefault();
    inputEl.current[assetType].current!.click();
  };

  return (
    <Segment>
      <Header size="tiny">{t("editGame.info.assets.icons")}</Header>
      <MultipleFileField
        inputRef={inputEl.current[AssetType.Icon]}
        files={assets.filter((asset) => asset.type === AssetType.Icon)}
        newFiles={newFiles[AssetType.Icon]}
        onChange={handleChange(AssetType.Icon)}
        onCloseClick={handleCloseClick(AssetType.Icon)}
        onPlusButtonClick={handlePlusButtonClick(AssetType.Icon)}
        accept="image/png, image/jpeg"
      />
      <Header size="tiny">{t("editGame.info.assets.screenshots")}</Header>
      <MultipleFileField
        inputRef={inputEl.current[AssetType.Screenshot]}
        files={assets.filter((asset) => asset.type === AssetType.Screenshot)}
        newFiles={newFiles[AssetType.Screenshot]}
        onChange={handleChange(AssetType.Screenshot)}
        onCloseClick={handleCloseClick(AssetType.Screenshot)}
        onPlusButtonClick={handlePlusButtonClick(AssetType.Screenshot)}
        accept="image/png, image/jpeg"
      />
      <Header size="tiny">{t("editGame.info.assets.videos")}</Header>
      <MultipleFileField
        inputRef={inputEl.current[AssetType.Video]}
        files={assets.filter((asset) => asset.type === AssetType.Video)}
        newFiles={newFiles[AssetType.Video]}
        onChange={handleChange(AssetType.Video)}
        onCloseClick={handleCloseClick(AssetType.Video)}
        onPlusButtonClick={handlePlusButtonClick(AssetType.Video)}
        accept="video/mp4,video/x-m4v,video/*"
      />
    </Segment>
  );
};
