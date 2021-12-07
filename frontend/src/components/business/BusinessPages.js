import { Switch, Route } from "react-router-dom";

import BusinessPage from "./BusinessPage";

export const businessRouteRoot = "/biz/:businessId";

const BusinessPages = () => {
  return (
    <Switch>
      <Route exact path={businessRouteRoot}>
        <BusinessPage />
      </Route>
    </Switch>
  );
};

export default BusinessPages;
