import { Switch, Route } from "react-router-dom";

import BusinessPage from "./BusinessPage";
import BusinessEditor from "./BusinessEditor";

export const businessRouteRoot = "/biz";

const makeRoute = (subRoute) => `${businessRouteRoot}${subRoute}`;

const BusinessPages = () => {
  return (
    <Switch>
      <Route path={makeRoute("/new")}>
        <BusinessEditor addNew />
      </Route>
      <Route exact path={makeRoute("/:businessId(\\d+)")}>
        <BusinessPage />
      </Route>
      <Route path={makeRoute("/:businessId(\\d+)/edit")}>
        <BusinessEditor />
      </Route>
    </Switch>
  );
};

export default BusinessPages;
