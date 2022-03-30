import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {
    makeStyles,
    Grid,
    TextField,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Header from "../Components/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "../assets/profile.png";
import ConfirmEmail from "./ConfirmEmail"
import
{
    MyProfile, UpdateCustomerProfile, uploadImage,
    sendEmailVerification, emailVerification,
} from "../ApiHelper";
import {ToastContainer, toast} from "react-toastify";
import {Countries, states} from "../Data/Data";
import ConfirmOtp from "./ConfirmOTP";
import firebase from "firebase";
import {connectFirebase} from "../Config/firebase";
import ConfirmationDialog from "./Dialogs/confirmationDialog";

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
let confirmemail = false
export default function UpdateUserProfile(props) {
    console.log("UPDATEUSER", props)
    const [goToOtp, setGoToOtp] = useState(false);
    const [goToConfirmEmail, setGoToConfirmEmail] = useState(false);
    const [confirmResult, setConfirmResult] = useState();
    const [captchaCreated, setCaptchaCreated] = useState(false);


    console.log("goTOConfirmEmail", confirmemail)
    const [openLoader, setOpenLoader] = useState(false);
    const classes = useStyles();
    const [phoneVerified, setPhoneVerified] = useState(JSON.parse(localStorage.getItem("userData")).phoneNumberVerified);
    const [value, setValue] = useState("");

    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage")
    );
    const [firstName, setFirstName] = useState(props.firstName
    );

    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [oldEmail, setOldEmail] = useState(localStorage.getItem("email"));

    const [lastName, setLastName] = useState(props.lastName);
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("userPhone"));

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
    const [oldPhoneNumber, setOldPhoneNumber] = useState(localStorage.getItem("phoneNumber"));

    const [emailVerificationDialog, setEmailVerificationDialog] = React.useState(false);
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
            email: email
        }
        try {
            const res = await UpdateCustomerProfile(data)
            console.log('hamza', res.data)
        }
        catch (e) {
            alert("error", e.message)
            console.log('hamza', e)
        }
    }
    const updateMyProfile = (eVerified) => {
        var data = {
            profileImage: profileImage,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
            unit: unit,
            city: city,
            state: state,
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
                    setOpenLoader(false);
                    console.log(res.data.data);
                    var user = res.data.data;
                    props.setFirstName(user.firstName);
                    props.setProfileImage(user.profileImage);
                    props.setLastName(user.lastName);
                    props.setPhoneNumber("+" + user.phoneNumber);
                    props.setAddress(user.address);
                    props.setCity(user.city);
                    props.setState(user.state);
                    props.setUnit(user.unit);
                    props.setZipcode(user.zipcode);
                    props.setCountry(user.country);
                    props.setEmail(email);
                    props.setEmailVerified(user.emailVerified)
                    props.setEdit(false)
                    localStorage.setItem("email", email)
                    // setOpenLoader(false);

                    // setAllProviders(res.data.Providers);
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
        console.log(email, '  ', oldEmail, '  ', props.emailVerified)

    }, []);
    useEffect(() => {
        console.log('gotconfirm2', goToConfirmEmail)
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
                console.log('result  =   ', result);
                setConfirmResult(result);
                setGoToOtp(true);
                setOpenLoader(false);
                setPhoneVerified(true)
                window.recaptchaVerifier = null
            })
            .catch((error) => {
                notify(error.message);
                setOpenLoader(false);
                console.log("This is the error", error);
            });
    };


    const notify = (data) => toast(data);
    return (
        goToOtp ? (
                <ConfirmOtp
                    confirmResult={confirmResult}
                    phoneNumber={phoneNumber}
                    goBack={
                        () => {
                            setGoToOtp(false);
                            setOpenLoader(false)
                        }
                    }
                    sendFirebaseOTP={
                        () => {
                            sendFirebaseOTP()
                        }
                    }
                    notify={notify}
                    setOpenLoader={setOpenLoader}
                    onSuccessOtp={
                        async () => {
                            setOpenLoader(true);
                            updateMyProfile();
                        }
                    }
                ></ConfirmOtp>
            ) :
            goToConfirmEmail ?
                <ConfirmEmail
                    onSuccessOtp={
                        async () => {
                            setOpenLoader(true);
                            try {
                                const res = await UpdateCustomerProfile({emailVerified: true});
                                props.setEmailVerified(true);
                                if (oldPhoneNumber !== phoneNumber || !props.phoneVerified) {
                                    sendFirebaseOTP();
                                }
                            }
                            catch (e) {
                                console.log("emailverification", e);
                            }
                        }
                    }
                    goBack={
                        () => {
                            setGoToConfirmEmail(false);
                            setOpenLoader(false)
                        }
                    }
                    notify={notify}
                    setOpenLoader={setOpenLoader}
                /> :
                <div>
                    <div id="recaptcha-container"></div>
                    <Backdrop className={classes.backdrop} open={openLoader}>
                        <CircularProgress color="inherit"/>
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
                        style={{marginTop: 30, padding: 20}}
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
                            style={{visibility: "hidden", position: "absolute"}}
                            id={"upload"}
                        />
                        <div style={{width: "100%"}}></div>
                        <Grid itemd md={6} xs={6}>
                            {" "}
                            <p className={classes.label} style={{width: "90%"}}>
                                First Name
                            </p>
                            <input
                                className={classes.input}
                                style={{width: "90%"}}
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            ></input>
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <Grid container direction="row" justify="flex-end">
                                {" "}
                                <p className={classes.label} style={{width: "90%"}}>
                                    Last Name
                                </p>
                                <input
                                    className={classes.input}
                                    style={{width: "90%"}}
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                ></input>
                            </Grid>
                        </Grid>
                        <p className={classes.label}
                           style={{marginTop: 10, color: props.emailVerified ? "#60a3d6" : "red"}}>
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
                            style={{marginTop: 20, marginBottom: 20, color: props.phoneVerified ? "#60a3d6" : "red"}}
                        >
                            Phone Number
                        </p>
                        <PhoneInput
                            // className={classes.input}
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => {
                                console.log(e);
                                setPhoneNumber(e);
                            }}
                        />
                        <div className={classes.input} style={{height: 10}}></div>
                        <p className={classes.label} style={{marginTop: 10}}>
                            Address
                        </p>
                        <input
                            className={classes.input}
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        ></input>
                        <p className={classes.label} style={{marginTop: 10}}>
                            Unit/ Apt
                        </p>
                        <input
                            className={classes.input}
                            value={unit}
                            onChange={(e) => {
                                setUnit(e.target.value);
                            }}
                        ></input>
                        <p className={classes.label} style={{marginTop: 10}}>
                            City
                        </p>
                        <input
                            className={classes.input}
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                        ></input>
                        <p className={classes.label} style={{marginTop: 10}}>
                            State
                        </p>
                        <Autocomplete
                            options={states}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, values) => {
                                if (values) {
                                    setState(values.title);
                                    localStorage.setItem("state1", values.title);
                                }
                            }}
                            style={{
                                // width: 300,
                                // marginLeft: 20,
                                // marginTop: 20,
                                // marginBottom: 20
                                border: "none",
                                width: "100%",
                            }}
                            renderInput={(params) => (
                                <TextField label={state ? state : ""} {...params} />
                            )}
                        />
                        <p className={classes.label} style={{marginTop: 10}}>
                            Zipcode
                        </p>
                        <input
                            className={classes.input}
                            value={zipcode}
                            onChange={(e) => {
                                setZipcode(e.target.value);
                            }}
                        ></input>
                        <p className={classes.label} style={{marginTop: 10}}>
                            Country
                        </p>
                        <Autocomplete
                            options={Countries}
                            onChange={(event, values) => {
                                if (values) {
                                    console.log("This is co", values.title);
                                    setCountry(values.title);
                                    localStorage.setItem("country1", values.title);
                                }
                            }}
                            getOptionLabel={(option) => option.title}
                            style={{
                                // width: 300,
                                // marginLeft: 20,
                                // marginTop: 20,
                                // marginBottom: 20
                                border: "none",
                                width: "100%",
                            }}
                            renderInput={(params) => (
                                <TextField label={country ? country : ""} {...params} />
                            )}
                        />
                        <button
                            className={classes.button}
                            onClick={async (e) => {
                                setOpenLoader(true);

                                var actionCodeSettings = {
                                    // URL you want to redirect back to. The domain (www.example.com) for this
                                    // URL must be in the authorized domains list in the Firebase Console.
                                    url: 'https://localhost:3000/email-verified',
                                    // This must be true.
                                    handleCodeInApp: true
                                };

                                if (email && phoneNumber) {
                                    if (email !== oldEmail || !props.emailVerified) {

                                        try {
                                            const res = await UpdateCustomerProfile({email: email})
                                            const emaill = {email: email}
                                            console.log("email = ", emaill)

                                            const emailResult = await sendEmailVerification(emaill)
                                            console.log("emailResult ", emailResult)
                                            setGoToConfirmEmail(true)
                                            console.log('gotconfirm', goToConfirmEmail)
                                            localStorage.setItem('email', email);
                                        }
                                        catch (e) {
                                            console.log('exception while sending email', e);
                                            notify(e.message);
                                            setOpenLoader(false);
                                        }
                                    }
                                    else if (oldPhoneNumber !== phoneNumber || !props.phoneVerified) {
                                        sendFirebaseOTP();
                                    } else {
                                        updateMyProfile();
                                    }

                                    //   props.setEdit(false)


                                } else {
                                    notify("Email or Phone number cant be empty");
                                }

                            }}>
                            Save
                        </button>
                    </Grid>
                </div>
    );
}
