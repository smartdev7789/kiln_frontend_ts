import * as yup from "yup";

const REQUIRED = 'Required';

export const schemaPatchTeamItem = () => {
  return yup.object().shape({
    legal_name: yup.string().nullable().max(64).required(REQUIRED),
    legal_name_native: yup.string().nullable().max(64).required(REQUIRED),
    legal_address: yup.string().nullable().max(64).required(REQUIRED),
    legal_state_province: yup.string().nullable().max(64).required(REQUIRED),
    legal_country_code: yup.string().nullable().max(64).required(REQUIRED),
    legal_company_number: yup.string().nullable().max(64).required(REQUIRED),
    support_dev_name: yup.string().nullable().max(64).required(REQUIRED),
    support_email: yup.string().nullable().max(64).email('Please enter a valid email').required(REQUIRED),
    support_privacy_policy: yup.string().nullable().max(64).required(REQUIRED),
    support_terms_of_service: yup.string().nullable().max(64).required(REQUIRED),
    bank_name: yup.string().nullable().max(64).required(REQUIRED),
    bank_address: yup.string().nullable().max(64).required(REQUIRED),
    bank_account_name: yup.string().nullable().max(64).required(REQUIRED),
    bank_account_type: yup.string().nullable().max(64).required(REQUIRED),
    bank_account_currency: yup.string().nullable().max(64).required(REQUIRED),
    bank_account_number: yup.string().nullable().max(64).required(REQUIRED),
    bank_number: yup.string().nullable().max(64).required(REQUIRED),
    bank_iban: yup.string().nullable().max(64).required(REQUIRED),
    bank_swiftbic: yup.string().nullable().max(64).required(REQUIRED),
    bank_ach_routing_number: yup.string().nullable().max(64).required(REQUIRED),
    bank_fedwire_routing_number: yup.string().nullable().max(64).required(REQUIRED),
  });
};
