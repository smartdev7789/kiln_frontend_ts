import { APIResponse } from "./DataTypes";
import { noTokenResponse } from "./API";

// Get Card Details
export const getCardDetails = async (token: string) => {
  if (!token) return noTokenResponse;

  const url = `/v0.01/card_details`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return (await res.json()) as APIResponse;
};

// Post a request to get Stripe secret keys
export const createCardDetails = async (token: string) => {
  if (!token) return noTokenResponse;

  const url = `/v0.01/card_details`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return (await res.json()) as APIResponse;
};
