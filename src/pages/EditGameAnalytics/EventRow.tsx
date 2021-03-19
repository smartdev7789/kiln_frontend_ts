import { useTranslation } from "react-i18next";
import {
  Button,
  DropdownProps,
  Input,
  InputOnChangeData,
  Table,
} from "semantic-ui-react";
import { Event } from "../../api/DataTypes";

type EventRowProps = {
  event: Event;
  index: number;
  editing: boolean;
  onChange: (newAd: Event, index: number) => void;
  onDelete: (index: number) => void;
  enableEditing: (index: number) => void;
  onSave: (index: number) => void;
};

export const EventRow = ({
  index,
  event,
  editing,
  onChange,
  onDelete,
  enableEditing,
  onSave,
}: EventRowProps) => {
  const { t } = useTranslation();

  const deleteAd = () => {
    onDelete(index);
  };

  const handleChange = (_: any, props: InputOnChangeData | DropdownProps) => {
    onChange(
      {
        ...event,
        [props.name]: props.value,
      },
      index
    );
  };

  return (
    <Table.Row>
      <Table.Cell>
        {editing ? (
          <Input onChange={handleChange} name="kiln_id" value={event.kiln_id} />
        ) : (
          event.kiln_id
        )}
      </Table.Cell>
      <Table.Cell>
        {!editing && (
          <Button onClick={() => enableEditing(index)}>
            {t("editGame.analytics.eventTable.edit")}
          </Button>
        )}

        {editing && (
          <Button.Group>
            <Button positive onClick={() => onSave(index)}>
              {t("editGame.analytics.eventTable.save")}
            </Button>
            <Button negative basic onClick={deleteAd}>
              {t("editGame.analytics.eventTable.delete")}
            </Button>
          </Button.Group>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
