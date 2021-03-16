export interface App {
  id: number;
  icon: string;
  name: string;
  platforms: string[];
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
