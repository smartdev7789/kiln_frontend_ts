import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Currency = "GBP";

type UseCurrencyProps = {
  currency: Currency;
};
export const useCurrency = (props: UseCurrencyProps) => {
  const { i18n } = useTranslation();

  const [numberFormatter, setNumberFormatter] = useState(
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: props.currency,
    })
  );

  useEffect(() => {
    setNumberFormatter(
      new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: props.currency,
      })
    );
  }, [i18n.language, props.currency]);

  return {
    format: (value: number) => numberFormatter.format(value),
  };
};
