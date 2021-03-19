import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  DropdownProps,
  Input,
  InputOnChangeData,
  Table,
} from "semantic-ui-react";
import { Ad, AdTypeOptions } from "../../api/DataTypes";
import { StatusIndicator } from "../../components/StatusIndicator";
import { AdTypeText } from "./EditGameMonetisation";

type AdRowProps = {
  ad: Ad;
  index: number;
  editing: boolean;
  onChange: (newAd: Ad, index: number) => void;
  onDelete: (index: number) => void;
  enableEditing: (index: number) => void;
  onSave: (index: number) => void;
};

export const AdRow = ({
  index,
  ad,
  editing,
  onChange,
  onDelete,
  enableEditing,
  onSave,
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
        {editing ? (
          <Input onChange={handleChange} name="kiln_id" value={ad.kiln_id} />
        ) : (
          ad.kiln_id
        )}
      </Table.Cell>
      <Table.Cell>
        <StatusIndicator status={0} />
      </Table.Cell>
      <Table.Cell>
        {!editing && (
          <Button onClick={() => enableEditing(index)}>
            {t("editGame.monetisation.adTable.edit")}
          </Button>
        )}

        {editing && (
          <Button.Group>
            <Button positive onClick={() => onSave(index)}>
              {t("editGame.monetisation.adTable.save")}
            </Button>
            <Button negative basic onClick={deleteAd}>
              {t("editGame.monetisation.adTable.delete")}
            </Button>
          </Button.Group>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
