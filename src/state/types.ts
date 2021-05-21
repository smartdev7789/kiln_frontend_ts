import { ReleasesSummary, AppSummary, Platform, User, Account } from "../api/DataTypes";

export type State = {
  user?: User;
  login?: boolean;
  account?: Account;
  platforms?: Platform[];
  apps?: AppSummary[];
  releases?: ReleasesSummary[];
};

export enum ActionType {
  SetAccount = "SET_ACCOUNT",
  SetUser = "SET_USER",
  SetPlatforms = "SET_PLATFORMS",
  SetApps = "SET_APPS",
  SetReleases = "SET_RELEASES",
  // Auth
  LoginSuccessful = 'LOGIN_SUCCESSFUL',
  // LoginFailed = 'LOGIN_FAILED',
  // Logout = 'LOGOUT',
}

export type Action = {
  type: ActionType;
  payload: { 
    account?: Account;
    user?: User; 
    platforms?: Platform[]; 
    apps?: AppSummary[];
    releases?: ReleasesSummary[];
  };
};

export const initialState: State = {};
