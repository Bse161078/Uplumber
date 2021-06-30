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
import History from "./Pages/History";
import CurrentRequests from "./Pages/CurrentRequests";
import FavoritePlumbers from "./Pages/FavoritePlumbers";
import SettingsPage from "./Pages/SettingsPage";
import ChangePassword from "./Pages/ChangePassword";
import ResetPassword from "./Pages/ResetPassword";
import NotificationSettings from "./Pages/NotificationSettings";
import Notifications from "./Pages/Notifications";
import ShowRoute from "./Pages/ShowRoute";
import UserProfile from "./Pages/UserProfile";
import "react-toastify/dist/ReactToastify.css";
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
        <Route
          exact
          path="/ResetPassword/:id"
          render={() => <ResetPassword />}
        />
        <Route exact path="/history" render={() => <History />} />
        <Route
          exact
          path="/current-requests"
          render={() => <CurrentRequests />}
        />
        <Route exact path="/favorite" render={() => <FavoritePlumbers />} />
        <Route exact path="/settings" render={() => <SettingsPage />} />
        <Route exact path="/changePassword" render={() => <ChangePassword />} />
        <Route exact path="/notifications" render={() => <Notifications />} />
        <Route exact path="/show-route" render={() => <ShowRoute />} />
        <Route
          exact
          path="/notificationSetting"
          render={() => <NotificationSettings />}
        />
        <Route exact path="/userProfile" render={() => <UserProfile />} />
        UserProfile
        <Route exact path="/" render={() => <LandingPage />} />
      </Switch>
    </BrowserRouter>
  );
}
