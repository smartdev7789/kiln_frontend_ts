import {
  Login,
  TopStats,
  // GraphData,
  User,
  // Platform,
  // AppSummary,
  AppInfo,
  // AppInfoPatch,
  BasicAppInfo,
  APIResponse,
  Filter,
  // AppInfoPatch,
  Release,
} from "./DataTypes";

import { createAd, deleteAd, updateAd } from "./AdAPI";
import { createIAP, deleteIAP, updateIAP } from "./IapAPI";

import { yesterday } from "../libs/date"
import {
  getPlatformInfo,
  updatePlatformInfo,
  createPlatformInfo
} from "./PlatformInfoAPI"

import { 
  getAllResources,
  getResource,
  addResource,
  deleteResource
} from "./ResourcesAPI"

// API.
export const API_ADDRESS = process.env.REACT_APP_API_ADDRESS
export const API_VERSION = process.env.REACT_APP_API_VERSION
export const API_ENDPOINT = `${API_ADDRESS}/${API_VERSION}`


// const makeHead = (method:string, token:string) => {
//   const bearer = 'Bearer ' + token;
//   const requestInit = { 
//     method: method,
//     mode: 'cors',
//     headers: { 
//       'Content-Type': 'application/json', 
//       'Authorization': bearer,
//     },
//   }
//   console.log(requestInit);
//   return requestInit
// }

export const noTokenResponse = {
  "_status": "ERR",
  "_error": {
    "message": "No token"
  }
} as APIResponse;

// Login.
const login = async (email: string, password: string) => {
  const postData = { email, password };
  const url = `${API_ENDPOINT}/login`;
  const res = await fetch( 
    url, 
    { 
      method: 'POST', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)  
    }
  );
  console.log(JSON.stringify(postData));
  if (res.status === 200 ) {
    return (await res.json()) as Login;
  } else {
    console.log(await res.json());
    return ( { "token": null, "account": null } ) as Login;
  }
};

// Security Check.
const securityCheck = async (token: string) => {
  const url = `${API_ENDPOINT}/security_check`;
  const bearer = 'Bearer ' + token;
  const res = await fetch( url, 
    { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    }
  );
  
  if (res.status === 200 ) {
    // { "response": "success" }
    return (await res.json());
  } else {
    return ( { "response": "fail" } );
  }
};

// Security Check.
const account = async (token: string, accouut_ID: string) => {
  const url = `${API_ENDPOINT}/accounts/${accouut_ID}`;
  const bearer = 'Bearer ' + token;
  const res = await fetch( url, 
    { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': bearer,
      },
    }
  );
  
  if (res.status === 200 ) {
    // { "response": "success" }
    return (await res.json());
  } else {
    return ( { "response": "fail" } );
  }
};

// TODO
const stats = async ( filters:Filter, token:string | null ) => {
  // http://localhost:5000/v0.01/stats?where={"application_id":"b0ca2dae-836a-422c-98e0-858526651edf","platform_id":1}
  const url = `${API_ENDPOINT}/stats/`;
  // const res = await fetch( url, makeHead('GET', token) );

  let where = ''
  switch (filters.date) {
    case '0':
      let date = yesterday()
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id},"date":"${date}"}`;
      break
    case '4':
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id}}`;
      break
    default:
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id}}`;
  }

  if ( token ) {
    const bearer = 'Bearer ' + token;
    const res = await fetch( url.concat(where),
      { 
        method: 'GET',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': bearer,
        },
      }
    );
    if (res.status === 200 ) {
      return (await res.json()) as APIResponse;
    } else {
      return null
    }
  } else {
    return null
  }
};

// TopStats
const topStats = async (token: string | null) => {
  // const res = await fetch(`${API_ENDPOINT}/stats/top`);  
  const url = `${API_ENDPOINT}/stats/top`;
  
  if ( token ) {
    const bearer = 'Bearer ' + token;
    const res = await fetch( url, 
      { 
        method: 'GET',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': bearer,
        },
      }
    );
    if (res.status === 200 ) {
      return ( await res.json() ) as TopStats;
    } else {
      return ( { top_games: [], top_platforms: [] } );
    }
  } else {
    return ( { top_games: [], top_platforms: [] } );
  }
};

// Graphs.
const graphs = async (token: string | null, filters:Filter) => {
  // ?where={"application_id":"b0ca2dae-836a-422c-98e0-858526651edf", "platform_id":1, "date":"2021-05-21"}
  // const url = `${API_ENDPOINT}/graphs?where={"application_id":${filters.application_id},"platform_id":${filters.platform_id},"date":"${filters.date}"}`;
  const url = `${API_ENDPOINT}/graphs`

  // "yesterday":"0",
  // "last7Days": "1",
  // "last14Days": "2",
  // "last30Days": "3",
  // "allTime": "4",

  let where = ''
  switch (filters.date) {
    case '0':
      let date = yesterday()
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id},"date":"${date}"}`;
      break
    case '4':
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id}}`;
      break
    default:
      where = `?where={"application_id":"${filters.application_id}","platform_id":${filters.platform_id}}`;
  }
  
  // console.log(url.concat(where))
  
  if ( token ) {
    const bearer = 'Bearer ' + token;
    const res = await fetch( url.concat(where),
      { 
        method: 'GET',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': bearer,
        },
      }
    );
    if (res.status === 200 ) {
      return ( await res.json() ) as APIResponse;
    } else {
      return null
    }
  } else {
    return null
  }
};

// Get all Platforms.
const platforms = async ( token: string | null ) => {
  if ( token ) {
    const url = `${API_ENDPOINT}/platforms/`
    const bearer = 'Bearer ' + token;
    const res = await fetch( url, 
        { 
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': bearer,
          },
        }
      );
      
    if (res.status === 200 ) {
      return ( await res.json() );
    } else {
      return {'_items':[]};
    }
  } else {
    return {'_items':[]};
  }
};

// Get all Apps (of user login?).
const apps = async (token: string | null) => {
 
  if ( token !== '' ) {
    // const url = `${API_ENDPOINT}/apps`;
    const url = `${API_ENDPOINT}/apps`;
    const bearer = 'Bearer ' + token;
    const res = await fetch( url, 
      { 
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': bearer,
        },
      }
    );
    if (res.status === 200 ) {
      return (await res.json());
    } else {
      return {'_items':[]};
    }
  } else {
    return {'_items':[]};
  }
  
};

// Get App.
const app = async (token: string, id: string) => {
  if ( token !== '' ) {
    const baseUrl = `${API_ENDPOINT}/apps/${id}`
    const projection = '?projection={"platforms_info":1,"ads":1,"iaps":1}&embedded={"platforms_info":1,"ads":1,"iaps":1}'
    const url = `${baseUrl}/${projection}`
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
    return (await response.json()) as AppInfo;
  }
};


// Aditon App info (Ver api/DataTypes.ts/AppInfo)
const additionalAppInfo = {
  platforms_info: [],
  leaderboards: [],
  iaps: [],
  events: [],
  ads: [],
  stats: [],
  graphs: [],
};

// Create App
const createApp = async (token: string | null, appData: BasicAppInfo) => {
  if ( token ) {
    const url = `${API_ENDPOINT}/apps`;
    const bearer = 'Bearer ' + token;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer,
        Accept: "application/json",
      },
      body: JSON.stringify({ ...appData, ...additionalAppInfo }),
    });
    if (res.status === 200 ) {
      return ( await res.json() ) as APIResponse;
    } else {
      return ( await res.json() ) as APIResponse;
    }
    
  } else {
    let noToken = {
      "_status" : "ERR",
      "_error": {
        "message": "No token"
      }
    }
    return noToken as APIResponse;
  }

};

// Update App
const updateApp = async (token: string, id: string, data: AppInfo, etag: string) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${id}`;
  const bearer = 'Bearer ' + token;

  try {
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'If-Match': etag,
        'Authorization': bearer,
      },
    });
  
    return (await res.json()) as APIResponse;
  }
  catch (err) {
    console.log(err);
  }
};

