import { APIResponse, Release } from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";
import axios from "axios";

/**
 * 
 * @param token 
 * @param appId 
 * @returns 
 */
export const getAppReleases = async (token: string, appId: string) => {
  if (!token) return noTokenResponse;

  const baseUrl = `${API_ENDPOINT}/apps/${appId}/releases?sort=-_created`;
  const projection = '&projection={"regions":1,"builds":1}&embedded={"builds":1}';
  const url = baseUrl + projection;
  
  const bearer = 'Bearer ' + token;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': bearer,
    },
  });
  
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }

  return (await response.json()) as APIResponse;
};

/**
 * 
 * @param token 
 * @param appId 
 * @param releaseData 
 * @param file 
 * @returns 
 */
export const createAppRelease = async (token: string, appId: string, releaseData: Release, file?: File, onProgress?: (e: any) => void) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/releases`;

  const bearer = 'Bearer ' + token;
  const headers = {
    'Authorization': bearer,
    'Accept': "application/json",
  }
  
  const formData = new FormData();
  if (file) {
    formData.append('name', `"${releaseData.name}"`);
    formData.append('changelog', `"${releaseData.changelog}"`);
    formData.append('package', file)
  }
  else {
    //@ts-ignore
    headers['Content-Type'] = 'application/json';
  }

  if (file) {
    const res = await axios.post(url, formData, {
      onUploadProgress: onProgress,
      headers
    });

    return res.data as APIResponse;
  }
  else {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: file ? formData : JSON.stringify({ ...releaseData }),
    })
  
    return (await res.json()) as APIResponse;
  }
};

/**
 * 
 * @param token 
 * @param appId 
 * @param releaseData 
 * @param etag 
 * @param file 
 * @returns 
 */
export const updateAppRelease = async (token: string, appId: string, releaseData: Release, etag: string, file?: File, onProgress?: (e: any) => void) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/releases/${releaseData.id}`;
  
  const bearer = 'Bearer ' + token;
  const headers = {
    'Authorization': bearer,
    'Accept': "application/json",
    'If-Match': etag,
  }
  
  const formData = new FormData();
  if (file) {
    formData.append('name', releaseData.name);
    formData.append('changelog', releaseData.changelog);
    formData.append('package', file)
  }
  else {
    //@ts-ignore
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers: headers,
    body: file ? formData : JSON.stringify(releaseData),
  });

  return (await res.json()) as APIResponse;
};

/**
 * 
 * @param token 
 * @param appId 
 * @param releaseData 
 * @param etag 
 * @returns 
 */
export const deleteAppRelease = async (token: string, appId: string, releaseData: Release, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/releases/${releaseData.id}`;
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
};

/**
 * Process a release APK for one or more platforms
 * @param token 
 * @param appId 
 * @param releaseId 
 * @param platforms Optionally an array of platforms id to process for. If not provided it'll process for all platforms
 * @returns 
 */
export const processReleases = async (token: string, appId: string, releaseId: number, platforms?: number[]) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/releases/${releaseId}/process`;
  
  const body = { platforms: platforms || "all" };
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return (await res.json()) as APIResponse;
}

/**
 * Returns a URL for downloading a build given its download token
 * @param downloadToken 
 * @returns 
 */
export const downloadReleaseBuild = (downloadToken: string) => {
  const url = `${API_ENDPOINT}/down_build/${downloadToken}`;
  
  return url;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param releaseId 
 * @param platforms 
 * @returns 
 */
export const publishRelease = async (token: string, appId: string, releaseId: number, platforms?: number[]) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/releases/${releaseId}/publish`;

  const body = { platforms: platforms || "all" };
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param releaseId 
 * @param platforms 
 * @returns 
 */
export const deleteReleaseBuild = async (token: string, appId: string, releaseId: number, buildId: number) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/releases/${releaseId}/platforms/${buildId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 204) {
    return ({_status: 'OK'}) as APIResponse;
  }
  else {
    return ({_status: 'ERR'}) as APIResponse;
  }
}