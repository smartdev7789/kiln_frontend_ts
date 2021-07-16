import { Account, APIResponse, Team } from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";

/**
 * 
 * @param token 
 * @param accountId 
 * @returns 
 */
export const getAccount = async (token: string, accountId: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/accounts/${accountId}`;
  const bearer = 'Bearer ' + token;
  
  const res = await fetch(url, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    }
  );
  
  return (await res.json()) as APIResponse;
};

/**
 * 
 * @param token 
 * @param accountData 
 * @param etag 
 * @returns 
 */
export const updateAccount = async (token: string, accountData: Account, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/accounts/${accountData.id}`;
  
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'If-Match': etag,
    },
    body: JSON.stringify({name: accountData.name, email: accountData.email}),
  });

  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param teamId 
 * @returns 
 */
export const getTeam = async (token: string, teamId: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/teams/${teamId}`;
  const bearer = 'Bearer ' + token;
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
    },
  });

  return (await res.json()) as Team;
}