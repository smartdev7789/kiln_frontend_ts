import {
  Login,
  Analytics,
  TopStats,
  User,
  Platform,
  AppSummary,
  AppInfo,
  BasicAppInfo,
  APIResponse,
} from "./DataTypes";

// Endpoint URL.
const API_ENDPOINT = process.env.REACT_APP_API_URI;

const makeHead = (method:string, token:string) => {
  const bearer = 'Bearer ' + token;
  const requestInit = { 
    method: method,
    mode: 'cors',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': bearer,
    },
  }
  console.log(requestInit);
  return requestInit
}

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
const analytics = async (
  platform: number | null,
  app_id: number | null,
  date: number | null,
  token: string | null
) => {
  

  const url = `${API_ENDPOINT}/stats/`;
  // const res = await fetch( url, makeHead('GET', token) );

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
      return (await res.json()) as Analytics;
    } else {
      return ( { graphs: [], stats: [] } );
    }
  } else {
    return ( { graphs: [], stats: [] } );
  }
};

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
 
  if ( token ) {
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
const updateApp = async (token: string, id: string, appData: AppInfo, etag: string) => {
  if (token !== '') {
    const url = `${API_ENDPOINT}/apps/${id}`;
    const bearer = 'Bearer ' + token;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'If-Match': etag,
        'Authorization': bearer,
      },
      body: JSON.stringify({ ...appData }),
    });
    return (await res.json()) as AppInfo;
  }
};

const resetPassword = async (email: string) => {
  const res = await fetch(`${API_ENDPOINT}/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};

const getTermsOfService = async (lang = "en") => {
  const res = await fetch(`${API_ENDPOINT}/tos/${lang}`);
  return (await res.json()) as { tos: string };
};

const acceptTermsOfService = async (lang = "en") => {
  const res = await fetch(`${API_ENDPOINT}/tos/${lang}`, { method: "POST" });
  return await res.json();
};

const updateAccountInfo = async (accountData: User) => {
  const res = await fetch(`${API_ENDPOINT}/users/${accountData.id}`);
  return await res.json();
};


export const API = {
  login,
  account,
  securityCheck,
  // validate, -> securityCheck
  analytics,
  topStats,
  platforms,
  apps,
  app,
  games: apps,
  createApp,
  updateApp,
  resetPassword,
  getTermsOfService,
  acceptTermsOfService,
  updateAccountInfo,
};
