import { Event, APIResponse } from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";

/**
 * 
 * @param token 
 * @param appId 
 * @param eventData 
 * @returns 
 */
export const createEvent = async (token: string, appId: string, eventData: Event) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/events`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({kiln_id: eventData.kiln_id}),
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
 export const updateEvent = async (token: string, appId: string, eventData: Event, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/events/${eventData.id}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'If-Match': etag,
    },
    body: JSON.stringify({ kiln_id: eventData.kiln_id }),
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
 export const deleteEvent = async (token: string, appId: string, eventId: number, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/events/${eventId}`;
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