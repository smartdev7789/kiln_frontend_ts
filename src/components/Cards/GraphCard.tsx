import React, { useState } from "react";
import { Card, Menu, Segment } from "semantic-ui-react";

export interface GraphData {
  title: string;
  x_axis: string[];
  y_axis: string[];
  values: number[];
}

export type GraphCardProps = {
  data: GraphData[];
};

export const GraphCard = ({ data }: GraphCardProps) => {
  const [currentTab, setCurrentTab] = useState(data[0].title);

  return (
    <Segment className="graph">
      <Menu>
        {data.map((graphData, i) => (
          <Menu.Item
            key={graphData.title}
            onClick={() => setCurrentTab(graphData.title)}
            className="label"
            active={currentTab === graphData.title}
          >
            {graphData.title}
          </Menu.Item>
        ))}
      </Menu>

      <p>Here we show a graph</p>
    </Segment>
  );
};
