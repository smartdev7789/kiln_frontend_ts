import { User } from "../api/DataTypes";

export type State = { user?: User };

export enum ActionType {
  SET_USER = "SET_USER",
}

export type Action = { type: ActionType.SET_USER; payload: { user: User } };

export const initialState: State = {};
