import { Leaderboard, APIResponse } from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";

/**
 * 
 * @param token 
 * @param appId 
 * @param eventData 
 * @returns 
 */
export const createLeaderboard = async (token: string, appId: string, leaderboardData: Leaderboard) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/leaderboards`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({kiln_id: leaderboardData.kiln_id, order: leaderboardData.order}),
  });

  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param eventData
 * @param etag 
 * @returns 
 */
 export const updateLeaderboard = async (token: string, appId: string, leaderboardData: Leaderboard, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/leaderboards/${leaderboardData.id}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'If-Match': etag,
    },
    body: JSON.stringify({kiln_id: leaderboardData.kiln_id, order: leaderboardData.order}),
  });

  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param eventId 
 * @param etag 
 * @returns 
 */
 export const deleteLeaderboard = async (token: string, appId: string, leaderboardId: number, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/leaderboards/${leaderboardId}`;
  const bearer = 'Bearer ' + token;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'If-Match': etag,
      'Authorization': bearer,
    },
    body: JSON.stringify({}),
  });

  if (res.status === 204) {
    return ({_status: 'OK'}) as APIResponse;
  }
  else {
    return ({_status: 'ERR'}) as APIResponse;
  }
}