import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  DropdownProps,
  Input,
  InputOnChangeData,
  Table,
} from "semantic-ui-react";
import { IAP, IAPTypeOptions } from "../../api/DataTypes";
import { StatusIndicator } from "../../components/StatusIndicator";
import { IAPTypeText } from "./EditGameMonetisation";
import { useCurrency } from "../../hooks/useCurrency";

type IAPRowProps = {
  iap: IAP;
  index: number;
  editing: boolean;
  onChange: (newAd: IAP, index: number) => void;
  onDelete: (index: number) => void;
  enableEditing: (index: number) => void;
  onSave: (index: number) => void;
};

export const IAPRow = ({
  index,
  iap,
  editing,
  onChange,
  onDelete,
  enableEditing,
  onSave,
}: IAPRowProps) => {
  const { t } = useTranslation();
  const currency = useCurrency({ currency: "GBP" });

  const deleteIAP = () => {
    onDelete(index);
  };

  const handleChange = (_: any, props: InputOnChangeData | DropdownProps) => {
    onChange(
      {
        ...iap,
        [props.name]: props.value,
      },
      index
    );
  };

  return (
    <Table.Row>
      <Table.Cell>
        {editing ? (
          <Input onChange={handleChange} name="name" value={iap.name} />
        ) : (
          iap.name
        )}
      </Table.Cell>
      <Table.Cell>
        {editing ? (
          <Input onChange={handleChange} name="kiln_id" value={iap.kiln_id} />
        ) : (
          iap.kiln_id
        )}
      </Table.Cell>
      <Table.Cell>
        {editing ? (
          <Dropdown
            onChange={handleChange}
            name="type"
            value={iap.type}
            options={IAPTypeOptions.map((option) => ({
              ...option,
              text: t(option.text),
            }))}
          />
        ) : (
          t(IAPTypeText[iap.type])
        )}
      </Table.Cell>
      <Table.Cell>
        {editing ? (
          <Input
            onChange={handleChange}
            name="price"
            type="number"
            value={iap.price}
            min="0"
            step="0.01"
          />
        ) : (
          currency.format(iap.price)
        )}
      </Table.Cell>
      <Table.Cell>
        <StatusIndicator status={0} />
      </Table.Cell>
      <Table.Cell>
        {!editing && (
          <Button onClick={() => enableEditing(index)}>
            {t("editGame.monetisation.iapTable.edit")}
          </Button>
        )}

        {editing && (
          <Button.Group>
            <Button positive onClick={() => onSave(index)}>
              {t("editGame.monetisation.iapTable.save")}
            </Button>
            <Button negative basic onClick={deleteIAP}>
              {t("editGame.monetisation.iapTable.delete")}
            </Button>
          </Button.Group>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
