import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "./components/Navigation";
import { restoreUser } from "./store/session";
import HomePage from "./components/home/HomePage";
import BusinessPage from "./components/business/BusinessPage";
import { fetchBusinesses } from "./store/businesses";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
    dispatch(fetchBusinesses());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/biz/:businessId">
            <BusinessPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
