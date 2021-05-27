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
import { useCurrency } from "../../hooks/useCurrency";

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
  const [currentTab, setCurrentTab] = useState(data[0].title);
  const { format } = useCurrency({ currency: "GBP", compactNotation: true });

  const currentGraphData = data.find(
    (graphData) => graphData.title === currentTab
  )!;

  const graphDataForLibrary = currentGraphData.values.map((value, i) => {
    return {
      value,
      x_axis: currentGraphData.x_axis[i],
    };
  });

  const formatYAxis = Number.isNaN(parseInt(currentGraphData.y_axis[0])); // parseInt("$100") === NaN, parseInt("1,000") === 1

  const yAxisFormatter = (value: any) => format(value);

  return (
    <Segment className="full-width borderless" style={{ height: "35em" }}>
      <Menu
        className="transparent no-shadow square bottom-border"
        size="massive"
      >
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

      <ResponsiveContainer width="100%" height="87%">
        <BarChart width={800} height={400} data={graphDataForLibrary}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B5B5B5" stopOpacity={1} />
              <stop offset="95%" stopColor="#D6D6D6" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <Bar dataKey="value" fill="url(#barGradient)" shape={RoundedRect} />
          <XAxis dataKey="x_axis" />
          <YAxis tickFormatter={formatYAxis ? yAxisFormatter : undefined} />
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
};
