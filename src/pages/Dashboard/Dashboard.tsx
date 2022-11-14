import React, { useState, useEffect } from "react";
import { API } from "../../api/API";
import { getToken } from "../../authentication/Authentication";
import OverviewInfoComponent from "../../components/OverviewInfoComponent";
import OverviewTableComponent from "../../components/OverviewTableComponent";
import MainLayout from "../../layouts/MainLayout";
import { DateRangePicker } from "rsuite";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";

const predefinedRanges: any = [
  {
    label: "Today",
    value: [new Date(), new Date()],
    placement: "left",
  },
  {
    label: "Yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },
  {
    label: "This week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: "left",
  },
  {
    label: "Last 7 days",
    value: [subDays(new Date(), 6), new Date()],
    placement: "left",
  },
  {
    label: "Last 30 days",
    value: [subDays(new Date(), 29), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "This year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last year",
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 0),
    ],
    placement: "left",
  },
  {
    label: "All time",
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last week",
    closeOverlay: false,
    value: (value: any) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7),
      ];
    },
    appearance: "default",
  },
  {
    label: "Next week",
    closeOverlay: false,
    value: (value: any) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7),
      ];
    },
    appearance: "default",
  },
];

const Dashboard = () => {
  const token: string | null = getToken();
  const [stats, setStats] = useState({
    revenue_ending: 0,
    dau_ending: 0,
    mau_ending: 0,
    nu_ending: 0,
  });
  const [channel, setChannel] = useState([]);
  const [game, setGame] = useState([]);
  const [value, setValue] = useState<any>([new Date(), new Date()]);

  const onChangeDate = (data: any) => {
    setValue(data);
  };

  const getEarningsRange = async () => {
    if (value.length > 1) {
      let startDate = new Date(value[0]).toISOString().slice(0, 10);
      let endDate = new Date(value[1]).toISOString().slice(0, 10);
      const data: any = await API.accountEarningsRangeStats(
        token,
        startDate,
        endDate
      );
      setStats(data);
    }
  };

  const getChannelGame = async () => {
    if (value.length > 1) {
      let startDate = new Date(value[0]).toISOString().slice(0, 10);
      let endDate = new Date(value[1]).toISOString().slice(0, 10);
      const data: any = await API.topChannelGames(token, startDate, endDate);
      setChannel(data.top_channels);
      setGame(data.top_games);
    }
  };

  useEffect(() => {
    getEarningsRange();
    getChannelGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, token]);

  return (
    <MainLayout>
      <div className="px-32 py-14">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl text-[#707070]">Overview</p>
            <p className="mt-2 text-xs text-[#707070]">
              Figures up to date as of previous 24hrs
            </p>
          </div>
          <div>
            <span className="text-md">Date:&nbsp;</span>
            <DateRangePicker
              ranges={predefinedRanges}
              placement="bottomEnd"
              onChange={onChangeDate}
              value={value}
            />
          </div>
        </div>
        <div className="flex justify-between mt-5 gap-7">
          <OverviewInfoComponent
            title="Revenue"
            dateType="day"
            value={stats.revenue_ending}
            profit="25"
          />
          <OverviewInfoComponent
            title="DAU"
            dateType="day"
            value={stats.dau_ending}
            profit="25"
          />
          <OverviewInfoComponent
            title="MAU"
            dateType="month"
            value={stats.mau_ending}
            profit="-10"
          />
          <OverviewInfoComponent
            title="New Users"
            dateType="day"
            value={stats.nu_ending}
            profit="25"
          />
        </div>
        <div className="mt-14">
          <OverviewTableComponent key="games" games={game} channels={[]} />
        </div>
        <div className="mt-14">
          <OverviewTableComponent
            key="channels"
            games={[]}
            channels={channel}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
