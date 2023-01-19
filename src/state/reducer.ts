import { Action, ActionType, State } from "./types";

export const reducer: (state: State, action: Action) => State = (
  state: State,
  action: Action
) => {
  const { type, payload } = action;
 
  // Account context.
  if (type === ActionType.SetAccount) {
    return {
      ...state,
      account: payload.account,
    };
  }

  // Billing context.
  if (type === ActionType.SetBilling) {
    return {
      ...state,
      billing: payload.billing,
    };
  }

  // Card context.
  if (type === ActionType.SetCard) {
    return {
      ...state,
      card: payload.card,
    };
  }

  // Set Loading.
  if (type === ActionType.SetLoading) {
    return {
      ...state,
      isLoading: payload.isLoading,
    };
  }

  // LoginSuccessful context.
  if (type === ActionType.LoginSuccessful) {
    return {
      ...state,
      loginSuccessful: true,
    };
  }

  // Releases context.
  if (type === ActionType.SetReleases) {
    return {
      ...state,
      releases: payload.releases,
    };
  }

  // Platforms context.
  if (type === ActionType.SetPlatforms) {
    return {
      ...state,
      platforms: payload.platforms,
    };
  }

  // Apps context.
  if (type === ActionType.SetApps) {
    return {
      ...state,
      apps: payload.apps,
    };
  }




  return { ...state };
};