const getAppReleases = async (token: string, appId: string) => {
  if (token === '') return;

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

const createAppRelease = async (token: string, appId: string, releaseData: Release, file?: File) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/apps/${appId}/releases`;

  const bearer = 'Bearer ' + token;
  const headers = {
    'Authorization': bearer,
    'Accept': "application/json",
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
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: file ? formData : JSON.stringify({ ...releaseData }),
    });

    return (await res.json()) as APIResponse;
  }
  catch (err) {
    console.log(err);

    let noToken = {
      "_status": "ERR",
      "_error": {
        "message": "editGame.releases.form.duplicateName"

      }
    }
    return noToken as APIResponse;
  }
};

const updateAppRelease = async (token: string, appId: string, releaseData: Release, etag: string, file?: File) => {
  if (token === '') {
    return {
      "_status": "ERR",
      "_error": {
        "message": "No token"
      }
    } as APIResponse;
  }

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

  let tete = await res.json();
  console.log(tete);
  return (tete) as APIResponse;
  // return (await res.json()) as APIResponse;
};

const deleteAppRelease = async (token: string, appId: string, releaseData: Release, etag: string) => {
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

const resetPassword = async (email: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/forgot_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};

// Reset password validate tokern
const resetPasswordValidateToken = async (token: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/reset_password?token=${token}`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
};

// Change password
const changePassword = async (password: string, passwordConfirmation: string, token: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/change_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({password: password, confirm_password: passwordConfirmation, token: token}),
  });
  return await res.json();
};

// Get terms of service
const getTermsOfService = async (lang = "en") => {
  const res = await fetch(`${API_ENDPOINT}/tos/${lang}`);
  return (await res.json()) as { tos: string };
};

// Accept terms of service.
const acceptTermsOfService = async (lang = "en") => {
  const res = await fetch(`${API_ENDPOINT}/tos/${lang}`, { method: "POST" });
  return await res.json();
};

// Update account info.
const updateAccountInfo = async (accountData: User) => {
  const res = await fetch(`${API_ENDPOINT}/users/${accountData.id}`);
  return await res.json();
};


export const API = {
  // Users, account and more
  login,
  account,
  securityCheck,
  resetPassword,
  resetPasswordValidateToken,
  changePassword,
  getTermsOfService,
  acceptTermsOfService,
  updateAccountInfo,
  // Stats and graphs
  stats,
  graphs,
  topStats,
  platforms,
  apps,
  app,
  games: apps,
  createApp,
  updateApp,
  // Ads
  createAd,
  deleteAd,
  updateAd,
  // IAPs
  createIAP,
  deleteIAP,
  updateIAP,
  // updateAppAd,
  // Platforms Info
  getPlatformInfo,
  createPlatformInfo,
  updatePlatformInfo,
  // Resources
  getAllResources,
  getResource,
  addResource,
  deleteResource,
  // Releases
  getAppReleases,
  createAppRelease,
  updateAppRelease,
  deleteAppRelease,
};
