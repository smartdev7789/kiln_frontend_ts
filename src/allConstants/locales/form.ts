const FORM_TEXT = 'form:';

export const FORM_LOCALES_TEXT = {
  form: {
    input: {
      optional: FORM_TEXT + 'input.optional',
      firstName: {
        label: FORM_TEXT + 'input.firstName.label',
        placeholder: FORM_TEXT + 'input.firstName.placeholder',
      },
      lastName: {
        label: FORM_TEXT + 'input.lastName.label',
        placeholder: FORM_TEXT + 'input.lastName.placeholder',
      },
      phone: {
        label: FORM_TEXT + 'input.phone.label',
        placeholder: FORM_TEXT + 'input.phone.placeholder',
        selectPlaceholder: FORM_TEXT + 'input.phone.selectPlaceholder',
        validationMessage: FORM_TEXT + 'input.phone.validationMessage',
      },
      email: {
        label: FORM_TEXT + 'input.email.label',
        placeholder: FORM_TEXT + 'input.email.placeholder',
        validationMessage: {
          alreadyExist: FORM_TEXT + 'input.email.validationMessage.alreadyExist',
        },
      },
      password: {
        label: FORM_TEXT + 'input.password.label',
        placeholder: FORM_TEXT + 'input.password.placeholder',
        validationMessage: {
          minLowercase: FORM_TEXT + 'input.password.validationMessage.minLowercase',
          minUppercase: FORM_TEXT + 'input.password.validationMessage.minUppercase',
          minNumbers: FORM_TEXT + 'input.password.validationMessage.minNumbers',
          minSymbols: FORM_TEXT + 'input.password.validationMessage.minSymbols',
        },
        newPassword: {
          label: FORM_TEXT + 'input.password.newPassword.label',
          placeholder: FORM_TEXT + 'input.password.newPassword.placeholder',
        },
        confirmPassword: {
          label: FORM_TEXT + 'input.password.confirmPassword.label',
          placeholder: FORM_TEXT + 'input.password.confirmPassword.placeholder',
          validationMessage: FORM_TEXT + 'input.password.confirmPassword.validationMessage',
        },
      },
      clinic: {
        avatar: {
          title: FORM_TEXT + 'input.clinic.avatar.title',
          subtitle: FORM_TEXT + 'input.clinic.avatar.subtitle',
          selectText: FORM_TEXT + 'input.clinic.avatar.selectText',
          validationMessage: FORM_TEXT + 'input.clinic.avatar.validationMessage',
        },
        name: {
          label: FORM_TEXT + 'input.clinic.name.label',
          placeholder: FORM_TEXT + 'input.clinic.name.placeholder',
        },
        domain: {
          label: FORM_TEXT + 'input.clinic.domain.label',
          placeholder: FORM_TEXT + 'input.clinic.domain.placeholder',
          validationMessage: {
            notValid: FORM_TEXT + 'input.clinic.domain.validationMessage.notValid',
            alreadyExist: FORM_TEXT + 'input.clinic.domain.validationMessage.alreadyExist',
          },
        },
        website: {
          label: FORM_TEXT + 'input.clinic.website.label',
          placeholder: FORM_TEXT + 'input.clinic.website.placeholder',
          validationMessage: FORM_TEXT + 'input.clinic.website.validationMessage',
        },
        country: {
          label: FORM_TEXT + 'input.clinic.country.label',
          placeholder: FORM_TEXT + 'input.clinic.country.placeholder',
        },
        currency: {
          label: FORM_TEXT + 'input.clinic.currency.label',
          placeholder: FORM_TEXT + 'input.clinic.currency.placeholder',
        },
        timeZone: {
          label: FORM_TEXT + 'input.clinic.timeZone.label',
          placeholder: FORM_TEXT + 'input.clinic.timeZone.placeholder',
        },
        description: {
          label: FORM_TEXT + 'input.clinic.description.label',
          placeholder: FORM_TEXT + 'input.clinic.description.placeholder',
        },
      },
      creditCard: {
        holderName: {
          label: FORM_TEXT + 'input.creditCard.holderName.label',
          placeholder: FORM_TEXT + 'input.creditCard.holderName.placeholder',
          validationMessage: FORM_TEXT + 'input.creditCard.holderName.validationMessage',
        },
        number: {
          label: FORM_TEXT + 'input.creditCard.number.label',
          placeholder: FORM_TEXT + 'input.creditCard.number.placeholder',
          validationMessage: FORM_TEXT + 'input.creditCard.number.validationMessage',
        },
        expiry: {
          label: FORM_TEXT + 'input.creditCard.expiry.label',
          placeholder: FORM_TEXT + 'input.creditCard.expiry.placeholder',
          validationMessage: FORM_TEXT + 'input.creditCard.expiry.validationMessage',
        },
        cvc: {
          label: FORM_TEXT + 'input.creditCard.cvc.label',
          placeholder: FORM_TEXT + 'input.creditCard.cvc.placeholder',
          validationMessage: FORM_TEXT + 'input.creditCard.cvc.validationMessage',
        },
      },
      contact: {
        lastName: {
          label: FORM_TEXT + 'input.patient.lastName.label',
          placeholder: FORM_TEXT + 'input.patient.lastName.placeholder',
        },
        firstName: {
          label: FORM_TEXT + 'input.patient.firstName.label',
          placeholder: FORM_TEXT + 'input.patient.firstName.placeholder',
        },
        phone: {
          label: FORM_TEXT + 'input.patient.phone.label',
          placeholder: FORM_TEXT + 'input.patient.phone.placeholder',
        },
        email: {
          label: FORM_TEXT + 'input.patient.email.label',
          placeholder: FORM_TEXT + 'input.patient.email.placeholder',
        },
        birthday: {
          label: FORM_TEXT + 'input.patient.birthday.label',
          placeholder: FORM_TEXT + 'input.patient.birthday.placeholder',
        },
      },
    },
  },
};
