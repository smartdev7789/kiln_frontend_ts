import {
  Analytics,
  TopStats,
  User,
  Platform,
  AppSummary,
  AppInfo,
  BasicAppInfo,
} from "./DataTypes";

const API_ENDPOINT = "http://localhost:3333";

const login = async (email: string, password: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/1`);
  return (await res.json()) as User;
};

const validate = async (token: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/${token}`);
  return (await res.json()) as User;
};

const analytics = async (
  platform: string | null,
  app_id: string | null,
  date: string | null
) => {
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
  const res = await fetch(`${API_ENDPOINT}/appSummaries`);
  return (await res.json()) as AppSummary[];
};

const app = async (id: string) => {
  const res = await fetch(`${API_ENDPOINT}/apps/${id}`);
  return (await res.json()) as AppInfo;
};

const additionalAppInfo = {
  platforms: [],
  leaderboards: [],
  iap: [],
  events: [],
  ads: [],
};

const createApp = async (appData: BasicAppInfo) => {
  const res = await fetch(`${API_ENDPOINT}/apps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...additionalAppInfo, ...appData }),
  });
  return (await res.json()) as AppInfo;
};

const updateApp = async (id: number, appData: AppInfo) => {
  const res = await fetch(`${API_ENDPOINT}/apps/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...appData }),
  });
  return (await res.json()) as AppInfo;
};

const resetPassword = async (email: string) => {
  const res = await fetch(`${API_ENDPOINT}/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};

const getTermsOfService = async (lang = "en") => {
  const res = await fetch(`${API_ENDPOINT}/tos/${lang}`);
  return (await res.json()) as { tos: string };
};

const acceptTermsOfService = async (lang = "en") => {
  const res = await fetch(`${API_ENDPOINT}/tos/${lang}`, { method: "POST" });
  return await res.json();
};

const updateAccountInfo = async (accountData: User) => {
  const res = await fetch(`${API_ENDPOINT}/users/${accountData.id}`);
  return await res.json();
};

export const API = {
  login,
  validate,
  analytics,
  topStats,
  platforms,
  apps,
  app,
  games: apps,
  createApp,
  updateApp,
  resetPassword,
  getTermsOfService,
  acceptTermsOfService,
  updateAccountInfo,
};
