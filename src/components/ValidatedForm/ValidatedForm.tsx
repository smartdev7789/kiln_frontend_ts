import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Dropdown, Form, Label, Radio } from "semantic-ui-react";
import { Asset } from "../../api/DataTypes";
import { FieldValue, useForm, Validation } from "../../hooks/useForm";
import { MultipleAssetField } from "./MultipleAssetField";
import {
  DropdownData,
  MultipleDropdownsToString,
} from "./MultipleDropdownsToString";

export enum FieldType {
  Text = "text",
  URL = "url",
  SearchDropdown = "search dropdown",
  Dropdown = "dropdown",
  Textarea = "textarea",
  Radio = "radio",
  MultipleImages = "MultipleImages",
  MultipleAssets = "MultipleAssets",
  Email = "email",
  PhoneNumber = "phone",
  FileUpload = "file upload",
  MultipleDropdowns = "multiple dropdowns",
}

export interface FormField extends Validation {
  placeholder?: string;
  key: string;
  type: FieldType;
  label?: string;
  delimiter?: string;
  moreInfoLink?: string;
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
            <label>
              {t(field.label || "")}{" "}
              {field.moreInfoLink && (
                <Link
                  to={{ pathname: field.moreInfoLink }}
                  target="_blank"
                  style={{ color: "#2185d0" }}
                >
                  {t("moreInfo")}
                </Link>
              )}
            </label>
            {field.type === FieldType.Text && (
              <input
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                type="text"
                placeholder={field.placeholder || t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.URL && (
              <input
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                type="url"
                placeholder={field.placeholder || t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.Email && (
              <input
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                type="email"
                placeholder={field.placeholder || t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.PhoneNumber && (
              <input
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key] as string}
                type="tel"
                placeholder={field.placeholder || t(field.label || "")}
                required={field.required}
              />
            )}
            {field.type === FieldType.FileUpload && (
              <input
                onChange={handleInputChange}
                name={field.key}
                type="file"
                placeholder={field.placeholder || t(field.label || "")}
                required={field.required}
              />
            )}
            {(field.type === FieldType.SearchDropdown ||
              field.type === FieldType.Dropdown) && (
              <Dropdown
                onChange={handleDropdownChange}
                placeholder={field.placeholder || t(field.label || "")}
                value={formData[field.key] as string | number}
                search={field.type === FieldType.SearchDropdown}
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
                placeholder={field.placeholder || t(field.label || "")}
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
            {field.type === FieldType.MultipleImages && "404"}
            {field.type === FieldType.MultipleAssets && (
              <MultipleAssetField assets={formData[field.key] as Asset[]} />
            )}
            {formErrors[field.key] && touchedFields.includes(field.key) && (
              <Label content={formErrors[field.key]} pointing="above" prompt />
            )}
          </Form.Field>
        );
      })}
      <div style={{textAlign:'right'}}>
        {props.buttons.map((buttonData) => {
          return (
            <Button
              style={{margin: '5px'}}
              key={buttonData.text}
              disabled={
                buttonData.disabled || buttonData.submit ? !isValid : undefined
              }
              positive={buttonData.positive}
              type={buttonData.submit ? "submit" : undefined}
            >
              {t(buttonData.text)}
            </Button>
          );
        })}
      </div>
    </Form>
  );
};
