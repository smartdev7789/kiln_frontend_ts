export interface AppSummary {
  id: number;
  icon: string;
  name: string;
  platforms: string[];
}

export interface Asset {
  type: number;
  width: number;
  height: number;
  url: string;
}

export interface BasicAppInfo {
  id?: number;
  name: string;
  description: string;
  default_language: string;
  type: 0 | 1;
  summary: string;
}

export interface AppInfo extends BasicAppInfo {
  platforms: number[];
  assets_1: Asset[];
  assets_2: Asset[];
  categories_1: string;
  categories_2: string;
  leaderboards: any[];
  iap: any[];
  events: any[];
  ads: any[];
}

export interface Platform {
  id: number;
  name: string;
  icon: string;
}

export interface User {
  id: number;
  email: string;
  displayName: string;
}

export interface GraphData {
  graph_title: string;
  x_axis: string[];
  y_axis: string[];
  values: number[];
}

export interface StatData {
  label: string;
  value: string | number;
}

export interface Analytics {
  graphs: GraphData[];
  stats: StatData[];
}

export interface PlatformStat {
  icon: string;
  name: string;
  earnings: number;
}
export interface TopStats {
  top_games: PlatformStat[];
  top_platforms: PlatformStat[];
}
