import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BusinessPage from "./BusinessPage";
import BusinessEditor from "./BusinessEditor";
import {
  fetchBusiness,
  fetchReviews,
  selectBusiness,
} from "../../store/businesses";

export const businessRouteRoot = "/biz";

const makeRoute = (subRoute) => `${businessRouteRoot}${subRoute}`;

const BusinessPages = () => {
  const {
    params: { businessId },
  } = useRouteMatch({
    path: makeRoute("/:businessId(\\d+)"),
  });

  const business = useSelector(selectBusiness(businessId));

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!businessId) {
      return;
    }
    if (!business) {
      dispatch(fetchBusiness(businessId))
        .then(() => dispatch(fetchReviews(businessId)))
        .finally(() => setIsLoaded(true));
    } else if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [business, businessId, dispatch, isLoaded]);

  useEffect(() => {});

  return (
    <Switch>
      <Route path={makeRoute("/new")}>
        <BusinessEditor addNew />
      </Route>
      <Route exact path={makeRoute("/:businessId(\\d+)")}>
        {isLoaded && <BusinessPage />}
      </Route>
      <Route path={makeRoute("/:businessId(\\d+)/edit")}>
        {isLoaded && <BusinessEditor />}
      </Route>
    </Switch>
  );
};

export default BusinessPages;
