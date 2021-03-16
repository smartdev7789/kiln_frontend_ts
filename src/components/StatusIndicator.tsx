import { useTranslation } from "react-i18next";
import { Icon, Label } from "semantic-ui-react";

const Statuses = [
  {
    text: "games.status.draft",
    color: "#BABABA",
  },
  {
    text: "games.status.deactivated",
    color: "#C11B1B",
  },
  {
    text: "games.status.inReview",
    color: "#C1B41B",
  },
  {
    text: "games.status.active",
    color: "#1BC167",
  },
];

type StatusIndicatorProps = {
  status: number;
};

export const StatusIndicator = (props: StatusIndicatorProps) => {
  const { t } = useTranslation();
  const status = Statuses[props.status]!;

  return (
    <Label basic size="large" className="borderless">
      <Icon name="circle" style={{ color: status.color }} />
      {t(status.text)}
    </Label>
  );
};
