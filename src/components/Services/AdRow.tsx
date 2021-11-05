import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  DropdownProps,
  Input,
  InputOnChangeData,
  Label,
  Table,
} from "semantic-ui-react";
import { Ad, AdType, AdTypeOptions } from "../../api/DataTypes";
import { StatusIndicator } from "../../components/StatusIndicator";

type AdRowProps = {
  ad: Ad;
  index: number;
  editing: boolean;
  message: string;
  onChange: (newAd: Ad, index: number) => void;
  onDelete: (index: number) => void;
  enableEditing: (index: number) => void;
};

const AdTypeText = {
  [AdType.Interstitial]: "adType.interstitial",
  [AdType.Banner]: "adType.banner",
  [AdType.RewardedVideo]: "adType.rewardedVideo",
};

export const AdRow = ({
  index,
  ad,
  editing,
  message,
  onChange,
  onDelete,
  enableEditing,
}: AdRowProps) => {
  const { t } = useTranslation();

  const deleteAd = () => {
    onDelete(index);
  };

  const handleChange = (_: any, props: InputOnChangeData | DropdownProps) => {
    onChange(
      {
        ...ad,
        [props.name]: props.value,
      },
      index
    );
  };

  return (
    <Table.Row>
      <Table.Cell>
        {editing ? (
          <Dropdown
            onChange={handleChange}
            name="type"
            value={ad.type}
            options={AdTypeOptions.map((option) => ({
              ...option,
              text: t(option.text),
            }))}
          />
        ) : (
          t(AdTypeText[ad.type])
        )}
      </Table.Cell>
      <Table.Cell>
        {editing ? (<>
          <Input error={message !== ''} onChange={handleChange} name="kiln_id" value={ad.kiln_id} />
          {message !== ''? <Label basic color="red" pointing="left">{message}</Label> : null}</>
        ) : (
          ad.kiln_id
        )}
      </Table.Cell>
      <Table.Cell>
        <StatusIndicator status={ad.status} />
      </Table.Cell>
      <Table.Cell>
        {!editing && (
          <Button onClick={() => enableEditing(index)}>
            {t("editGame.monetisation.adTable.edit")}
          </Button>
        )}

        {editing && (
          <Button.Group>
            <Button negative basic onClick={deleteAd}>
              {t("editGame.monetisation.adTable.remove")}
            </Button>
          </Button.Group>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
