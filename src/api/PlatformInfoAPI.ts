import { APIResponse, PlatformInfo } from "./DataTypes";
import { FieldValue } from "../hooks/useForm";
import { noTokenResponse, API_ENDPOINT } from "./API";

// Platform.

/**
 * Get all Platform info.
 * 
 * @param {string} token Security token.
 * @param {string} appID App UUID.
 * @param {number} platformID Platorm ID.
 * @returns Platform info.
 */
export const getAllPlatformsInfo = async (token: string, appID: string) => {
  if (!token) return noTokenResponse;

  const baseURL = `${API_ENDPOINT}/apps/${appID}/platforms_info/`
  const projection = '?projection={"platform":1}&embedded={"platform":1}'
  const url = baseURL+projection
  const bearer = 'Bearer ' + token;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': bearer,
    },
  });
  if (!response.ok) {
    // throw new Error("HTTP error, status = " + response.status);
    // TODO ... as APIResponse.
    return ({}) as PlatformInfo;
  }
  // return (await response.json()) as PlatformInfo;
  return (await response.json());
};

/**
 * Get Platform info.
 * 
 * @param {string} token Security token.
 * @param {string} appID App UUID.
 * @param {number} platformInfoID Platorm ID.
 * @returns Platform info.
 */
 export const getPlatformInfo = async (
    token: string,
    appID:string, 
    platformInfoID:number
  ) => {
    if ( token !== '' ) {
      const baseURL = `${API_ENDPOINT}/apps/${appID}/platforms_info/${platformInfoID}/`
      const projection = '?projection={"platform":1}&embedded={"platform": 1}'
      const url = baseURL+projection
      const bearer = 'Bearer ' + token;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': bearer,
        },
      });
      if (!response.ok) {
        // throw new Error("HTTP error, status = " + response.status);
        // TODO ... as APIResponse.
        return ({}) as PlatformInfo;
      }
      return (await response.json()) as PlatformInfo;
    }
};
  
/**
 * Create platform info.
 * 
 * @param {string} token 
 * @param {string} appID 
 * @param {number} platformID 
 * @param platformInfo
 * @returns 
 */
 export const createPlatformInfo = async (
    token: string, 
    appID:string, 
    platformID:number, 
    platformInfo:{ [key: string]: FieldValue } //
  ) => {
  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/apps/${appID}/platforms_info`
    const bearer = 'Bearer ' + token;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
      body: JSON.stringify({ resources: [], ...platformInfo }),
    });
    if (!response.ok) {
      // throw new Error("HTTP error, status = " + response.status);
      return ({}) as APIResponse;
    }
    return (await response.json()) as APIResponse;
  }
};
  
/**
 * Update platform info.
 * 
 * @param {string} token 
 * @param {string} appID 
 * @param {number} platformID 
 * @param platformInfo
 * @returns 
 */
export const updatePlatformInfo = async (
  token: string,
  appID:string,
  platformID:number, 
  platformInfo:{ [key: string]: FieldValue }, //
  etag: string
  ) => {
  
  if (!token) return noTokenResponse;
  
  const url = `${API_ENDPOINT}/apps/${appID}/platforms_info/${platformID}/`
  const bearer = 'Bearer ' + token;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json', 
      'If-Match': etag,
      'Authorization': bearer,
    },
    body: JSON.stringify({ ...platformInfo }),
  });
  
  return (await response.json()) as APIResponse;
};