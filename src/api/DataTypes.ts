// API Response

// import { Platforms } from "../pages/Platforms/Platforms";

interface APIError {
  code: number; 
  message: string;
}

interface APIErrorIssues {
  name:string;
}

export interface APIResponse {
  _status: 'OK' | 'ERR';
  _etag: string;
  // ERROR
  _issues:  APIErrorIssues | null;
  _error: APIError | null;
  // OK
  id: string | number | null;
  _items: 
    Platform[] | 
    Account[] | 
    AppInfo[] | 
    GraphData[] | 
    StatData[] | 
    ResourcesData[] | 
    null;
}

export interface ResourcesData {
  platform_info: number;
  id: number;
  type: number;
  width: number;
  height: number;
  url: string;
  file: string;
}

// APP
export interface AppSummary {
  id: string;
  icon: string;
  name: string;
  status: 0 | 1 | 2 | 3 | 4;
  type:  0 | 1;
  default_language: string;
  releases: [],
  platforms: string[];
}

export interface ReleasesSummary {
  id: number;
  version: string;
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
  id: string ;
  type: 0 | 1;
  name: string;
  default_language: string;
  description: string | null;
  summary: string | null;
}

export interface AppPlatform {
  id: number;
  status: number;
}

export interface AppInfoPatch extends BasicAppInfo {
  team: string;
  releases: any[] | null;
  platforms_info: PlatformInfo[] | null;
  leaderboards: any[] | null;
  iaps: IAP[];
  events: Event[];
  ads: Ad[];
  stats: any[] | null;
  graphs: any[] | null;
  privacy_policy: string | null;
}

export interface AppInfo extends AppInfoPatch {
  _etag: string;
  assets_1?: Asset[] | null;
  assets_2?: Asset[] | null;
  categories_1?: string | null;
  categories_2?: string | null;
}

export enum PlatformConnectionStatus {
  NotConnected = 0,
  Processing = 1,
  Connected = 2,
}

export interface PlatformInfo {
  id: number,
  application: string;
  platform: number | Platform,
  categories: string | null,
  age_rating: string | null,
  _etag: string | null,
}

export interface Platform {
  id: number;
  name: string | null;
  icon: string | null;
  market: string | null;
  description: string | null;
  more_info: string | null;
  connection_status: PlatformConnectionStatus;
  build: [] | null;
  platforms_info: [] | null;
  stats: []  | null;
  graphs: []  | null;
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

export interface Account {
  id: string,
  team_id: string;
  _created: Date,
  _updated: Date,
  _etag: string[],
  name: string,
  email: string,
  _password: string,
  contact_number: string,
  company_name: string,
  contact_email: string,
  company_number: string,
  business_licence: string
}

// Login response.
export interface Login {
  token: string | null;
  account: Account | null;
}

// Stats
export interface StatData {
  application_id: string;
  platform_id: number;
  date: string;
  label: string;
  value: string,
  id: number,
}

// Analytics
export interface GraphData {
  title: string
  x_axis: string[];
  y_axis: string[];
  values: number[];
  application: string,
  date: string,
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

export interface GraphData {
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

export interface Filter {
  application_id: string | null,
  platform_id: number | null,
  date: string | null
}