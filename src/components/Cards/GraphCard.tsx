import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import {
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { GraphData } from "../../api/DataTypes";
import { PagePlaceholder } from "../Placeholders/PagePlaceholder";

export type GraphCardProps = {
  data: GraphData[];
};

type RoundedRectProps = {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const RoundedRect = ({ fill, x, y, width, height }: RoundedRectProps) => {
  const radius = 5;

  return (
    <svg>
      <rect
        x={x}
        y={y + radius}
        width={width}
        height={height < radius ? 0 : height - radius}
        fill={fill}
      />
      <rect x={x} y={y} width={width} height={height} rx={radius} fill={fill} />
    </svg>
  );
};

export const GraphCard = ({ data }: GraphCardProps) => {
  const [currentTab, setCurrentTab] = useState(data[0].graph_title);

  const currentGraphData = data.find(
    (graphData) => graphData.graph_title === currentTab
  )!;

  const graphDataForLibrary = currentGraphData.values.map((value, i) => {
    return {
      value,
      x_axis: currentGraphData.x_axis[i],
    };
  });

  return (
    <Segment className="full-width borderless" style={{ height: "35em" }}>
      <Menu
        className="transparent no-shadow square bottom-border"
        size="massive"
      >
        {data.map((graphData, i) => (
          <Menu.Item
            key={graphData.graph_title}
            onClick={() => setCurrentTab(graphData.graph_title)}
            className="label"
            active={currentTab === graphData.graph_title}
          >
            {graphData.graph_title}
          </Menu.Item>
        ))}
      </Menu>

      <ResponsiveContainer width="100%" height="87%">
        <BarChart width={800} height={400} data={graphDataForLibrary}>
          {/* <Line type="monotone" dataKey="value" stroke="#8884d8" /> */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B5B5B5" stopOpacity={1} />
              <stop offset="95%" stopColor="#D6D6D6" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <Bar dataKey="value" fill="url(#barGradient)" shape={RoundedRect} />
          <XAxis dataKey="x_axis" />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
};
