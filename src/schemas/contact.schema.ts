import * as yup from "yup";

export const schemaCreateContact = () => {
  return yup.object().shape({
    ...schemaFieldContactName(),
    ...schemaFieldContactCompanyName(),
    ...schemaFieldContactEmail(),
    ...schemaFieldContactAccount(),
    ...schemaFieldContactCountry(),
    ...schemaFieldContactWebsite(),
    ...schemaFieldContactMessage(),
  });
};

export const schemaFieldContactName = () => {
  return {
    name: yup.string().required('Name required'),
  };
};

export const schemaFieldContactCompanyName = () => {
  return {
    companyName: yup.string().required('Company Name required'),
  };
};

export const schemaFieldContactEmail = () => {
  return {
    email: yup.string().email('Please enter a valid email').required('Email required'),
  };
};

export const schemaFieldContactAccount = () => {
  return {
    account: yup.string().url('Game URL required').required('Game URL required'),
  };
};

export const schemaFieldContactCountry = () => {
  return {
    country: yup.string().required('Country required'),
  };
};

export const schemaFieldContactWebsite = () => {
  return {
    website: yup.string().url('Please enter a valid URL').required('Please enter a valid URL'),
  };
};

export const schemaFieldContactMessage = () => {
  return {
    message: yup.string().required('Message required'),
  };
};
