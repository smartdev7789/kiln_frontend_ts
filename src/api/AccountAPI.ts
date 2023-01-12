import {
  Account,
  AccountPatch,
  APIResponse,
  PasswordPatch,
  Team,
} from "./DataTypes";
import { API_ENDPOINT, noTokenResponse } from "./API";

/**
 *
 * @param token
 * @param accountId
 * @returns
 */
export const getAccount = async (token: string, accountId: string) => {
  if (!token) return noTokenResponse;

  const url = `/v0.01/accounts/${accountId}`;
  const bearer = "Bearer " + token;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as APIResponse;
};

/**
 *
 * @param token
 * @param accountData
 * @param etag
 * @returns
 */
export const updateAccount = async (
  token: string,
  accountData: AccountPatch,
  etag: string
) => {
  if (!token) return noTokenResponse;

  const url = `/v0.01/accounts/${accountData.id}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
      "If-Match": etag,
    },
    body: JSON.stringify(accountData),
  });

  return (await res.json()) as APIResponse;
};

// Change password
export const changeAccountPassword = async (token: string, pwdData: PasswordPatch) => {
  const res = await fetch(`/v0.01/accounts/${pwdData.id}/password`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(pwdData),
  });
  return await res.json();
};

/**
 *
 * @param token
 * @param teamId
 * @returns
 */
export const getTeam = async (token: string, teamId: string) => {
  if (!token) return noTokenResponse;

  const url = `/v0.01/teams/${teamId}`;
  const bearer = "Bearer " + token;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as Team;
};

/**
 *
 * @param token
 * @param accountData
 * @param etag
 * @returns
 */
export const updateTeam = async (
  token: string,
  teamId: string,
  teamData: Team,
  etag: string,
  company_certificate?: File,
  vat_certificate?: File,
) => {
  if (!token) return noTokenResponse;

  const url = `/v0.01/teams/${teamId}`;

  const bearer = "Bearer " + token;
  const headers = {
    Authorization: bearer,
    Accept: "application/json",
    "If-Match": etag,
  };

  let jsonBody;
  const formData = new FormData();

  if (company_certificate || vat_certificate) {
    // We need to pass the values like this so they're not interpreted as a potential
    // invalid type on the backend
    formData.append("legal_name", `"${teamData.legal_name}"`);
    formData.append("legal_name_native", `"${teamData.legal_name_native}"`);
    formData.append("legal_address", `"${teamData.legal_address}"`);
    formData.append("legal_state_province", `"${teamData.legal_state_province}"`);
    formData.append("legal_country_code", `"${teamData.legal_country_code}"`);
    formData.append("legal_company_number", `"${teamData.legal_company_number}"`);
    formData.append("legal_vat_tax_number", `"${teamData.legal_vat_tax_number}"`);
        
    formData.append("support_dev_name", `"${teamData.support_dev_name}"`);
    formData.append("support_email", `"${teamData.support_email}"`);
    formData.append("support_privacy_policy", `"${teamData.support_privacy_policy}"`);
    formData.append("support_terms_of_service", `"${teamData.support_terms_of_service}"`);
    
    formData.append("bank_name", `"${teamData.bank_name}"`);
    formData.append("bank_address", `"${teamData.bank_address}"`);
    formData.append("bank_account_name", `"${teamData.bank_account_name}"`);
    formData.append("bank_account_type", `"${teamData.bank_account_type}"`);
    formData.append("bank_account_currency", `"${teamData.bank_account_currency}"`);
    formData.append("bank_account_number", `"${teamData.bank_account_number}"`);
    formData.append("bank_branch_name", `"${teamData.bank_branch_name}"`);
    formData.append("bank_number", `"${teamData.bank_number}"`);
    formData.append("bank_sort_code", `"${teamData.bank_sort_code}"`);
    formData.append("bank_iban", `"${teamData.bank_iban}"`);
    formData.append("bank_swiftbic", `"${teamData.bank_swiftbic}"`);
    formData.append("bank_ach_routing_number", `"${teamData.bank_ach_routing_number}"`);
    formData.append("bank_fedwire_routing_number", `"${teamData.bank_fedwire_routing_number}"`);
    
    company_certificate && formData.append("company_incorporation_certificate", company_certificate);
    vat_certificate && formData.append("vat_tax_certificate", vat_certificate);
  } else {
    //@ts-ignore
    headers["Content-Type"] = "application/json";

    jsonBody = {
      legal_name: teamData.legal_name,
      legal_name_native: teamData.legal_name_native,
      legal_address: teamData.legal_address,
      legal_state_province: teamData.legal_state_province,
      legal_country_code: teamData.legal_country_code,
      legal_company_number: teamData.legal_company_number,
      legal_vat_tax_number: teamData.legal_vat_tax_number,
      
      support_dev_name: teamData.support_dev_name,
      support_email: teamData.support_email,
      support_privacy_policy: teamData.support_privacy_policy,
      support_terms_of_service: teamData.support_terms_of_service,
      
      bank_name: teamData.bank_name,
      bank_address: teamData.bank_address,
      bank_account_name: teamData.bank_account_name,
      bank_account_type: teamData.bank_account_type,
      bank_account_currency: teamData.bank_account_currency,
      bank_account_number: teamData.bank_account_number,
      bank_branch_name: teamData.bank_branch_name,
      bank_number: teamData.bank_number,
      bank_sort_code: teamData.bank_sort_code,
      bank_iban: teamData.bank_iban,
      bank_swiftbic: teamData.bank_swiftbic,
      bank_ach_routing_number: teamData.bank_ach_routing_number,
      bank_fedwire_routing_number: teamData.bank_fedwire_routing_number,
      
    };
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers: headers,
    body: (company_certificate || vat_certificate) ? formData : JSON.stringify(jsonBody),
  });

  return (await res.json()) as APIResponse;
};

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
  const bearer = "Bearer " + token;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as APIResponse;
};

/**
 *
 * @param token
 * @param teamId
 * @param platformId
 * @returns
 */
export const getTeamPlatform = async (
  token: string,
  teamId: string,
  platformId: number
) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/teams/${teamId}/team_platforms/${platformId}`;
  const bearer = "Bearer " + token;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  return (await res.json()) as APIResponse;
};

/**
 *
 * @param token
 * @param teamId
 * @param platformId
 * @param extraData
 * @returns
 */
export const connectPlatform = async (
  token: string,
  teamId: string,
  platformId: number,
  extraData: string
) => {
  if (!token) return noTokenResponse;

  const url = `${API_ENDPOINT}/teams/${teamId}/team_platforms`;
  const bearer = "Bearer " + token;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
      Accept: "application/json",
    },
    body: JSON.stringify({
      platform: platformId,
      extras: extraData,
      connection_status: 1,
    }),
  });

  return (await res.json()) as APIResponse;
};
