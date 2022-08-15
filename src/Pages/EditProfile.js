import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    makeStyles,
    Grid,
    TextField,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import PhoneInput from "react-phone-number-input";
import Header from "../Components/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "../assets/profile.png";
import ConfirmEmail from "./ConfirmEmail";
import {
    MyProfile,
    UpdateCustomerProfile,
    uploadImage,
    sendEmailVerification,
    emailVerification,
} from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";
import { Countries, states } from "../Data/Data";
import ConfirmOtp from "./ConfirmOTP";
import firebase from "firebase";
import { connectFirebase } from "../Config/firebase";
import ConfirmationDialog from "./Dialogs/confirmationDialog";
import { parsePhoneNumber } from "react-phone-number-input";
import Geocode from "react-geocode";
var URL = "https://u-plumber.net/api/";
Geocode.setApiKey("AIzaSyA0O_MV5VjO7FMAl6kZFok35pyI1x6YMl4");
const useStyles = makeStyles((theme) => ({
    input: {
        border: "none",
        borderBottom: "1px solid #e9e9e9",
        width: "100%",
        height: 40,
        fontSize: 16,
        // [theme.breakpoints.down("sm")]: {
        //   height: "100%",
        // },
    },
    label: {
        width: "100%",
        color: "#aeaeae",
        margin: 0,
        fontSize: 13,
    },
    icon: {
        color: "#aeaeae",
    },
    button: {
        color: "white",
        border: "none",
        borderRadius: 15,
        width: "80%",
        background: "#1075c2",
        height: 45,
        marginTop: 20,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));
export default function UpdateUserProfile(props) {
    function extractFromAdress(components, type) {
        for (var i = 0; i < components.length; i++)
            for (var j = 0; j < components[i].types.length; j++)
                if (components[i].types[j] == type) return components[i].long_name;
        return "";
    }

    const handleSelect = async (address) => {
        console.log("This is the dares", address);

        try {
            const results = await geocodeByAddress(address);
            console.log("resultsaddress = ", results);

            if (results.length > 0) {
                const addressComponents = results[0].address_components;
                console.log("addressComponents = ", addressComponents);
                const latLng = await getLatLng(results[0]);
                var userZipCode = extractFromAdress(addressComponents, "postal_code");
                var userCity = extractFromAdress(addressComponents, "locality");
                var userState = extractFromAdress(
                    addressComponents,
                    "administrative_area_level_1"
                );
                var userCountry = extractFromAdress(addressComponents, "country");
                address =
                    address.split(",").length > 0 ? address.split(",")[0] : address;

                localStorage.setItem(
                    "userCurrentLocation",
                    JSON.stringify({ latitude: latLng.lat, longitude: latLng.lng })
                );
                localStorage.setItem("userZipCode", userZipCode);
                localStorage.setItem("userCity", userCity);
                localStorage.setItem("userState", userState);
                localStorage.setItem("userAddress", address);
                localStorage.setItem("userCountry", userCountry);

                const data = {
                    currentLocation: {
                        latitude: latLng.lat,
                        longitude: latLng.lng,
                    },
                    userAddress: address,
                    userCity: userCity,
                    userZipCode: userZipCode,
                    userState: userState,
                    userCountry: userCountry,
                };

                setAddress(data);
                setCountry(data.userCountry);
                setZipcode(data.userZipCode);
                setState(data.userState);
                console.log("useraddress", data.userAddress);
            }
        } catch (e) {
            console.error("resultsError", e);
        }
    };
    console.log("UPDATEUSER", props);
    const [goToOtp, setGoToOtp] = useState(false);
    const [goToConfirmEmail, setGoToConfirmEmail] = useState(false);
    const [confirmResult, setConfirmResult] = useState();
    const [captchaCreated, setCaptchaCreated] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);
    const classes = useStyles();
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [value, setValue] = useState("");

    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage")
    );
    const [firstName, setFirstName] = useState(props.firstName);

    const [email, setEmail] = useState(props.email);
    const [oldEmail, setOldEmail] = useState(props.email);

    const [lastName, setLastName] = useState(props.lastName);
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
    const [address, setAddress] = useState(localStorage.getItem("userAddress"));
    const [unit, setUnit] = useState(localStorage.getItem("userUnit"));
    const [city, setCity] = useState(localStorage.getItem("userCity"));
    const [state, setState] = useState(localStorage.getItem("userState"));
    const [zipcode, setZipcode] = useState(localStorage.getItem("userZipCode"));
    const [country, setCountry] = useState(props.country);
    const [latitude, setLatitude] = useState(
        localStorage.getItem("latitude1") || localStorage.getItem("latitude")
    );
    const [longitude, setLongitude] = useState(
        localStorage.getItem("longitude1") || localStorage.getItem("longitude")
    );
    const [oldPhoneNumber, setOldPhoneNumber] = useState(props.phoneNumber);
    console.log(phoneNumber, "phonenumber", oldPhoneNumber);
    const [emailVerificationDialog, setEmailVerificationDialog] =
        React.useState(false);
    const history = useHistory();

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            return true;
        } else {
            alert("App need your location work properly");
        }
        return false;
    };

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        localStorage.setItem("latitude1", position.coords.latitude);
        setLongitude(position.coords.longitude);
        localStorage.setItem("longitude1", position.coords.longitude);
    };
    const updateMyProfileEmail = async () => {
        var data = {
            email: email,
        };
        try {
            const res = await UpdateCustomerProfile(data);
            console.log("hamza", res.data);
        } catch (e) {
            alert("error", e.message);
            console.log("hamza", e);
        }
    };
    const updateMyProfile = () => {
        const phone = parsePhoneNumber(phoneNumber).nationalNumber;
        const phoneCode = parsePhoneNumber(phoneNumber).countryCallingCode;
        const countrycode = parsePhoneNumber(phoneNumber).country;
        console.log("countrycode", countrycode);
        var data = {
            profileImage: profileImage,
            firstName: firstName,
            lastName: lastName,
            address: address.userAddress,
            unit: unit,
            city: city,
            state: state,
            phoneNumber: phone,
            countryPhoneCode: phoneCode,
            countryCode: countrycode,
            zipcode: zipcode,
            latitude: latitude,
            longitude: longitude,
            country: country,
            email: email,
        };
        console.log("THis is the data", data);
        setOpenLoader(true);

        UpdateCustomerProfile(data).then(
            (res) => {
                if (res.data.success || res.status === 200 || res.status === 201) {
                    console.log(res.data.data);
                    var user = res.data.data;
                    props.setFirstName(user.firstName);
                    props.setProfileImage(user.profileImage);
                    props.setLastName(user.lastName);
                    props.setPhoneNumber(user.phoneNumber);
                    props.setAddress(user.address);
                    props.setCity(user.city);
                    props.setState(user.state);
                    props.setUnit(user.unit);
                    props.setZipcode(user.zipcode);
                    props.setCountry(user.country);
                    props.setEmail(email);
                    props.setPhoneVerified(user.phoneNumberVerified);
                    props.setEmailVerified(user.emailVerified);
                    localStorage.setItem("email", email);
                    console.log("THis is the dataprofile", user);
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

    const uploadMyImage = (image) => {
        setOpenLoader(true);
        // console.log("This is great", data);
        uploadImage(image).then(
            (res) => {
                console.log(res);
                if (res.data.success || res.status === 200 || res.status === 201) {
                    setOpenLoader(false);
                    console.log("This is res of image upload", res);
                    setProfileImage(res.data);
                    localStorage.setItem("profileImage", res.data);
                    // localStorage.setItem("profileImage", res.data);
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

    const [edit, setEdit] = React.useState(false);

    const handleChange = (e) => {
        console.log(e.target.files[0]);
        uploadMyImage(e.target.files[0]);
    };

    useEffect(() => {
        getLocation();
        connectFirebase();
        console.log(email, "  ", oldEmail, "  ", props.emailVerified);
    }, []);
    useEffect(() => {
        console.log("gotconfirm2", goToConfirmEmail);
    }, [goToConfirmEmail]);

    const createRecapha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            }
        );
    };

    const validatePhoneNumber = (phoneNumber) => {
        console.log("This is validating phonenumeer", phoneNumber);
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
        return phoneNumber.match(/\d/g).length === 10;
    };
    console.log("openloader", openLoader);

    const sendFirebaseOTP = () => {
        console.log("This is valid", validatePhoneNumber(phoneNumber));
        setOpenLoader(true);
        createRecapha();

        const appVerifier = window.recaptchaVerifier;
        // console.log("THis is appverifier", appVerifier);
        if (appVerifier) {
            setCaptchaCreated(true);
        }
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((result) => {
                console.log("result  =   ", result);
                setConfirmResult(result);
                setGoToOtp(true);
                setOpenLoader(false);
                window.recaptchaVerifier = null;
            })
            .catch((error) => {
                notify(error.message);
                setOpenLoader(false);
                console.log("This is the error", error);
            });
    };

    const notify = (data) => toast(data);
    return goToOtp ? (
        <ConfirmOtp
            confirmResult={confirmResult}
            phoneNumber={phoneNumber}
            goBack={() => {
                setGoToOtp(false);
                setOpenLoader(false);
            }}
            sendFirebaseOTP={() => {
                sendFirebaseOTP();
            }}
            notify={notify}
            setOpenLoader={setOpenLoader}
            onSuccessOtp={async () => {
                setOpenLoader(true);
                props.setEdit(false);
                window.location.reload();
            }}
        ></ConfirmOtp>
    ) : goToConfirmEmail ? (
        <ConfirmEmail
            onSuccessOtp={async () => {
                try {
                    if (oldPhoneNumber != phoneNumber || !props.phoneVerified) {
                        sendFirebaseOTP();
                        setOpenLoader(true);
                    } else {
                        props.setEdit(false);
                        window.location.reload();
                    }
                } catch (e) {
                    console.log("emailverification", e);
                }
            }}
            goBack={() => {
                setGoToConfirmEmail(false);
                setOpenLoader(false);
            }}
            notify={notify}
            setOpenLoader={setOpenLoader}
        />
    ) : (
        <div>
            <div id="recaptcha-container"></div>
            <Backdrop className={classes.backdrop} open={openLoader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Grid
                container
                direction="row"
                justify="center"
                style={{ marginTop: 30, padding: 20 }}
            >
                <img
                    src={profileImage}
                    style={{
                        borderRadius: "50%",
                        marginBottom: 10,
                        width: 120,
                        height: 120,
                    }}
                    onClick={() => {
                        document.getElementById("upload").click();
                    }}
                ></img>
                <input
                    onChange={handleChange}
                    type="file"
                    // id="icon-button-file"
                    style={{ visibility: "hidden", position: "absolute" }}
                    id={"upload"}
                />
                <div style={{ width: "100%" }}></div>
                <Grid itemd md={6} xs={6}>
                    {" "}
                    <p className={classes.label} style={{ width: "90%" }}>
                        First Name
                    </p>
                    <input
                        className={classes.input}
                        style={{ width: "90%" }}
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    ></input>
                </Grid>
                <Grid item md={6} xs={6}>
                    <Grid container direction="row" justify="flex-end">
                        {" "}
                        <p className={classes.label} style={{ width: "90%" }}>
                            Last Name
                        </p>
                        <input
                            className={classes.input}
                            style={{ width: "90%" }}
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        ></input>
                    </Grid>
                </Grid>
                <p
                    className={classes.label}
                    style={{
                        marginTop: 10,
                        color: props.emailVerified ? "#60a3d6" : "red",
                    }}
                >
                    Email
                </p>
                <input
                    className={classes.input}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>
                <p
                    className={classes.label}
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        color: props.phoneVerified ? "#60a3d6" : "red",
                    }}
                >
                    Phone Number
                </p>
                <PhoneInput
                    // className={classes.input}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e);
                    }}
                />
                <div className={classes.input} style={{ height: 10 }}></div>
                <p className={classes.label} style={{ marginTop: 10 }}>
                    Address
                </p>
                <PlacesAutocomplete
                    className={classes.input}
                    value={
                        address?.userAddress
                            ? address.userAddress
                            : address !== "[object Object]"
                                ? address
                                : ""
                    }
                    onChange={(addres) => {
                        setAddress(addres);
                        console.log("address", address);
                        localStorage.setItem("address", address);
                        // handleSelect(addres)
                    }}
                    onSelect={handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                    }) => (
                        <div style={{ width: "100%" }}>
                            <input
                                {...getInputProps({
                                    placeholder: "Search Places ...",
                                    className: "location-search-input",
                                })}
                                className={classes.input}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            {console.log("sugg", suggestion.description)}

                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <p className={classes.label} style={{ marginTop: 10 }}>
                    Unit/ Apt
                </p>
                <input
                    className={classes.input}
                    value={unit}
                    onChange={(e) => {
                        setUnit(e.target.value);
                    }}
                ></input>
                <p className={classes.label} style={{ marginTop: 10 }}>
                    City
                </p>
                <input
                    className={classes.input}
                    value={address?.userCity ? address.userCity : city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                ></input>
                <p className={classes.label} style={{ marginTop: 10 }}>
                    State
                </p>
                <input
                    className={classes.input}
                    value={address?.userState ? address.userState : state}
                    onChange={(e) => {
                        setState(e.target.value);
                    }}
                ></input>
                <p className={classes.label} style={{ marginTop: 10 }}>
                    Zipcode
                </p>
                <input
                    className={classes.input}
                    value={address?.userZipCode ? address.userZipCode : zipcode}
                    onChange={(e) => {
                        setZipcode(e.target.value);
                    }}
                ></input>
                <p className={classes.label} style={{ marginTop: 10 }}>
                    Country
                </p>
                <input
                    className={classes.input}
                    value={address?.userCountry ? address.userCountry : country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                    }}
                ></input>
                <button
                    className={classes.button}
                    onClick={async (e) => {
                        setOpenLoader(true);

                        var actionCodeSettings = {
                            // URL you want to redirect back to. The domain (www.example.com) for this
                            // URL must be in the authorized domains list in the Firebase Console.
                            url: "https://localhost:3000/email-verified",
                            // This must be true.
                            handleCodeInApp: true,
                        };
                        updateMyProfile();
                        if (email && phoneNumber) {
                            if (email !== oldEmail || !props.emailVerified) {
                                console.log(
                                    "email",
                                    email,
                                    oldEmail,
                                    phoneNumber,
                                    oldPhoneNumber
                                );
                                try {
                                    const res = await UpdateCustomerProfile({ email: email });
                                    const emaill = { email: email };
                                    console.log("email = ", emaill);
                                    const emailResult = await sendEmailVerification(emaill);
                                    console.log("emailResult ", emailResult);
                                    setGoToConfirmEmail(true);
                                    console.log("gotconfirm", goToConfirmEmail);
                                    localStorage.setItem("email", email);
                                } catch (e) {
                                    console.log("exception while sending email", e);
                                    notify(e.message);
                                    setOpenLoader(false);
                                }
                            } else if (
                                oldPhoneNumber !== phoneNumber ||
                                !props.phoneVerified
                            ) {
                                setOpenLoader(true);
                                sendFirebaseOTP();
                            } else {
                                window.location.reload();
                                props.setEdit(false);
                            }
                        } else {
                            notify("Email or Phone number cant be empty");
                        }
                    }}
                >
                    Save
                </button>
            </Grid>
        </div>
    );
}
