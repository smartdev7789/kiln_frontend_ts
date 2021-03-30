import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Currency = "GBP";

type UseCurrencyProps = {
  currency: Currency;
  compactNotation?: boolean;
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
        notation: props.compactNotation ? "compact" : undefined,
      })
    );
  }, [i18n.language, props.currency, props.compactNotation]);

  return {
    format: (value: number) => numberFormatter.format(value),
  };
};
