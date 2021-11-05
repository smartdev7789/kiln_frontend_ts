import { APIResponse, AppService, ServiceCategory } from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";

/**
 * 
 * @param token 
 * @param category 
 * @returns 
 */
export const getSupportedServices = async (token: string, category?: number) => {
  if (!token) return noTokenResponse;

  const projection = '?projection={"id":1,"name":1,"category":1,"android_module":0}';

  const url = `${API_ENDPOINT}/services/${projection}`;

  let where = '';
  if (category) {
    where = `&where={"category":${category}}`;
  }

  const res = await fetch(url.concat(where), { 
    method: 'GET',
    mode: 'cors',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token,
    },
  });
  
  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @returns 
 */
export const getSupportedAdServices = async (token: string) => {
  return getSupportedServices(token, ServiceCategory.ADS);
}

/**
 * 
 * @param token 
 * @param appId 
 * @returns 
 */
export const getAppServices = async (token: string, appId: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/extras`
  
  const bearer = 'Bearer ' + token;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': bearer,
    },
  });
  
  return (await response.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param serviceId 
 * @param data 
 * @returns 
 */
export const createAppService = async (token: string, appId: string, service_id: number, category: number, extras: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/extras`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ service: service_id, category: category, extras: extras }),
  });
    
  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param appId 
 * @param data 
 * @param etag 
 * @returns 
 */
 export const updateAppService = async (token: string, appId: string, data: AppService, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/extras/${data.id}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'If-Match': etag,
    },
    body: JSON.stringify({ service: data.service, category: data.category, extras: data.extras }),
  });

  return (await res.json()) as APIResponse;
}


/**
 * 
 * @param token 
 * @param appId 
 * @param serviceId 
 * @param etag 
 * @returns 
 */
export const deleteAppService = async (token: string, appId: string, serviceId: number, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/extras/${serviceId}`;
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
    return ({ _status: 'OK' }) as APIResponse;
  }
  else {
    return ({ _status: 'ERR' }) as APIResponse;
  }
}