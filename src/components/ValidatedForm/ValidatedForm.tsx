import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Dropdown, Form, Label, Radio } from "semantic-ui-react";
import { useForm, Validation } from "../../hooks/useForm";

export enum FieldType {
  Text = "text",
  SearchDropdown = "search dropdown",
  Textarea = "textarea",
  Radio = "radio",
}

export interface FormField extends Validation {
  key: string;
  type: FieldType;
  label?: string;
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
  initialFormData: { [key: string]: string | number };
  loading?: boolean;
  onSubmit?: (formData: { [key: string]: string | number }) => any;
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
                value={formData[field.key]}
                type="text"
                placeholder={t(field.label || "")}
              />
            )}
            {field.type === FieldType.SearchDropdown && (
              <Dropdown
                onChange={handleDropdownChange}
                placeholder={t(field.label || "")}
                search
                selection
                name={field.key}
                options={field.options}
              />
            )}
            {field.type === FieldType.Textarea && (
              <textarea
                onChange={handleInputChange}
                name={field.key}
                value={formData[field.key]}
                placeholder={t(field.label || "")}
                maxLength={field.maxLength}
                rows={Math.min(10, (field.maxLength || 240) / 30)}
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
              disabled={buttonData.disabled}
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
