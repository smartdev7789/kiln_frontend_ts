import React, { useState, CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Segment } from "semantic-ui-react";
import {
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { GraphData, StatData } from "../../api/DataTypes";
import { useCurrency } from "../../hooks/useCurrency";

export type GraphCardProps = {
  data: StatData[];
};

type RoundedRectProps = {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const styles = {
  customTooltip: {
    margin: '0',
    lineHeight: '4px',
    border: '1px solid #f5f5f5',
    backgroundColor: 'rgba(255, 255, 255, 255)',
    padding: '3px',
    fontWeight: 'bold'
  }
}

const CustomTooltip = (o: any) => {
  const { payload, label } = o;
  if (payload && payload.length) {
    return (
      <div className="tooltipContent" style={styles.customTooltip as CSSProperties} >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
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
  const { t } = useTranslation(); // Translations.

  const [currentTab, setCurrentTab] = useState(data[0].label);
  const { format } = useCurrency({ currency: "USD", compactNotation: true });
  
  const statsToGraphData = (stats: StatData[]): GraphData[] => {
    const sortedData = stats.reduce((acc: any, curr) => {
      if (!acc[curr.label]) {
        acc[curr.label] = [curr];
      } else {
        acc[curr.label].push(curr);
      }
      
      return acc;
    }, {});

    const graphData: GraphData[] = [];

    Object.entries(sortedData).forEach(([key, value]) => {
      const x_axis = (value as StatData[]).map((stat) =>
        new Date(stat.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
      );
      
      const y_axis = (value as StatData[]).map((stat) => stat.value);

      graphData.push({
        title: key,
        x_axis: x_axis,
        y_axis: y_axis,
        values: (value as StatData[]).map((stat) => parseInt(stat.value)),
        application: (value as StatData[])[0].application_id as string,
        date: (value as StatData[])[0].date as string,
      });
    });
  
    return graphData;
  };


  const processedData = statsToGraphData(data);

  const currentGraphData = processedData.find(
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
        {processedData.map((graphData, i) => {
          // Disgusting stuff up until we can get the data sheet from the equation
          let label = graphData.title;
          if (label === "Purchases (USD$) (Est.)") label = "Purchases";
          else if (label === "Ads (USD$) (Est.)") label = "Ads";
          else if (label === "CP Net Earnings (USD$) (Est.)") label = "Earnings";

          return (
            <Menu.Item
              key={graphData.title}
              onClick={() => setCurrentTab(graphData.title)}
              className="label"
              active={currentTab === graphData.title}
            >
              {t(`analytics.statCardLabels.${label.toLowerCase().replaceAll(' ', '-')}`)}
            </Menu.Item>
          )
        })}
      </Menu>

      <ResponsiveContainer width="100%" height="87%">
        <BarChart width={800} height={400} data={graphDataForLibrary}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B2EDB9" stopOpacity={1} />
              <stop offset="95%" stopColor="#D6D6D6" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Bar dataKey="value" barSize={50} fill="url(#barGradient)" shape={RoundedRect} />
          <XAxis dataKey="x_axis" fontSize={10} />
          <YAxis tickFormatter={formatYAxis ? yAxisFormatter : undefined} fontSize={10} />
          <Tooltip cursor={{ stroke: '#D6D6D6', strokeWidth: 0.1, fillOpacity: 0.1 }} content={<CustomTooltip />}/>
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
};
