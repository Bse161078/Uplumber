import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import CreateAccount from "./Pages/CreateAccount";
import CompleteProfile from "./Pages/CompleteProfile";
import ConfirmOTP from "./Pages/ConfirmOTP";
import TermsAndConditions from "./Pages/TermsAndCondition";
import Homepage from "./Pages/Homepage";
import "react-phone-number-input/style.css";

// import "antd/dist/antd.css";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" render={() => <LoginPage />} />

        <Route exact path="/create-account" render={() => <CreateAccount />} />
        <Route
          exact
          path="/complete-profile"
          render={() => <CompleteProfile />}
        />

        <Route exact path="/confirm-otp" render={() => <ConfirmOTP />} />
        <Route exact path="/terms" render={() => <TermsAndConditions />} />
        <Route exact path="/homepage" render={() => <Homepage />} />

        <Route exact path="/" render={() => <LandingPage />} />
      </Switch>
    </BrowserRouter>
  );
}
