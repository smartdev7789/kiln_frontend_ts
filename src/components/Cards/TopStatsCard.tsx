import React from "react";
// import { Card, Divider, Image, List } from "semantic-ui-react";
import { Card, Divider, List } from "semantic-ui-react";
import { PlatformStat } from "../../api/DataTypes";
import { useTranslation } from "react-i18next";

export type TopStatsCardProps = {
  header: string;
  data: PlatformStat[];
};

export const TopStatsCard = ({ header, data }: TopStatsCardProps) => {
  
  // Translations.
  const { t } = useTranslation();

  return (
    <Card className="top-stats">
      <Card.Content>
        <Card.Header className="label">{header}</Card.Header>
        <Divider />
        <List verticalAlign="middle">          
          { 
            ( data ) 
            
            ? data.map((stat, i) => {
              return (
                <List.Item key={i}>
                  <List.Content floated="right">
                    {stat.earnings.toLocaleString()}
                  </List.Content>
                  {/* <Image avatar src={stat.icon} /> */}
                  <List.Content>{stat.name}</List.Content>
                </List.Item>
              );
            })

            : <h3>{t("analytics.no-data-yet")}</h3>
          }
        </List>
      </Card.Content>
    </Card>
  );
};
