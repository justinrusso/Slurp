import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "./components/Navigation";
import { restoreUser } from "./store/session";
import Footer from "./components/footer/Footer";
import HomePage from "./components/home/HomePage";
import LoadingCircle from "./components/common/LoadingCircle";
import BusinessPages, {
  businessRouteRoot,
} from "./components/business/BusinessPages";
import SearchPage from "./components/search/SearchPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).finally(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded ? (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path={businessRouteRoot}>
            <BusinessPages />
          </Route>
        </Switch>
      ) : (
        <LoadingCircle />
      )}
      <Footer />
    </>
  );
}

export default App;
