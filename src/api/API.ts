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
  Filter
} from "./DataTypes";

import { yesterday } from "../libs/date"
import {
  getPlatformInfo,
  updatePlatformInfo,
  createPlatformInfo
} from "./PlatformInfo"

// Endpoint URL.
const API_ENDPOINT = process.env.REACT_APP_API_URI;

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

// Login.
const login = async (username: string, password: string) => {
  const postData = { username, password };
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
    const url = `${API_ENDPOINT}/apps/${id}`
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
const updateApp = async (token: string, id: string, data:AppInfo, etag: string) => {

  if (token !== '') {
    const url = `${API_ENDPOINT}/apps/${id}`;
    const bearer = 'Bearer ' + token;

    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify( data ),
      headers: {
        'Content-Type': 'application/json',
        'If-Match': etag,
        'Authorization': bearer,
      },
    });
    return (await res.json()) as APIResponse;
  }
};

// Reset password
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
  login,
  account,
  securityCheck,
  // validate, -> securityCheck
  stats,
  graphs,
  topStats,
  platforms,
  apps,
  app,
  games: apps,
  createApp,
  updateApp,
  getPlatformInfo,
  createPlatformInfo,
  updatePlatformInfo,
  resetPassword,
  resetPasswordValidateToken,
  changePassword,
  getTermsOfService,
  acceptTermsOfService,
  updateAccountInfo,
};
