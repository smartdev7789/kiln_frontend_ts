import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Dropdown, Form, DropdownProps } from "semantic-ui-react";
import { AppSummary, Platform } from "../../api/DataTypes";

type FiltersProps = {
  platforms: Platform[];
  apps: AppSummary[];
  onChange: (key: "platform" | "date" | "app_id", value: number | null) => void;
  filters: {
    platform: string | null;
    app_id: string | null;
    date: string | null;
  };
};

const DateOptions = [
  {
    text: "yesterday",
    value: "0",
  },
  {
    text: "last7Days",
    value: "1",
  },
  {
    text: "last14Days",
    value: "2",
  },
  {
    text: "last30Days",
    value: "3",
  },
  {
    text: "allTime",
    value: "4",
  },
];

export const Filters = ({
  filters,
  onChange,
  platforms,
  apps,
}: FiltersProps) => {
  const { t } = useTranslation();

  const handleChange = (event: any, elementProps: DropdownProps) => {
    onChange(
      elementProps.name,
      elementProps.value === "" ? null : (elementProps.value as number)
    );
  };

  console.log(filters);

  return (
    <Form>
      <Form.Group inline className="compact">
        <Form.Field>
          <Header size="small">{t("filters.filters")}</Header>
        </Form.Field>
        <Form.Field>
          <Dropdown
            onChange={handleChange}
            name="platform"
            placeholder={t("filters.platforms")}
            clearable
            value={filters.platform || undefined}
            options={platforms.map((platform) => ({
              key: platform.id,
              text: platform.name,
              value: platform.id,
            }))}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            onChange={handleChange}
            name="app_id"
            placeholder={t("filters.app_id")}
            clearable
            value={filters.app_id || undefined}
            options={apps.map((app) => ({
              key: app.id,
              text: app.name,
              value: app.id,
            }))}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            onChange={handleChange}
            name="date"
            placeholder={t("filters.date")}
            clearable
            value={filters.date || undefined}
            options={DateOptions.map((option) => {
              return {
                ...option,
                text: t(`filters.dateOptions.${option.text}`),
              };
            })}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};
