import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BusinessesList from "../business/BusinessesList";
import Container from "../styled/Container";
import LoadingCircle from "../common/LoadingCircle";
import Typography from "../common/Typography";
import useQueryParams from "../../hooks/query-params";
import { fetchBusinesses } from "../../store/businesses";

const PageRoot = styled(Container)`
  padding-bottom: ${(props) => props.theme.spacing.gen(2)};
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const SearchPage = () => {
  const dispatch = useDispatch();
  const queryParams = useQueryParams();

  const businessEntries = useSelector((state) =>
    Object.values(state.businesses.entries)
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchBusinesses(queryParams)).finally(() => setIsLoaded(true));
  }, [dispatch, queryParams]);

  return isLoaded ? (
    <PageRoot>
      {businessEntries.length > 0 ? (
        <>
          <Typography as="h1" variant="h3" gutterBottom>
            Results for {queryParams.get("find_desc") || "All Ramen"}
          </Typography>
          <BusinessesList businesses={businessEntries} />
        </>
      ) : (
        <Typography as="h1" variant="h3" gutterBottom>
          No results found for {queryParams.get("find_desc")}
        </Typography>
      )}
    </PageRoot>
  ) : (
    <LoadingCircle />
  );
};

export default SearchPage;
