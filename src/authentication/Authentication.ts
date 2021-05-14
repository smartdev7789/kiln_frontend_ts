import { API } from "../api/API";
// import { User } from "../api/DataTypes";

const StorageString = "gamebake-token";

export const getToken = () => {
  const token: string | null = localStorage.getItem(StorageString);
  if ( token === "undefined" ) {
    return null
  } else {
    return token;
  }
};

export const storeToken = (token: string) => {
  localStorage.setItem(StorageString, token);
};

export const clearToken = () => {
  localStorage.removeItem(StorageString);
};

export const handleSuccessfulLogin = (token: string) => {
  storeToken(token);
};

export const validateToken = () => {
  const token = getToken();
  if (typeof token === "string") return API.securityCheck(token);
  else return Promise.reject();
};

export const logOut = () => {
  clearToken();
};

export const Authentication = {
  handleSuccessfulLogin,
  validateToken,
  clearToken,
  logOut,
};
