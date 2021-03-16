import { Platform, User } from "../api/DataTypes";

export type State = { user?: User; platforms?: Platform[] };

export enum ActionType {
  SetUser = "SET_USER",
  SetPlatforms = "SET_PLATFORMS",
}

export type Action = {
  type: ActionType;
  payload: { user?: User; platforms?: Platform[] };
};

export const initialState: State = {};
