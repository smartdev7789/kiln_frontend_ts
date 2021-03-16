import { Action, ActionType, State } from "./types";

export const reducer: (state: State, action: Action) => State = (
  state: State,
  action: Action
) => {
  const { type, payload } = action;

  if (type === ActionType.SetUser) {
    return {
      ...state,
      user: payload.user,
    };
  }

  if (type === ActionType.SetPlatforms) {
    return {
      ...state,
      platforms: payload.platforms,
    };
  }

  return { ...state };
};
