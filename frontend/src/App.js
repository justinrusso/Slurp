import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import { restoreUser } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
