import { APIResponse } from "./DataTypes";

// API.
const API_ADDRESS = process.env.REACT_APP_API_ADDRESS
const API_VERSION = process.env.REACT_APP_API_VERSION
const API_ENDPOINT = `${API_ADDRESS}/${API_VERSION}`

// Resources.

/**
 * Get all Resources info.
 * 
 * @param {string} token Security token.
 * @param {number} platformInfoID Platform info ID.
 * @returns Platform info.
 */
 export const getAllResources = async (
  token: string,
  platformInfoID:number
) => {
  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/platforms_info/${platformInfoID}/resources/`   
    const bearer = 'Bearer ' + token;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    });
    if (!response.ok) {
      return ({}) as APIResponse;
    }
    return (await response.json()) as APIResponse;
  }
};


/**
 * Get resource info.
 * 
 * @param {string} token Security token.
 * @param {number} platformInfoID Platform info ID.
 * @returns Platform info.
 */
 export const getResource = async (
  token: string,
  platformInfoID:number
) => {
  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/platforms_info/${platformInfoID}/resources/`   
    const bearer = 'Bearer ' + token;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    });
    if (!response.ok) {
      return ({}) as APIResponse;
    }
    return (await response.json()) as APIResponse;
  }
};

/**
 * Add new resource.
 * 
 * @param {string} token Security token.
 * @param {number} platformInfoID Platform info ID.
 * @returns Platform info.
 */
 export const addResource = async (
  token: string,
  platformInfoID:number
) => {
  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/platforms_info/${platformInfoID}/resources/`   
    const bearer = 'Bearer ' + token;
    const id =  Date.now();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    });
    if (!response.ok) {
      return ({}) as APIResponse;
    }
    return (await response.json()) as APIResponse;
  }
};


/**
 * Update resource info.
 * 
 * @param {string} token Security token.
 * @param {number} platformInfoID Platform info ID.
 * @returns Platform info.
 */
 export const updateResource = async (
  token: string,
  platformInfoID:number
) => {
  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/platforms_info/${platformInfoID}/resources/`   
    const bearer = 'Bearer ' + token;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    });
    if (!response.ok) {
      return ({}) as APIResponse;
    }
    return (await response.json()) as APIResponse;
  }
};

/**
 * Delete resource.
 * 
 * @param {string} token Security token.
 * @param {number} platformInfoID Platform info ID.
 * @returns Platform info.
 */
 export const deleteResource = async (
  token: string,
  platformInfoID:number
) => {
  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/platforms_info/${platformInfoID}/resources/`   
    const bearer = 'Bearer ' + token;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    });
    if (!response.ok) {
      return ({}) as APIResponse;
    }
    return (await response.json()) as APIResponse;
  }
};