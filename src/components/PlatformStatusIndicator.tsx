import { useTranslation } from "react-i18next";
import { Icon, Label } from "semantic-ui-react";
import { PlatformConnectionStatus } from "../api/DataTypes";

const Statuses = [
  {
    text: "platformConnectionStatus.notConnected",
    color: "#BABABA",
  },
  {
    text: "platformConnectionStatus.processing",
    color: "#C1B41B",
  },
  {
    text: "platformConnectionStatus.connected",
    color: "#1BC167",
  },
];

type PlatformStatusIndicatorProps = {
  status: PlatformConnectionStatus;
};

export const PlatformStatusIndicator = (
  props: PlatformStatusIndicatorProps
) => {
  const { t } = useTranslation();
  const status = Statuses[props.status]!;

  return (
    <Label basic size="large" className="borderless">
      <Icon name="circle" style={{ color: status.color }} />
      {t(status.text)}
    </Label>
  );
};
