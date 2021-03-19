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

export interface AppPlatform {
  id: number;
  status: number;
}

export interface AppInfo extends BasicAppInfo {
  platforms: AppPlatform[];
  assets_1?: Asset[];
  assets_2?: Asset[];
  categories_1?: string;
  categories_2?: string;
  leaderboards: any[];
  iap: IAP[];
  events: any[];
  ads: Ad[];
}

export interface Platform {
  id: number;
  name: string;
  icon: string;
  markets: string;
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

export enum AdType {
  Interstitial = 0,
  RewardedVideo = 1,
  Banner = 2,
}

export interface Ad {
  kiln_id: string;
  type: AdType;
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

export const IAPPriceTierOptions = [
  { key: 0, value: 0, text: "USD 0.99 " },
  { key: 1, value: 1, text: "USD 1.99 " },
  { key: 2, value: 2, text: "USD 2.99 " },
  { key: 3, value: 3, text: "USD 3.99 " },
  { key: 4, value: 4, text: "USD 4.99 " },
  { key: 5, value: 5, text: "USD 5.99 " },
  { key: 6, value: 6, text: "USD 6.99 " },
  { key: 7, value: 7, text: "USD 7.99 " },
  { key: 8, value: 8, text: "USD 8.99 " },
  { key: 9, value: 9, text: "USD 9.99 " },
  { key: 10, value: 10, text: "USD 10.99 " },
  { key: 11, value: 11, text: "USD 11.99 " },
  { key: 12, value: 12, text: "USD 12.99 " },
  { key: 13, value: 13, text: "USD 13.99 " },
  { key: 14, value: 14, text: "USD 14.99 " },
  { key: 15, value: 15, text: "USD 15.99 " },
  { key: 16, value: 16, text: "USD 16.99 " },
  { key: 17, value: 17, text: "USD 17.99 " },
  { key: 18, value: 18, text: "USD 18.99 " },
  { key: 19, value: 19, text: "USD 19.99 " },
  { key: 20, value: 20, text: "USD 20.99 " },
  { key: 21, value: 21, text: "USD 21.99 " },
  { key: 22, value: 22, text: "USD 22.99 " },
  { key: 23, value: 23, text: "USD 23.99 " },
  { key: 24, value: 24, text: "USD 24.99 " },
  { key: 25, value: 25, text: "USD 25.99 " },
  { key: 26, value: 26, text: "USD 26.99 " },
  { key: 27, value: 27, text: "USD 27.99 " },
  { key: 28, value: 28, text: "USD 28.99 " },
  { key: 29, value: 29, text: "USD 29.99 " },
  { key: 30, value: 30, text: "USD 30.99 " },
  { key: 31, value: 31, text: "USD 31.99 " },
  { key: 32, value: 32, text: "USD 32.99 " },
  { key: 33, value: 33, text: "USD 33.99 " },
  { key: 34, value: 34, text: "USD 34.99 " },
  { key: 35, value: 35, text: "USD 35.99 " },
  { key: 36, value: 36, text: "USD 36.99 " },
  { key: 37, value: 37, text: "USD 37.99 " },
  { key: 38, value: 38, text: "USD 38.99 " },
  { key: 39, value: 39, text: "USD 39.99 " },
  { key: 40, value: 40, text: "USD 40.99 " },
  { key: 41, value: 41, text: "USD 41.99 " },
  { key: 42, value: 42, text: "USD 42.99 " },
  { key: 43, value: 43, text: "USD 43.99 " },
  { key: 44, value: 44, text: "USD 44.99 " },
  { key: 45, value: 45, text: "USD 45.99 " },
  { key: 46, value: 46, text: "USD 46.99 " },
  { key: 47, value: 47, text: "USD 47.99 " },
  { key: 48, value: 48, text: "USD 48.99 " },
  { key: 49, value: 49, text: "USD 49.99 " },
  { key: 50, value: 50, text: "USD 54.99 " },
  { key: 51, value: 51, text: "USD 59.99 " },
  { key: 52, value: 52, text: "USD 64.99 " },
  { key: 53, value: 53, text: "USD 69.99 " },
  { key: 54, value: 54, text: "USD 74.99 " },
  { key: 55, value: 55, text: "USD 79.99 " },
  { key: 56, value: 56, text: "USD 84.99 " },
  { key: 57, value: 57, text: "USD 89.99 " },
  { key: 58, value: 58, text: "USD 94.99 " },
  { key: 59, value: 59, text: "USD 99.99 " },
  { key: 60, value: 60, text: "USD 109.99 " },
  { key: 61, value: 61, text: "USD 119.99 " },
  { key: 62, value: 62, text: "USD 124.99 " },
  { key: 63, value: 63, text: "USD 129.99 " },
  { key: 64, value: 64, text: "USD 139.99 " },
  { key: 65, value: 65, text: "USD 149.99 " },
  { key: 66, value: 66, text: "USD 159.99 " },
  { key: 67, value: 67, text: "USD 169.99 " },
  { key: 68, value: 68, text: "USD 174.99 " },
  { key: 69, value: 69, text: "USD 179.99 " },
  { key: 70, value: 70, text: "USD 189.99 " },
  { key: 71, value: 71, text: "USD 199.99 " },
  { key: 72, value: 72, text: "USD 209.99 " },
  { key: 73, value: 73, text: "USD 219.99 " },
  { key: 74, value: 74, text: "USD 229.99 " },
  { key: 75, value: 75, text: "USD 239.99 " },
  { key: 76, value: 76, text: "USD 249.99 " },
  { key: 77, value: 77, text: "USD 299.99 " },
  { key: 78, value: 78, text: "USD 349.99 " },
  { key: 79, value: 79, text: "USD 399.99 " },
  { key: 80, value: 80, text: "USD 449.99 " },
  { key: 81, value: 81, text: "USD 499.99 " },
  { key: 82, value: 82, text: "USD 599.99 " },
  { key: 83, value: 83, text: "USD 699.99 " },
  { key: 84, value: 84, text: "USD 799.99 " },
  { key: 85, value: 85, text: "USD 899.99 " },
  { key: 86, value: 86, text: "USD 999.99 " },
];
