import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import BusinessesList from "../business/BusinessesList";
import Container from "../styled/Container";
import LoadingCircle from "../common/LoadingCircle";
import Typography from "../common/Typography";
import useQueryParams from "../../hooks/query-params";
import { Button } from "../styled/Button";
import { fetchBusinesses } from "../../store/businesses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PageRoot = styled(Container)`
  padding-bottom: ${(props) => props.theme.spacing.gen(2)};
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.gen(3)};
  border-top: 1px solid ${(props) => props.theme.palette.divider};
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const SearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const queryParams = useQueryParams();

  const businessEntries = useSelector((state) =>
    Object.values(state.businesses.entries)
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(fetchBusinesses(queryParams))
      .then((data) => {
        setPage(data.page + 1);
        setTotal(data.count);
      })
      .finally(() => setIsLoaded(true));
  }, [dispatch, queryParams]);

  const handlePagionationButton = (newPage) => {
    const newQueryParams = new URLSearchParams(queryParams);
    newQueryParams.set("page", newPage - 1);

    let url = "/search";
    const paramsString = newQueryParams.toString();
    if (paramsString.length > 0) {
      url += `?${paramsString}`;
    }
    history.push(url);
    window.scrollTo(0, 0);
  };

  return isLoaded ? (
    <PageRoot>
      {businessEntries.length > 0 ? (
        <>
          <Typography as="h1" variant="h3" gutterBottom>
            Results for {queryParams.get("find_desc") || "All Ramen"}
          </Typography>
          <BusinessesList businesses={businessEntries} />
          {total > 0 && (
            <PaginationWrapper>
              <div>
                <Button
                  type="button"
                  variant="text"
                  color="inherit"
                  onClick={() => handlePagionationButton(page - 1)}
                  disabled={page === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} /> Previous Page
                </Button>
                <Button
                  type="button"
                  variant="text"
                  color="inherit"
                  onClick={() => handlePagionationButton(page + 1)}
                  disabled={page === Math.ceil(total / 10)}
                >
                  Next Page <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>
              <Typography>
                {page} of {Math.ceil(total / 10)}
              </Typography>
            </PaginationWrapper>
          )}
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
