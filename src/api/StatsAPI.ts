import { APIResponse, Filter, TopStats } from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";
import { amountOfDaysSince, yesterday } from "../libs/date";

/**
 *
 * @param filters
 * @param token
 * @returns
 */
export const stats = async (filters: Filter, token: string | null) => {
  if (!token) return noTokenResponse;

  // http://localhost:5000/v0.01/stats?where={"application_id":"b0ca2dae-836a-422c-98e0-858526651edf","platform_id":1}
  const url = `/v0.01/stats`;

  let where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id}`;
  let endDate = yesterday();
  let startDate: string;
  switch (filters.date) {
    case "0": // Yesterday
      where += `,"date":"${endDate}"}&sort=date`;
      break;

    case "1": // 7 days
      startDate = amountOfDaysSince(7, new Date(endDate));

      where += `,"and_":[{"date":"__ge__(\\"${startDate}\\")"}, {"date":"__le__(\\"${endDate}\\")"}]}&sort=date`;
      break;

    case "2": // 14 days
      startDate = amountOfDaysSince(14, new Date(endDate));

      where += `,"and_":[{"date":"__ge__(\\"${startDate}\\")"}, {"date":"__le__(\\"${endDate}\\")"}]}&sort=date`;
      break;

    case "3": // 30 days
      startDate = amountOfDaysSince(30, new Date(endDate));

      where += `,"and_":[{"date":"__ge__(\\"${startDate}\\")"}, {"date":"__le__(\\"${endDate}\\")"}]}&sort=date`;
      break;

    case "4": // All Time
      where += `}&sort=date`;
      break;

    default:
      where += `}&sort=date`;
  }

  const bearer = "Bearer " + token;
  const res = await fetch(url.concat(where), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  console.log(res.json());
  return (await res.json()) as APIResponse;
};

/**
 *
 * @param token
 * @returns
 */
export const accountEarningsStats = async (token: string | null) => {
  if (!token) return noTokenResponse;

  const url = `/v0.01/stats/grouped`;

  const bearer = "Bearer " + token;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as APIResponse;
};

/**
 * TODO: Do once we've got the stuff from Saul
 * @param token
 * @param startDate
 * @param endDate
 */
export const accountEarningsRangeStats = async (
  token: string | null,
  startDate: string,
  endDate: string
) => {
  if (!token) return noTokenResponse;

  // /stats/apps?where={"and_":[{"date":"__ge__(\"2021-09-16\")"}, {"date":"__le__(\"2021-11-23\")"}]}
  const url = `/v0.01/stats/overview?where={"and_":[{"date":"__ge__(\\"${startDate}\\")"}, {"date":"__le__(\\"${endDate}\\")"}]}`;

  const bearer = "Bearer " + token;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as APIResponse;
};

export const topChannelGames = async (
  token: string | null,
  startDate: string,
  endDate: string
) => {
  if (!token) return noTokenResponse;

  // /stats/apps?where={"and_":[{"date":"__ge__(\"2021-09-16\")"}, {"date":"__le__(\"2021-11-23\")"}]}
  const url = `/v0.01/stats/top_channels_games?where={"and_":[{"date":"__ge__(\\"${startDate}\\")"}, {"date":"__le__(\\"${endDate}\\")"}]}`;

  const bearer = "Bearer " + token;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as APIResponse;
};

/**
 *
 * @param token
 * @returns
 */
export const topStats = async (token: string | null) => {
  if (!token) return noTokenResponse;

  // const res = await fetch(`/v0.01/stats/top`);
  const url = `/v0.01/stats/top`;

  const bearer = "Bearer " + token;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  if (res.status === 200) {
    return (await res.json()) as TopStats;
  } else {
    return { top_games: [], top_platforms: [] };
  }
};

/**
 *
 * @param token
 * @param filters
 * @returns
 */
export const graphs = async (token: string | null, filters: Filter) => {
  if (!token) return noTokenResponse;

  // ?where={"application_id":"b0ca2dae-836a-422c-98e0-858526651edf", "platform_id":1, "date":"2021-05-21"}
  // const url = `/v0.01/graphs?where={"application_id":${filters.application_id},"platform_id":${filters.platform_id},"date":"${filters.date}"}`;
  const url = `/v0.01/graphs`;

  // "yesterday":"0",
  // "last7Days": "1",
  // "last14Days": "2",
  // "last30Days": "3",
  // "allTime": "4",

  let where = "";
  switch (filters.date) {
    case "0":
      let date = yesterday();
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id},"date":"${date}"}`;
      break;
    case "4":
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id}}`;
      break;
    default:
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id}}`;
  }

  const bearer = "Bearer " + token;
  const res = await fetch(url.concat(where), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as APIResponse;
};
