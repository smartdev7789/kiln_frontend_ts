import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "semantic-ui-react";

export type StatsCardProps = {
  label: string;
  value: string | number;
  isEarning?: boolean;
};

export const StatsCard = ({ label, value, isEarning }: StatsCardProps) => {
  // Translations.
  const { t } = useTranslation();

  let printValue = typeof value === "number" ? value.toLocaleString() : value;
  if (!printValue) printValue = t("analytics.statCardLabels.pending")
  else if (label === "Purchases" || label === "Ads" || label === "Earnings" || isEarning) printValue = "$" + printValue;
  
  return (
    <Card className="stats">
      <Card.Content>
        <Card.Header className="label">{t(`analytics.statCardLabels.${label.toLowerCase().replaceAll(' ', '-')}`)}</Card.Header>

        <Card.Header className="value">
          {printValue}
        </Card.Header>
      </Card.Content>
    </Card>
  );
};
