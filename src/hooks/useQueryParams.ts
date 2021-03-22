import { useHistory, useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const location = useLocation();

  const history = useHistory();

  const query = new URLSearchParams(location.search);

  return {
    getQueryParam: (key: string) => {
      if (!query.has(key)) return null;

      const queryValue = query.get(key);

      return queryValue;
    },
    setQueryParams: (object: { [key: string]: string | null }) => {
      Object.keys(object).forEach((key) => {
        const value = object[key];
        if (value === null) query.delete(key);
        else query.set(key, object[key] as string);
      });
      history.push({ search: query.toString() });
    },
  };
};
