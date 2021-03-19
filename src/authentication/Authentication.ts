import { API } from "../api/API";
import { User } from "../api/DataTypes";

const StorageString = "gamebake-token";

export const getToken = () => {
  return localStorage.getItem(StorageString);
};

export const storeToken = (token: string) => {
  localStorage.setItem(StorageString, token);
};

export const clearToken = () => {
  localStorage.removeItem(StorageString);
};

export const handleSuccessfulLogin = (response: User) => {
  storeToken(response.id.toString());
};

export const validateToken = () => {
  const token = getToken();

  if (typeof token === "string") return API.validate(token);
  else return Promise.reject();
};

export const logOut = () => {
  clearToken();
};

export const Authentication = {
  handleSuccessfulLogin,
  validateToken,
  logOut,
};
