import { noTokenResponse } from "./API";
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
 * @param {number} platformInfoID App Platform Info ID.
 * @param {number} id Resources ID.
 * @returns Platform info.
 */
  export const getResource = async (token: string, appPlatformInfoID: number, id: string) => {
    if (!token) return noTokenResponse;
    
    const url = `${API_ENDPOINT}/platforms_info/${appPlatformInfoID}/resources/${id}`
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
};

/**
 * Add new resource.
 * 
 * @param {string} token Security token.
 * @param {number} platformInfoID Platform info ID.
 * @returns Platform info.
 */
export const addResource = async ( token: string, platformInfoID: number, type: string, file: File ) => {
    // console.log(type)
    // console.log(file)
    // console.log(platformInfoID)
    // console.log(token)

  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/platforms_info/${platformInfoID}/resources/`
    const bearer = 'Bearer ' + token
    const id =  `${Date.now()}`
    


    const formData = new FormData();
    formData.append('id', id)
    formData.append('type', type)
    formData.append('file', file)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': "application/json",
        'Authorization': bearer
      },
      'body': formData
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
  platformInfoID: number,
  resourceID: number,
  eTag: string,
) => {
  if ( token !== '' ) {
    const url = `${API_ENDPOINT}/platforms_info/${platformInfoID}/resources/${resourceID}`
    const bearer = 'Bearer ' + token;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'If-Match': eTag,
        'Authorization': bearer,
      },
    });
    if ( response.status === 204 ) {
      return ( { _status: 'OK' }) as APIResponse;
    } else {
      return ( { _status: 'ERR'} ) as APIResponse;
    }
  }
};