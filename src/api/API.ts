import {
  Login,
  AppInfo,
  BasicAppInfo,
  APIResponse,
} from "./DataTypes";

import { createIAP, deleteIAP, updateIAP } from "./IapAPI";
import { createLeaderboard, deleteLeaderboard, updateLeaderboard } from "./LeaderboardAPI";
import {
  getAccount,
  updateAccount,
  getTeam,
  updateTeam,
  getTeamPlatforms,
  getTeamPlatform,
  connectPlatform
} from "./AccountAPI";

import {
  getAllPlatformsInfo,
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

import {
  getAppReleases,
  getAppRelease,
  createAppRelease,
  updateAppRelease,
  deleteAppRelease,
  processReleases,
  downloadReleaseBuild,
  publishRelease,
  deleteReleaseBuild
} from "./ReleasesAPI";

import {
  getSupportedAdServices,
  getSupportedServices,
  getAppServices,
  createAppService,
  updateAppService,
  deleteAppService
} from "./ServicesAPI"

import { stats, topStats, graphs, accountEarningsStats, accountEarningsRangeStats } from "./StatsAPI";

// API.
const API_VERSION = process.env.REACT_APP_API_VERSION
export const API_ADDRESS = process.env.REACT_APP_API_ADDRESS
export const API_ENDPOINT = `${API_ADDRESS}/${API_VERSION}`
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
  
  if (res.status === 200 ) {
     return (await res.json()) as Login;
  } else {
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
  if (!token) return noTokenResponse;

  const baseUrl = `${API_ENDPOINT}/apps/${id}`
  const projection = '?projection={"platforms_info":1,"ads":1,"iaps":1,"events":1,"leaderboards":1}&embedded={"platforms_info":1,"ads":1,"iaps":1,"events":1,"leaderboards":1}'
  const url = `${baseUrl}/${projection}`
  const bearer = 'Bearer ' + token;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': bearer,
    },
  });

  return (await response.json()) as AppInfo;
};


// Aditon App info (Ver api/DataTypes.ts/AppInfo)
const additionalAppInfo = {
  platforms_info: [],
  leaderboards: [],
  iaps: [],
  stats: [],
  graphs: [],
};

// Create App
const createApp = async (token: string | null, appData: BasicAppInfo) => {
  if (!token) return noTokenResponse;

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

  return (await res.json()) as APIResponse;
};

// Update App
const updateApp = async (token: string, id: string, data: AppInfo, etag: string) => {
  if (!token) return noTokenResponse;

  console.log(data);

  const url = `${API_ENDPOINT}/apps/${id}`;
  const bearer = 'Bearer ' + token;
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

export const API = {
  // Accounts and more
  login,
  securityCheck,
  resetPassword,
  resetPasswordValidateToken,
  changePassword,
  getTermsOfService,
  acceptTermsOfService,
  getAccount,
  updateAccount,
  getTeam,
  updateTeam,
  getTeamPlatforms,
  getTeamPlatform,
  connectPlatform,
  // Stats and graphs
  stats,
  graphs,
  topStats,
  accountEarningsStats,
  accountEarningsRangeStats,
  // App
  platforms,
  apps,
  app,
  games: apps,
  createApp,
  updateApp,
  // IAPs
  createIAP,
  deleteIAP,
  updateIAP,
  // Leaderboards
  createLeaderboard,
  deleteLeaderboard,
  updateLeaderboard,
  // Platforms Info
  getAllPlatformsInfo,
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
  getAppRelease,
  createAppRelease,
  updateAppRelease,
  deleteAppRelease,
  processReleases,
  downloadReleaseBuild,
  publishRelease,
  deleteReleaseBuild,
  // Services
  getSupportedAdServices,
  getSupportedServices,
  getAppServices,
  createAppService,
  updateAppService,
  deleteAppService,
};
