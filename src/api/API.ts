import { User } from "./DataTypes";

const API_ENDPOINT = "http://localhost:3333";

const login = async (email: string, password: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/1`);
  return (await res.json()) as User;
};

const validate = async (token: string) => {
  const res = await fetch(`${API_ENDPOINT}/users/${token}`);
  return (await res.json()) as User;
};

export const API = {
  login,
  validate,
};
