import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
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
import Notification from "./Pages/Notifications";
import ShowRoute from "./Pages/ShowRoute";
import EditProfile from "./Pages/EditProfile"
import UserProfile from "./Pages/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "react-calendar/dist/Calendar.css";
import addNotification, { Notifications } from "react-push-notification";

// import "antd/dist/antd.css";
import "./App.css";
import CompleteUpdateEmail from "./Pages/CompleteUpdateEmail";
import ConfirmEmail from "./Pages/ConfirmEmail";
import { getApikey, UpdateCustomerProfile } from "./ApiHelper";
import { firebase, onMessageListener } from "./Config/firebase";
import { toast } from "react-toastify";

export default function App() {
    const [apikey, setapikey] = useState("")
    const [tokenFound, setTokenFound] = useState(null);
    const [openLoader, setOpenLoader] = useState(false);
    const history = useHistory()

    const notify = (data) => toast(data);

    const getapi = async () => {
        const res = await getApikey()
        // setapikey(res.data.CustomerOffer.googlePlacesApiKey)
        // console.log(res.data.CustomerOffer)
        const script = document.createElement("script");
        script.src =
            `https://maps.googleapis.com/maps/api/js?key=${res.data.CustomerOffer.googlePlacesApiKey}&libraries=places`;
        script.async = true;
        document.body.appendChild(script);
    }
    const updateMyProfile = (fcmToken) => {
        var data = {
            fcmTokenWeb: fcmToken,
        };
        console.log("THis is the data", data);
        setOpenLoader(true);
        UpdateCustomerProfile(data).then(
            (res) => {
                if (res.data.success || res.status === 200 || res.status === 201) {
                    setOpenLoader(false);
                    console.log(res.data.data);
                }
            },
            (error) => {
                if (error.response) {
                    notify(error.response.data.message);
                }
                setOpenLoader(false);
                console.log("This is response", error.response);
            }
        );
    };
    const getTokens = (setTokenFound) => {

        return firebase
            .messaging()
            .getToken({ vapidKey: "BOVlu_RjNxUBXYELKc_BtKoZe_evMFXggd0CwWy9sVs2l5tUyvq2TiNFsymAnZDFXc2za6r6PpShkt7Z_xW8r9E" })
            .then((currentToken) => {
                if (currentToken) {

                    console.log("current token for client: ", currentToken);
                    updateMyProfile(currentToken);
                    localStorage.setItem("fcmToken", currentToken);
                    setTokenFound(true);
                    // Track the token -> client mapping, by sending to backend server
                    // show on the UI that permission is secured
                } else {
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                    setTokenFound(false);
                    // shows on the UI that permission is required
                }
            })
            .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
                // catch error while creating client token
            });
    };
    const handleOnOpenNotification = () => {
        alert("s")
        // const { navigate } = RootNavigation
        firebase.messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from background state:',
                    remoteMessage,
                );
                const { data } = remoteMessage
                handleOnPressNotification(data)
            }
        });
        // Check whether an initial notification is available
        firebase.messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage,
                    );
                    if (remoteMessage.data) {
                        const { data } = remoteMessage
                        handleOnPressNotification(data)

                    }
                }
            });
    }
    const handleOnPressNotification = (item) => {
        console.log('Push notification data---->data', item)
        // const { navigate } = RootNavigation
        const newOffer = item.type === 'newOffer'
        const jobPending = item.type === 'jobPending'
        const jobStarted = item.type === 'jobStarted'
        const plumberOnTheWay = item.type === 'PlumberOnTheWay'
        const changeCompletionDateRequested = item.type === 'changeCompletionDateRequested'
        const jobDelivered = item.type === 'jobDelivered'
        const plumberLocation = item.type === 'plumberLocation';
        return (

            newOffer ?
                [
                    // navigate(routes.providerDetails, {
                    //     offerId: item.offerId,
                    //     offer: {
                    //         ...item.offerId,
                    //         // status: offerAccepted ? 'accepted' : offerRejected ? 'rejected' : jobStatus
                    //     },
                    //     type: 'notification',
                    //     notificationId: item._id
                    // }),
                    history.push({
                        pathname: '/notification',
                        // search: `?query=notificationId $item._id` ,
                        state: {

                            offerId: item.offerId,
                            offer: {
                                ...item.offerId,
                                // status: offerAccepted ? 'accepted' : offerRejected ? 'rejected' : jobStatus
                            },
                            type: 'notification',
                            notificationId: item._id


                        }
                    })
                    // readNotification(item),
                ]
                :
                jobPending || plumberOnTheWay || jobStarted || changeCompletionDateRequested || jobDelivered ?
                    // !item.isView ?
                    [
                        // navigate(routes.serviceDetails, {
                        //     offerId: item.offerId,
                        //     offer: {
                        //         ...item.offerId,
                        //     },
                        //     type: 'notification',
                        //     notificationId: item._id
                        // }),
                        history.push({
                            pathname: '/notification',
                            // search: `?query=notificationId $item._id` ,
                            state: {

                                offerId: item.offerId,
                                offer: {
                                    ...item.offerId,
                                    // status: offerAccepted ? 'accepted' : offerRejected ? 'rejected' : jobStatus
                                },
                                type: 'notification',
                                notificationId: item._id


                            }
                        })
                        // readNotification(item),
                    ]
                    :
                    plumberLocation ?
                        [
                            // navigate(routes.providerTracking, { offerId: item.offerId }),
                            history.push({
                                pathname: '/notification',
                                // search: `?query=notificationId $item._id` ,
                                state: {

                                    offerId: item.offerId,


                                }
                            })
                            // readNotification(item),
                        ]
                        :
                        null
        )
    }
    const showNotification = () => {
        addNotification({
            title: 'Success!',
            subtitle: 'This is a subtitle',
            message: 'This is a very long message',
            theme: 'darkblue',
            native: true, // when using native, your OS will handle theming.
            onClick: (e) => {

                debugger;
                console.log(e, "push notification click");
                alert("fad")
            },

        });

    }
    onMessageListener().then(payload => {

        showNotification()
        console.log(payload);
    }).catch(err => console.log('onMessageListener failed: ', err));
    useEffect(async () => {
        // getapi()
        let fb = firebase;

        console.log("This is fb app", fb);
    }, []);
    useEffect(() => {

        getTokens(setTokenFound);
    }, []);


    return (
        <>
            <Notifications />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" render={() => <LoginPage />} />
                    <Route exact path="/create-account" render={() => <CreateAccount />} />
                    <Route exact path="/complete-profile" render={() => <CompleteProfile />} />
                    <Route exact path="/confirm-otp" render={() => <ConfirmOTP />} />
                    <Route exact path="/terms" render={() => <TermsAndConditions />} />
                    <Route exact path="/homepage" render={() => <Homepage />} />
                    <Route exact path="/homepage/:id" render={() => <Homepage />} />
                    <Route exact path="/details/:id" render={() => <ProviderDetails />} />
                    <Route exact path="/jobDetails/:id" render={() => <JobDetails />} />
                    <Route exact path="/reviews/:id" render={() => <ReviewsPage />} />
                    <Route exact path="/sumittedRequest" render={() => <SumittedRequest />} />
                    <Route exact path="/requestAService/:id" render={() => <RequestAService />} />
                    <Route exact path="/resetPassword/:type/:id" render={() => <ResetPassword />} />
                    <Route exact path="/history" render={() => <History />} />
                    <Route exact path="/current-requests" render={() => <CurrentRequests />} />
                    <Route exact path="/favorite" render={() => <FavoritePlumbers />} />
                    <Route exact path="/settings" render={() => <SettingsPage />} />
                    <Route exact path="/changePassword" render={() => <ChangePassword />} />
                    <Route exact path="/notifications" render={() => <Notification />} />
                    <Route exact path="/show-route" render={() => <ShowRoute />} />
                    <Route exact path="/notificationSetting" render={() => <NotificationSettings />} />
                    <Route exact path="/ConfirmEmail" render={() => <ConfirmEmail />} />
                    <Route exact path="/userProfile" render={() => <UserProfile />} /><Route exact path="/userProfile" render={() => <UserProfile />} />  UserProfile <Route exact path="/" render={() => <LandingPage />} />
                    <Route exact path="/email-verified" render={() => <CompleteUpdateEmail />} />
                    <Route exact path="/editprofile" render={() => <EditProfile />} />
                </Switch>
            </BrowserRouter>
        </>

    );
}
