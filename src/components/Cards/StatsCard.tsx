import React from "react";
import { Card } from "semantic-ui-react";

export type StatsCardProps = {
  label: string;
  value: string | number;
  isEarning?: boolean;
};

export const StatsCard = ({ label, value, isEarning }: StatsCardProps) => {
  let printValue = typeof value === "number" ? value.toLocaleString() : value;
  if (label === "Purchases" || label === "Ads" || label === "Earnings" || isEarning) printValue = "$" + printValue;
  
  return (
    <Card className="stats">
      <Card.Content>
        <Card.Header className="label">{label}</Card.Header>

        <Card.Header className="value">
          {printValue}
        </Card.Header>
      </Card.Content>
    </Card>
  );
};
