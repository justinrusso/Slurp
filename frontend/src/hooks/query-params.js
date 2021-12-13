import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * Extracts the query parameters from the current route
 * @returns {URLSearchParams}
 */
const useQueryParams = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

export default useQueryParams;
