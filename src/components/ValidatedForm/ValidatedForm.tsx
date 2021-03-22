import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Dropdown, Form, Label, Radio } from "semantic-ui-react";
import { FieldValue, useForm, Validation } from "../../hooks/useForm";
import {
  DropdownData,
  MultipleDropdownsToString,
} from "./MultipleDropdownsToString";
import { MultipleImageField } from "./MultipleImageField";

export enum FieldType {
  Text = "text",
  SearchDropdown = "search dropdown",
  Textarea = "textarea",
  Radio = "radio",
  MultipleImages = "MultipleImages",
  Email = "email",
  PhoneNumber = "phone",
  FileUpload = "file upload",
  MultipleDropdowns = "multiple dropdowns",
}

export interface FormField extends Validation {
  key: string;
  type: FieldType;
  label?: string;
  delimiter?: string;
  options?: { key: string; text: string; value: string | number }[];
}

type ButtonData = {
  submit?: boolean;
  text: string;
  positive?: boolean;
  disabled?: boolean;
};

type ValidatedFormProps = {
  fields: FormField[];
  initialFormData: { [key: string]: FieldValue };
  additionalFieldData?: { [key: string]: any };
  loading?: boolean;
  onSubmit?: (formData: { [key: string]: FieldValue }) => any;
  buttons: ButtonData[];
};

export const ValidatedForm = (props: ValidatedFormProps) => {
  const {
    formData,
    formErrors,
    isValid,
    handleCheckBoxChange,
    handleDropdownChange,
    handleInputChange,
    handleMultipleDropdownChange,
    touchedFields,
    addTouchedField,
  } = useForm(props.initialFormData, props.fields);
  const { t } = useTranslation();

  return (
    <Form
      error={!isValid}
      loading={props.loading}
      onSubmit={() => (props.onSubmit ? props.onSubmit(formData) : {})}
      className="bordered no-shadow"
    >
      {props.fields.map((field) => {
        return (
          <Form.Field
            onBlur={() => addTouchedField(field.key)}
            key={field.key}
            required={field.required}
            error={
              !!(formErrors[field.key] && touchedFields.includes(field.key))
            }
          >
            <label>{t(field.label || "")}</label>
            {field.type === FieldType.Text && (
              <input
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                type="text"
                placeholder={t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.Email && (
              <input
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                type="email"
                placeholder={t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.PhoneNumber && (
              <input
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                type="tel"
                placeholder={t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.FileUpload && (
              <input
                onChange={handleInputChange}
                name={field.key}
                type="file"
                placeholder={t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.SearchDropdown && (
              <Dropdown
                onChange={handleDropdownChange}
                placeholder={t(field.label || "")}
                value={formData[field.key] as string | number}
                search
                selection
                name={field.key}
                options={field.options}
                required={field.required}
              />
            )}
            {field.type === FieldType.MultipleDropdowns &&
              field.key === "categories_1" && (
                <MultipleDropdownsToString
                  name={field.key}
                  delimiter={field.delimiter!}
                  value={formData[field.key] as string}
                  onChange={handleMultipleDropdownChange}
                  dropdowns={
                    props.additionalFieldData![field.key] as DropdownData[]
                  }
                />
              )}
            {field.type === FieldType.Textarea && (
              <textarea
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                placeholder={t(field.label || "")}
                maxLength={field.maxLength}
                rows={Math.min(10, (field.maxLength || 240) / 30)}
                required={field.required}
              />
            )}
            {field.type === FieldType.Radio &&
              field.options?.map((option, i) => {
                return (
                  <Radio
                    key={i}
                    name={field.key}
                    value={option.value}
                    label={t(option.text)}
                    onChange={handleCheckBoxChange}
                    checked={formData[field.key] === option.value}
                  />
                );
              })}
            {field.type === FieldType.MultipleImages && (
              <MultipleImageField
                images={[
                  {
                    type: 1,
                    width: 500,
                    height: 500,
                    url: "https://i.imgur.com/no53exE.jpg",
                  },
                ]}
              />
            )}
            {formErrors[field.key] && touchedFields.includes(field.key) && (
              <Label content={formErrors[field.key]} pointing="above" prompt />
            )}
          </Form.Field>
        );
      })}
      <Button.Group floated="right">
        {props.buttons.map((buttonData) => {
          return (
            <Button
              key={buttonData.text}
              disabled={
                buttonData.disabled || buttonData.submit ? !isValid : undefined
              }
              floated="right"
              positive={buttonData.positive}
              type={buttonData.submit ? "submit" : undefined}
            >
              {t(buttonData.text)}
            </Button>
          );
        })}
      </Button.Group>
    </Form>
  );
};
