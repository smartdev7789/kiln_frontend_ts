import React from "react";
import { Card } from "semantic-ui-react";

export type StatsCardProps = {
  label: string;
  value: string | number;
};

const styles = {
  
}

export const StatsCard = ({ label, value }: StatsCardProps) => {
  return (
    <Card className="stats">
      <Card.Content>
        <Card.Header className="label">{label}</Card.Header>

        <Card.Header className="value">
          {typeof value === "number" ? value.toLocaleString() : value}
        </Card.Header>
      </Card.Content>
    </Card>
  );
};
