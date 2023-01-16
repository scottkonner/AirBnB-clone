import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Tailbar from "./components/Tailbar/Tailbar";
import SpotList from "./components/SpotList/SpotList";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm";
import CreateReviewForm from "./components/CreateReviewForm/CreateReviewForm";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import DetailedSpot from "./components/DetailedSpot/DetailedSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SpotList />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/createspot">
            <CreateSpotForm />
          </Route>
          <Route path="/editspot/:spotId">
            <EditSpotForm />
          </Route>
          <Route path="/:spotId/createreview">
            <CreateReviewForm />
          </Route>
          <Route path="/profile">
            <UserProfilePage />
          </Route>
          <Route path="/:spotId" exact>
            <DetailedSpot />
          </Route>

          <Route path="/" >
            This page means you spelled your route incorrectly, or you're looking for something that doesn't exist
          </Route>

        </Switch>

      )}
    <Tailbar />
    </>
  );
}
export default App;
