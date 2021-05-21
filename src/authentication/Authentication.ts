import { API } from "../api/API";
import { Account } from "../api/DataTypes";

const StorageString = "gamebake-token";
const StoreAccount = "kiln-account";

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

const storeAccount = (account: Account | null) => {
  localStorage.setItem(StoreAccount, JSON.stringify(account));
};

export const clearToken = () => {
  localStorage.removeItem(StorageString);
};

export const handleSuccessfulLogin = (token: string, account: Account | null) => {
  storeToken(token);
  storeAccount(account);
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
