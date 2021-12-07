import React, { useEffect, useState } from "react";
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
import { GraphData } from "../../api/DataTypes";
import { useCurrency } from "../../hooks/useCurrency";
import { getToken } from "../../authentication/Authentication";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import "../../components/Cards/datePickerFixHack.css";
import { API } from "../../api/API";

interface DayEarnings {
  date: string;
  earnings: number;
  apps: {id: string, name: string, earnings: number}[];
}

/**
 * Got this from the interwebs. Perhaps it'd be better to just have an algorithm that
 * calculates colours that go well together.
 * @param hex 
 * @param percent 
 * @returns 
 */
function increaseBrightness(hex: string, percent: number) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');

  let r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);

  return '#' +
     ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
     ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
     ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

const COLOR_START = "#2596be";

const getMonthToDateRange = (): string[] => {
  const today = new Date();
  const firstDayofMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return [
    firstDayofMonth.toISOString().split('T')[0],
    today.toISOString().split('T')[0],
  ];
}

export const AccountEarningsGraphCard = () => {
  const { t } = useTranslation();
  const { format } = useCurrency({ currency: "USD", compactNotation: true });
  const token: string | null = getToken();
  
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [apps, setApps] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [noGraphMessage, setNoGraphMessage] = useState<string>("analytics.graphs.set-filter");
  const [currentRange, setNewRange] = useState(getMonthToDateRange());
  
  const onChangeDate = (event: any, data: any) => {
    setGraphData(null);
    setApps([]);
    setColors([]);
    setNewRange(data.value ? data.value : []);
  }

  const dateEarningsToGraphData = (dateEarnings: DayEarnings[]) => {
    const graphData: GraphData = {
      title: "",
      x_axis: [],
      y_axis: [],
      values: [],
      application: "",
      date: "",
    };

    dateEarnings.forEach((dayEarnings) => {
      let date = new Date(dayEarnings.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });

      let dayValue: any = {
        date: date,
      };

      dayEarnings.apps.forEach((app) => {
        dayValue[app.name] = app.earnings;
        
        // Build up the list of apps
        if (!apps.includes(app.name)) {
          apps.push(app.name);
          setApps([...apps]);
        }
      });

      graphData.values.push(dayValue);
    });

    // We calculate the colours for the bars
    let steps = 100 / apps.length;
    const colorsAux = [];
    for (let i = 0; i < apps.length; i++) {
      colorsAux.push(increaseBrightness(COLOR_START, steps * i));
    }
    setColors(colorsAux);

    // Date ascending order - Custom endpoint that's returning the data in descending order
    graphData.values.reverse();

    return graphData;
  };

  useEffect(() => {
    if (currentRange.length > 1) {
      let startDate = new Date(currentRange[0]).toISOString().slice(0, 10);
      let endDate = new Date(currentRange[1]).toISOString().slice(0, 10);
      API.accountEarningsRangeStats(token, startDate, endDate).then((data: any) => {
        if (data.length > 0) setGraphData(dateEarningsToGraphData(data));
        else setNoGraphMessage("analytics.graphs.noData");
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRange, token]);

  const formatYAxis = 1;
  const yAxisFormatter = (value: any) => format(value);

  return (
    <Segment className="full-width borderless" style={{ height: "25em" }}>
      <Menu
        className="transparent no-shadow square bottom-border"
        size="small"
      >
        <Menu.Item>{t("analytics.earningsDateRange")}</Menu.Item>
        <Menu.Item>
          <SemanticDatepicker
            datePickerOnly={true}
            onChange={onChangeDate}
            type="range"
            value={currentRange.length > 1 ? [new Date(currentRange[0]), new Date(currentRange[1])] : null} />
        </Menu.Item>
      </Menu>
      
      <ResponsiveContainer width="100%" height="87%">
        {
          !graphData ?
            <h3>{t(noGraphMessage)}</h3>
            :
            <BarChart width={800} height={400} data={graphData.values}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis tickFormatter={formatYAxis ? yAxisFormatter : undefined} fontSize={10} />
              <Tooltip cursor={{ stroke: '#D6D6D6', strokeWidth: 0.1, fillOpacity: 0.1 }} />
              {apps.map((app, i) => {
                return <Bar dataKey={app} stackId="a" fill={colors[i]} barSize={50} key={i} />
              })}
            </BarChart>
          }
      </ResponsiveContainer>
    </Segment>
  );
};
