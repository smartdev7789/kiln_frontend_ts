import { Account, AccountPatch, APIResponse, Team } from "./DataTypes";
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
export const updateAccount = async (token: string, accountData: AccountPatch, etag: string) => {
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
    body: JSON.stringify(accountData),
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

/**
 * 
 * @param token 
 * @param accountData 
 * @param etag 
 * @returns 
 */
  export const updateTeam = async (token: string, teamId: string, teamData: Team, etag: string, file?: File) => {
    if (!token) return noTokenResponse;
   
    const url = `${API_ENDPOINT}/teams/${teamId}`;
   
    const bearer = 'Bearer ' + token;
    const headers = {
      'Authorization': bearer,
      'Accept': "application/json",
      'If-Match': etag,
    };
    
    let jsonBody;
    const formData = new FormData();
    
    if (file) {
      // We need to pass the values like this so they're not interpreted as a potential
      // invalid type on the backend
      formData.append('team_name', `"${teamData.team_name}"`);
      formData.append('contact_email', `"${teamData.contact_email}"`);
      formData.append('contact_number', `"${teamData.contact_number}"`);
      formData.append('company_name', `"${teamData.company_name}"`);
      formData.append('company_number', `"${teamData.company_number}"`);
      formData.append('business_licence', file);
    }
    else {
      //@ts-ignore
      headers['Content-Type'] = 'application/json';

      jsonBody = {
        team_name: teamData.team_name,
        contact_email: teamData.contact_email,
        contact_number: teamData.contact_number,
        company_name: teamData.company_name,
        company_number: teamData.company_number,
      }
    }
    
    const res = await fetch(url, {
      method: "PATCH",
      headers: headers,
      body: file ? formData : JSON.stringify(jsonBody),
    }); 
    
    return (await res.json()) as APIResponse;
 }

 // Team Platforms

/**
 * 
 * @param token 
 * @param teamId 
 * @returns 
 */
export const getTeamPlatforms = async (token: string, teamId: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/teams/${teamId}/team_platforms`;
  const bearer = 'Bearer ' + token;
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
    },
  });

  return (await res.json()) as APIResponse;
}


/**
 * 
 * @param token 
 * @param teamId 
 * @param platformId 
 * @returns 
 */
export const getTeamPlatform = async (token: string, teamId: string, platformId: number) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/teams/${teamId}/team_platforms/${platformId}`;
  const bearer = 'Bearer ' + token;
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
    },
  });

  return (await res.json()) as APIResponse;
}

/**
 * 
 * @param token 
 * @param teamId 
 * @param platformId 
 * @param extraData 
 * @returns 
 */
export const connectPlatform = async (token: string, teamId: string, platformId: number, extraData: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/teams/${teamId}/team_platforms`;
  const bearer = 'Bearer ' + token;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
      Accept: "application/json",
    },
    body: JSON.stringify({ platform: platformId, extras: extraData, connection_status: 1 }),
  });

  return (await res.json()) as APIResponse;
}