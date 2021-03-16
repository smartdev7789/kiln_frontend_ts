import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export interface GraphData {
  title: string;
  x_axis: string[];
  y_axis: string[];
  values: number[];
}

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
        height={height - radius}
        fill={fill}
      />
      <rect x={x} y={y} width={width} height={height} rx={radius} fill={fill} />
    </svg>
  );
};

export const GraphCard = ({ data }: GraphCardProps) => {
  const [currentTab, setCurrentTab] = useState(data[0].title);

  const currentGraphData = data.find(
    (graphData) => graphData.title === currentTab
  )!;

  const graphDataForLibrary = currentGraphData.values.map((value, i) => {
    return {
      value,
      x_axis: currentGraphData.x_axis[i],
    };
  });

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
    </Segment>
  );
};
