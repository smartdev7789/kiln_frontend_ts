// API Response

// import { FieldValue } from "../hooks/useForm";

// import { StringMappingType } from "typescript";
// import { Platforms } from "../pages/Platforms/Platforms";

interface APIError {
  code: number;
  message: string;
}

interface APIErrorIssues {
  name: string;
}

interface Meta {
  max_results: number;
  page: number;
  total: number;
}

export interface APIResponse {
  _status: "OK" | "ERR";
  _etag: string;
  // ERROR
  _issues: APIErrorIssues | null;
  _error: APIError | null;
  // OK
  id: string | null;
  _items:
    | Platform[]
    | Release[]
    | Account[]
    | AppInfo[]
    | GraphData[]
    | StatData[]
    | ResourcesData[]
    | Build[]
    | TeamPlatform[]
    | Service[]
    | AppService[]
    | Statement[]
    | null;
  _meta: Meta | null;
}

export interface ResourcesData {
  platform_info: number;
  id: number;
  type: number;
  width: number | null;
  height: number | null;
  url: string | null;
  file: { file: string; content_type: string };
  _etag: string;
}

// ResourceTypes.
export const ResourceTypes = [
  { name: "icon", title: "resources.types.icon" },
  { name: "screenshot", title: "resources.types.screenshot" },
  { name: "video", title: "resources.types.video" },
];

// APP
export interface AppSummary {
  id: string;
  icon: string;
  name: string;
  status: 0 | 1 | 2 | 3 | 4;
  type: 0 | 1;
  default_language: string;
  releases: [];
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
  PromoVideo = 3,
}

export interface Asset {
  type: AssetType;
  width: number;
  height: number;
  url: string;
}

export interface BasicAppInfo {
  id: string;
  type: 0 | 1;
  name: string;
  pkg_name: string | null;
  service_type: number;
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
  releases: Release[];
  platforms_info: PlatformInfo[] | null;
  leaderboards: Leaderboard[];
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
  id: number;
  application: string;
  platform: number | Platform;
  categories: string | null;
  age_rating: string | null;
  _etag: string | null;
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
  stats: [] | null;
  graphs: [] | null;
}
export interface Team {
  id: string;
  team_name: string;
  company_incorporation_certificate: AssetFile | null;
  vat_tax_certificate: AssetFile | null;
  _etag: string;
  legal_name: string | null;
  legal_name_native: string | null;
  legal_address: string | null;
  legal_state_province: string | null;
  legal_country_code: string | null;
  legal_company_number: string | null;
  legal_vat_tax_number: string | null;
  support_dev_name: string | null;
  support_email: string | null;
  support_privacy_policy: string | null;
  support_terms_of_service: string | null;
  bank_name: string | null;
  bank_address: string | null;
  bank_account_name: string | null;
  bank_account_type: string | null;
  bank_account_currency: string | null;
  bank_account_number: string | null;
  bank_branch_name: string | null;
  bank_number: string | null;
  bank_sort_code: string | null;
  bank_iban: string | null;
  bank_swiftbic: string | null;
  bank_ach_routing_number: string | null;
  bank_fedwire_routing_number: string | null;
}

export interface TeamPlatform {
  id: string;
  team_name: string;
  team_account_id: string;
  platform: number;
  extras: string;
  connection_status: number;
  _etag: string;
}

export interface Account {
  id: string;
  team_id: string;
  _created: Date;
  _updated: Date;
  _etag: string;
  name: string;
  email: string;
  _password: string;
}

export interface AccountPatch {
  id: string;
  email: string;
  name: string;
  position: string;
  mobile?: string;
  whatsapp?: string;
  skype?: string;
  wechat?: string;
}

export interface PasswordPatch {
  password: string;
  new_password: string;
  confirm_password: string;
  id: string;
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
  value: string;
  id: number;
}

// Analytics
export interface GraphData {
  title: string;
  x_axis: string[];
  y_axis: string[];
  values: number[];
  application: string;
  date: string;
}

export interface StackedGraphData {
  title: string;
  x_axis: string[];
  y_axis: string[];
  values: number[];
  application: string;
  date: string;
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
  // id: number | null;
  kiln_id: string;
  type: AdType;
  status: AdStatus;
  // _etag: string | null;
}

export enum IAPType {
  Consumable = 0,
  NonConsumable = 1,
}

export interface IAP {
  id: number | null;
  kiln_id: string;
  type: IAPType;
  price: number;
  name: string;
  _etag: string | null;
}

export enum LeaderboardOrder {
  Ascending = 0,
  Descending = 1,
}

export interface Leaderboard {
  id: number | null;
  kiln_id: string;
  order: LeaderboardOrder;
  _etag: string | null;
}

export interface Event {
  id: number | null;
  kiln_id: string;
  _etag: string | null;
}

export interface Release {
  application_id: string;
  builds: Build[] | null;
  regions: [] | null;
  id: number;
  name: string;
  changelog: string;
  package: AssetFile;
  _etag: string;
}

export interface AssetFile {
  content_type: string;
  file: string;
}

export interface Build {
  release: number;
  platform: number;
  id: number;
  status: number;
  token: string;
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

export const LeaderboardTypeOptions = [
  {
    value: LeaderboardOrder.Ascending,
    text: "leaderboardOrder.ascending",
    key: LeaderboardOrder.Ascending,
  },
  {
    value: LeaderboardOrder.Descending,
    text: "leaderboardOrder.descending",
    key: LeaderboardOrder.Descending,
  },
];

export interface Filter {
  application_id: string | null;
  platform_id: number | null;
  date: string | null;
}

// export interface FormDataInterface {
//   [key: string]: FieldValue
// }

export enum ServiceCategory {
  CORE = 0,
  ANALYTICS = 1,
  ADS = 2,
  ATTRIBUTION = 3,
}

export interface Service {
  id: number;
  name: string;
  category: number;
}

export interface AppService {
  id: number;
  application: string;
  service: number;
  category: number;
  extras: string;
  _etag: string;
}

export interface Country {
  code: string;
  name: string;
  short_name: string;
}

export interface Currency {
  code: string;
  name: string;
}

export interface BankAccountType {
  code: string;
  name: string;
}

export interface Billing {
  client_secret: string;
  stripe_public_key: string;
}

export interface Card {
  last4: string | null;
  exp_month: string | null;
  exp_year: string | null;
  brand: string | null;
}

export interface Invoice {
  statement: string;
  id: string;
  stripe_id: string;
  name: string;
  period_start: string;
  period_end: string;
  amount: number;
  status: string;
  invoice_file: AssetFile;
  _updated: string;
  _created: string;
}

export interface SBInvoice {
  statement: string;
  id: string;
  name: string;
  period_start: string;
  period_end: string;
  amount: number;
  status: string;
  invoice_file: AssetFile;
  _updated: string;
  _created: string;
  _etag: string;
}
export interface Statement {
  team: string;
  invoice: Invoice | null;
  self_billing_invoice: SBInvoice | null;
  id: string;
  period_start: string;
  period_end: string;
  amount_invoice: number;
  amount_self_billing: number;
  name: string;
  status: string;
  statement_file: AssetFile;
  _updated: string;
  _created: string;
  _etag: string;
  _deleted: boolean;
}