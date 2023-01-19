import { ReleasesSummary, AppSummary, Platform, Account, Billing, Card } from "../api/DataTypes";

export type State = {
  login?: boolean;
  account?: Account;
  platforms?: Platform[];
  apps?: AppSummary[];
  releases?: ReleasesSummary[];
  isLoading?: boolean;
  billing?: Billing;
  card?: Card;
};

export enum ActionType {
  SetAccount = "SET_ACCOUNT",
  SetLoading = "SET_LOADING",
  SetPlatforms = "SET_PLATFORMS",
  SetApps = "SET_APPS",
  SetReleases = "SET_RELEASES",
  SetBilling = "SET_BILLING",
  SetCard = "SET_CARD",
  // Auth
  LoginSuccessful = 'LOGIN_SUCCESSFUL',
  // LoginFailed = 'LOGIN_FAILED',
  // Logout = 'LOGOUT',
}

export type Action = {
  type: ActionType;
  payload: { 
    account?: Account;
    platforms?: Platform[]; 
    apps?: AppSummary[];
    releases?: ReleasesSummary[];
    isLoading?: boolean;
    billing?: Billing;
    card?: Card;
  };
};

export const initialState: State = {};
