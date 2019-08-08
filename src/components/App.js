import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignInPage from "./signIn";
import ProfilePage from "./profile";
import * as routes from "../routes";
// import withAuthentication from "./withAuthentication";

const App = () => (
  <BrowserRouter>
    <Route exact path={routes.LANDING} component={() => <SignInPage />} />
    <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
    <Route exact path={routes.PROFILE} component={() => <ProfilePage />} />
  </BrowserRouter>
);

export default App;
