import { Analytics, TopStats, User, Platform, App } from "./DataTypes";

const API_ENDPOINT = "http://localhost:3333";

const login = async (email: string, password: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/1`);
  return (await res.json()) as User;
};

const validate = async (token: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/${token}`);
  return (await res.json()) as User;
};

const analytics = async (platform: number, app_id: number, data: number) => {
  const res = await fetch(`${API_ENDPOINT}/stats/1`);
  return (await res.json()) as Analytics;
};

const topStats = async () => {
  const res = await fetch(`${API_ENDPOINT}/stats/top`);
  return (await res.json()) as TopStats;
};

const platforms = async () => {
  const res = await fetch(`${API_ENDPOINT}/platforms`);
  return (await res.json()) as Platform[];
};

const apps = async () => {
  const res = await fetch(`${API_ENDPOINT}/apps`);
  return (await res.json()) as App[];
};

export const API = {
  login,
  validate,
  analytics,
  topStats,
  platforms,
  apps,
  games: apps,
};
