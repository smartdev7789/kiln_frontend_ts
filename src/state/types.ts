import { AppSummary, Platform, User } from "../api/DataTypes";

export type State = {
  user?: User;
  platforms?: Platform[];
  apps?: AppSummary[];
};

export enum ActionType {
  SetUser = "SET_USER",
  SetPlatforms = "SET_PLATFORMS",
  SetApps = "SET_APPS",
}

export type Action = {
  type: ActionType;
  payload: { user?: User; platforms?: Platform[]; apps?: AppSummary[] };
};

export const initialState: State = {};
