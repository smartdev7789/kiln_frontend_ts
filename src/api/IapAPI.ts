import { APIResponse, IAP } from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";

/**
 * 
 * @param token 
 * @param appId 
 * @param adData 
 * @returns 
 */
export const createIAP = async (token: string, appId: string, iapData: IAP) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/iaps`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ kiln_id: iapData.kiln_id, name: iapData.name, type: iapData.type, price: iapData.price.toString() }),
  });
    
  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param iapData 
 * @param etag 
 * @returns 
 */
 export const updateIAP = async (token: string, appId: string, iapData: IAP, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/iaps/${iapData.id}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'If-Match': etag,
    },
    body: JSON.stringify({ kiln_id: iapData.kiln_id, name: iapData.name, type: iapData.type, price: iapData.price.toString() }),
  });

  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param iapId 
 * @param etag 
 * @returns 
 */
 export const deleteIAP = async (token: string, appId: string, iapId: number, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/iaps/${iapId}`;
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