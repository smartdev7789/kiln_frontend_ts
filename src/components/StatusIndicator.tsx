import { useTranslation } from "react-i18next";
import { Icon, Label } from "semantic-ui-react";

const Statuses = [
  {
    text: "games.status.draft",
    color: "#BABABA",
  },
  {
    text: "games.status.inReview",
    color: "#C1B41B",
  },
  {
    text: "games.status.active",
    color: "#1BC167",
  },
  {
    text: "games.status.deactivated",
    color: "#C11B1B",
  },
  {
    text: "games.status.disabled",
    color: "#BABABA",
  },
];

export const StatusDraft = 0;
export const StatusInReview = 1;
export const StatusActive = 2;
export const StatusDeactivated = 3;
export const StatusDisabled = 4;

export type Status = 0 | 1 | 2 | 3 | 4;

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
