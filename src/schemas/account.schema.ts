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

export const schemaPatchAccountPassword = () => {
  return yup.object().shape({
    ...schemaFieldAccountPassword(),
    ...schemaFieldAccountNewPassword(),
    ...schemaFieldAccountConfirmNewPassword(),
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

export const schemaFieldAccountPassword = () => {
  return {
    password: yup.string().required('Password required'),
  }
}

export const schemaFieldAccountNewPassword = () => {
  return {
    new_password: yup.string().required('New password required'),
  }
}

export const schemaFieldAccountConfirmNewPassword = () => {
  return {
    confirm_password: yup.string().required('Confirm password required').oneOf([yup.ref('new_password')], 'Passwords does not match'),
  }
}