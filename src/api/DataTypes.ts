export interface AppSummary {
  id: number;
  icon: string;
  name: string;
  platforms: string[];
}

export enum AssetType {
  Icon = 0,
  Screenshot = 1,
  Video = 2,
}

export interface Asset {
  type: AssetType;
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

export interface AppPlatform {
  id: number;
  status: number;
}

export interface AppInfo extends BasicAppInfo {
  platforms: AppPlatform[];
  privacy_policy: string;
  assets_1?: Asset[];
  assets_2?: Asset[];
  categories_1?: string;
  categories_2?: string;
  leaderboards: any[];
  iap: IAP[];
  events: Event[];
  ads: Ad[];
}

export enum PlatformConnectionStatus {
  NotConnected = 0,
  Processing = 1,
  Connected = 2,
}
export interface Platform {
  id: number;
  name: string;
  icon: string;
  market: string;
  description: string;
  more_info: string;
  connection_status: PlatformConnectionStatus;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  contact_number: string;
  company_name: string;
  contact_email: string;
  business_license: string;
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

export enum AdType {
  Interstitial = 0,
  RewardedVideo = 1,
  Banner = 2,
}

export enum AdStatus {
  Draft = 0,
  InReview = 1,
  Active = 2,
  Deactivated = 3,
}

export interface Ad {
  kiln_id: string;
  type: AdType;
  status: AdStatus;
}

export enum IAPType {
  Consumable = 0,
  NonConsumable = 1,
}
export interface IAP {
  kiln_id: string;
  type: IAPType;
  price: number;
  name: string;
}

export interface Event {
  kiln_id: string;
}

// options for dropdowns
export const AdTypeOptions = [
  {
    value: AdType.Interstitial,
    text: "adType.interstitial",
    key: AdType.Interstitial,
  },
  {
    value: AdType.RewardedVideo,
    text: "adType.rewardedVideo",
    key: AdType.RewardedVideo,
  },
  {
    value: AdType.Banner,
    text: "adType.banner",
    key: AdType.Banner,
  },
];

export const IAPTypeOptions = [
  {
    value: IAPType.Consumable,
    text: "iapType.consumable",
    key: IAPType.Consumable,
  },
  {
    value: IAPType.NonConsumable,
    text: "iapType.nonconsumable",
    key: IAPType.NonConsumable,
  },
];
