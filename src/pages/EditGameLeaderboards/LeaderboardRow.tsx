import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  DropdownProps,
  Input,
  InputOnChangeData,
  Table,
} from "semantic-ui-react";
import { APIResponse, Leaderboard, LeaderboardTypeOptions } from "../../api/DataTypes";
import { LeaderboardOrderText } from "./EditGameLeaderboards";

type LeaderboardRowProps = {
  leaderboard: Leaderboard;
  index: number;
  editing: boolean;
  onChange: (newLeaderboard: Leaderboard, index: number) => void;
  onDelete: (index: number) => void;
  enableEditing: (index: number) => void;
  onSave: (index: number) => Promise<APIResponse | undefined>;
};

export const LeaderboardRow = ({
  index,
  leaderboard,
  editing,
  onChange,
  onDelete,
  enableEditing,
  onSave,
}: LeaderboardRowProps) => {
  const { t } = useTranslation();

  let kilnIdInput = useRef<Input>(null);

  const handleSubmit = async (index: number) => {
    const response = await onSave(index);

    if (response?._status === "ERR" && kilnIdInput.current) {
      //@ts-ignore
      let input: HTMLInputElement = kilnIdInput.current.inputRef.current;

      input.setCustomValidity(t("editGame.monetisation.idError"));
      input.reportValidity();
    }
  }

  const deleteAd = () => {
    onDelete(index);
  };

  const handleChange = (_: any, props: InputOnChangeData | DropdownProps) => {
    if (kilnIdInput.current) {
      //@ts-ignore
      let input: HTMLInputElement = kilnIdInput.current.inputRef.current;

      input.setCustomValidity("");
      input.reportValidity();
    }

    onChange(
      {
        ...leaderboard,
        [props.name]: props.value,
      },
      index
    );
  };

  return (
    <Table.Row>
      <Table.Cell>
        {editing ? (
          <Input onChange={handleChange} name="kiln_id" value={leaderboard.kiln_id} ref={kilnIdInput} />
        ) : (
          leaderboard.kiln_id
        )}
      </Table.Cell>
      <Table.Cell>
        {editing ? (
          <Dropdown
            onChange={handleChange}
            name="order"
            value={leaderboard.order}
            options={LeaderboardTypeOptions.map((option) => ({
              ...option,
              text: t(option.text),
            }))}
          />
        ) : (
          t(LeaderboardOrderText[leaderboard.order])
        )}
      </Table.Cell>
      <Table.Cell>
        {!editing && (
          <Button onClick={() => enableEditing(index)}>
            {t("editGame.leaderboards.leaderboardTable.edit")}
          </Button>
        )}

        {editing && (
          <Button.Group>
            <Button positive onClick={() => handleSubmit(index)}>
              {t("editGame.leaderboards.leaderboardTable.save")}
            </Button>
            <Button negative basic onClick={deleteAd}>
              {t("editGame.leaderboards.leaderboardTable.delete")}
            </Button>
          </Button.Group>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
