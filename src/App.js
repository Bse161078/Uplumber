import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import CreateAccount from "./Pages/CreateAccount";
import CompleteProfile from "./Pages/CompleteProfile";
import ConfirmOTP from "./Pages/ConfirmOTP";
import TermsAndConditions from "./Pages/TermsAndCondition";
import Homepage from "./Pages/Homepage";
import ProviderDetails from "./Pages/ProviderDetails";
import JobDetails from "./Pages/JobDetailsPage";
import ReviewsPage from "./Pages/ReviewsPage";
import RequestAService from "./Pages/RequestAService";
import SumittedRequest from "./Pages/SubmittedRequests";

import "react-phone-number-input/style.css";
import "react-calendar/dist/Calendar.css";

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
        <Route exact path="/details/:id" render={() => <ProviderDetails />} />
        <Route exact path="/jobDetails/:id" render={() => <JobDetails />} />
        <Route exact path="/reviews/:id" render={() => <ReviewsPage />} />
        <Route
          exact
          path="/sumittedRequest"
          render={() => <SumittedRequest />}
        />
        <Route
          exact
          path="/requestAService/:id"
          render={() => <RequestAService />}
        />
        <Route exact path="/" render={() => <LandingPage />} />
      </Switch>
    </BrowserRouter>
  );
}
