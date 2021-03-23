import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { CheckboxProps, DropdownProps } from "semantic-ui-react";
import { Asset } from "../api/DataTypes";
import { DropdownData } from "../components/ValidatedForm/MultipleDropdownsToString";

export type FieldValue = string | number | DropdownData[] | Asset[];

export type Validation = {
  key: string;
  required?: boolean;
  maxLength?: number;
};

export const addError = (
  errors: { [key: string]: string[] },
  key: string,
  errorMessage: string
) => {
  if (errors[key] === undefined) {
    errors[key] = [];
  }
  errors[key].push(`${errorMessage}`);
};

export const validateData = (
  formData: { [key: string]: FieldValue },
  validations: Validation[]
) => {
  const errors: { [key: string]: string[] } = {};

  Object.keys(formData).forEach((key) => {
    const validation = validations.find((v) => v.key === key);

    if (!validation) return;

    if (validation.required) {
      if (formData[key] === undefined) {
        addError(errors, key, "Required field");
      }

      if ((formData[key] as string).length === 0) {
        addError(errors, key, "Required field");
      }
    }

    if (validation.maxLength) {
      if (typeof formData[key] !== "string") {
        addError(errors, key, "Field must be text");
      } else if ((formData[key] as string).length > validation.maxLength) {
        addError(
          errors,
          key,
          `Field must be fewer than ${validation.maxLength} characters`
        );
      }
    }
  });

  return errors;
};

export const useForm = (
  initialFormData: { [key: string]: FieldValue },
  validations: Validation[]
) => {
  const [formData, setFormData] = useState<{ [key: string]: FieldValue }>(
    initialFormData
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const [touchedFields, setTouchedField] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(Object.keys(formErrors).length === 0);
  }, [formErrors]);

  useEffect(() => {
    const errors = validateData(formData, validations);

    setFormErrors(errors);
  }, [formData, validations]);

  const addTouchedField = (key: string) => {
    setTouchedField([...touchedFields, key]);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleCheckBoxChange = (
    e: FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    setFormData({
      ...formData,
      [data.name!]: data.value!,
    });
  };

  const handleDropdownChange = (
    e: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFormData({
      ...formData,
      [data.name!]: data.value,
    });
  };

  const handleMultipleDropdownChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return {
    formData,
    isValid,
    formErrors,
    handleCheckBoxChange,
    handleDropdownChange,
    handleInputChange,
    handleMultipleDropdownChange,
    touchedFields,
    addTouchedField,
  };
};
