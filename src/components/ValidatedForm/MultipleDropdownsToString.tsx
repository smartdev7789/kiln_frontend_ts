import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownProps } from "semantic-ui-react";

export type Option = {
  key: string;
  text: string;
  value: string;
};

type Options = Option[];

type DependencyOptions = { [key: string]: Options };
type SubdependencyOptions = { [key: string]: DependencyOptions };

export type DropdownData = {
  key: string;
  label: string;
  placeholder: string;
  options: Options | DependencyOptions | SubdependencyOptions;
};

type MultipleDropdownsToStringProps = {
  dropdowns: DropdownData[];
  name: string;
  value: string;
  delimiter: string;
  onChange: (key: string, value: string) => void;
};

export const MultipleDropdownsToString = ({
  name,
  dropdowns,
  value,
  onChange,
  delimiter,
}: MultipleDropdownsToStringProps) => {
  const { t } = useTranslation();

  const values = value.split(delimiter);

  const handleChange = (index: number) => (
    e: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const newValues = values.map((value, i) =>
      i === index ? (data.value! as string) : value
    );
    onChange(name, newValues.join(delimiter));
  };

  return (
    <>
      {dropdowns.map((dropdownData, i) => {
        const previousValue = values[i - 1];
        const previousPreviousValue = values[i - 2];

        let options: Options = [];

        if (Array.isArray(dropdownData.options)) {
          options = dropdownData.options;
        } else {
          if (Array.isArray(dropdownData.options[previousValue])) {
            options = dropdownData.options[previousValue] as Options;
          } else {
            options = (dropdownData.options[
              previousPreviousValue
            ] as DependencyOptions)[previousValue] as Options;
          }
        }

        return (
          <Dropdown
            compact
            selection
            key={dropdownData.key}
            onChange={handleChange(i)}
            value={values[i]}
            placeholder={t(dropdownData.placeholder)}
            options={options.map((o) => ({ ...o, text: t(o.text) }))}
            disabled={i > 0 && previousValue === undefined}
          />
        );
      })}
    </>
  );
};
