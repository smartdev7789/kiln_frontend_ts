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

  // Disgusting stuff up until we can get the data sheet from the equation
  if (label === "Purchases (USD$) (Est.)") label = "Purchases";
  else if (label === "Ads (USD$) (Est.)") label = "Ads";
  else if (label === "CP Net Earnings (USD$) (Est.)") label = "Earnings";

  let printValue = typeof value === "number" ? value.toLocaleString() : value;
  if (!printValue) printValue = t("analytics.statCardLabels.pending")
  else if (label === "Purchases" || label === "Ads" || label === "Earnings" || isEarning) printValue = "$" + printValue;
  
  return (
    <Card className="ui card">
      <Card.Content>
        <Card.Header className="label">{t(`analytics.statCardLabels.${label.toLowerCase().replaceAll(' ', '-')}`)}</Card.Header>

      </Card.Content>
      <Card.Content extra>
          {printValue}
        </Card.Content>
    </Card>
  );
};
