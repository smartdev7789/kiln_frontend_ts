import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Dropdown, Form } from "semantic-ui-react";
import { Platform } from "../../api/DataTypes";

type FiltersProps = {
  platforms: Platform[];
};

export const Filters = (props: FiltersProps) => {
  const { t } = useTranslation();

  return (
    <Form>
      <Form.Group inline className="compact">
        <Form.Field>
          <Header size="small">{t("filters.filters")}</Header>
        </Form.Field>
        <Form.Field>
          <Dropdown
            placeholder={t("filters.platforms")}
            multiple
            options={props.platforms.map((platform) => ({
              key: platform.id,
              text: platform.name,
              value: platform.id,
            }))}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};
