import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Dropdown, Form, DropdownProps } from "semantic-ui-react";
import { AppSummary, Platform, Filter } from "../../api/DataTypes";

type FiltersProps = {
  platforms: Platform[];
  apps: AppSummary[];
  onChange: (key: "platform_id" | "date" | "application_id", value: number | null) => void;
  filters: Filter
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

  if ( platforms.length > 0 || apps.length > 0 ) {
    return (
      <Form>
        <Form.Group inline className="compact">
          <Form.Field>
            <Header size="small">{t("filters.filters")}</Header>
          </Form.Field>
          <Form.Field>          
            <Dropdown
              onChange={handleChange}
              name="platform_id"
              placeholder={t("filters.platforms_id")}
              clearable
              value={filters.platform_id || undefined}
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
              name="application_id"
              placeholder={t("filters.application_id")}
              clearable
              value={filters.application_id || undefined}
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
  } else {
    return <p>{t("analytics.no-data-yet")}</p>;
  }

};
