import { APIResponse } from "./DataTypes";

// Endpoint URL.
const API_ENDPOINT = process.env.REACT_APP_API_URI;

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

