import * as yup from "yup";

export const schemaPatchAccountItem = () => {
  return yup.object().shape({
    ...schemaFieldAccountName(),
    ...schemaFieldAccountEmail(),
    ...schemaFieldAccountPosition(),
    ...schemaFieldAccountMobile(),
    ...schemaFieldAccountWhatsapp(),
    ...schemaFieldAccountSkype(),
    ...schemaFieldAccountWechat(),
  });
};

export const schemaFieldAccountName = () => {
  return {
    name: yup.string().max(64).required('Name required'),
  };
};

export const schemaFieldAccountEmail = () => {
  return {
    email: yup.string().max(80).email('Please enter a valid email').required('Email required'),
  };
};

export const schemaFieldAccountPosition = () => {
  return {
    position: yup.string().max(64).required('Position required'),
  };
};

export const schemaFieldAccountMobile = () => {
  return {
    mobile: yup.string().max(64),
  };
};

export const schemaFieldAccountWhatsapp = () => {
  return {
    whatsapp: yup.string().max(64),
  };
};

export const schemaFieldAccountSkype = () => {
  return {
    skype: yup.string().max(64),
  };
};

export const schemaFieldAccountWechat = () => {
  return {
    wechat: yup.string().max(64),
  };
};