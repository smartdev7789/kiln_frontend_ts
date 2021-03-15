import { Action, ActionType, State } from "./types";

export const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  if (type === ActionType.SET_USER) {
    return {
      ...state,
      user: payload.user,
    };
  }

  return { ...state };
};
