import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import {
    makeStyles,
    Grid,
    TextField,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import Drawer from "@material-ui/core/Drawer";
import Camera from "../assets/camera.PNG";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Countries, states} from "../Data/Data";
import {
    CompleteProfile, CustomerSericeUpdateContactDetails,
    CustomerSericeUpdateDescriptionAndPhoto,
    CustomerSericeUpdateInssurance,
    CustomerSericeUpdateLookingfor,
    CustomerSericeUpdateProblem,
    CustomerSericeUpdateProperty,
    PostARequest,
    Signup,
    uploadImage,
    verifyPhone
} from "../ApiHelper";
import {ToastContainer, toast} from "react-toastify";
import {connectFirebase} from "../Config/firebase";
import ConfirmOtp from "./ConfirmOTP";
import firebase from "firebase";
import {formatPhoneNumber} from "../Functions";

var validator = require("email-validator");

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
 function LoginPage(props) {
    useEffect(() => {
        getLocation();
        connectFirebase();
    }, []);
    const classes = useStyles();
    var upload = "";

    console.log('props = ',props)


     const user=Object.assign({}, JSON.parse(localStorage.getItem('emailForSignIn')));
     if(!user){
         props.history.push('/')
     }
     localStorage.removeItem('emailForSignIn');

     console.log("user = ",user)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password);
    const [value, setValue] = useState("");
    const [typeConfirm, setTypeConfirm] = useState("text");
    const [verify, setVerify] = React.useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [goToOtp, setGotoOtp] = useState();
    const [confirmResult, setConfirmResult] = useState();
    console.log("THis is greate", localStorage.getItem("firstName"))
    const [firstName, setFirstName] = useState(localStorage.getItem("userName") ? localStorage.getItem("userName").split(" ")[0] : "");
    const [lastName, setLastName] = useState(localStorage.getItem("userName") ? localStorage.getItem("userName").split(" ")[1] : "");
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("userPhone") ? localStorage.getItem("userPhone") : "");
    const [address, setAddress] = useState(localStorage.getItem("address") || localStorage.getItem("userAddress") || '');
    const [unit, setUnit] = useState(localStorage.getItem("unit") || localStorage.getItem("userUnit") || "");
    const [city, setCity] = useState(localStorage.getItem("city") || localStorage.getItem("userCity") || "");
    const [state, setState] = useState(localStorage.getItem("state") || localStorage.getItem("userState") || "");
    const [zipcode, setZipcode] = useState(localStorage.getItem("zipcode") || localStorage.getItem("userZipCode") || "");
    const [country, setCountry] = useState(
        localStorage.getItem("country") || "United States"
    );
    const [latitude, setLatitude] = useState(localStorage.getItem("latitude") || localStorage.getItem("userCurrentLocation") &&
        JSON.parse(localStorage.getItem("userCurrentLocation")).latitude);
    const [longitude, setLongitude] = useState(localStorage.getItem("longitude") || localStorage.getItem("userCurrentLocation") &&
        JSON.parse(localStorage.getItem("userCurrentLocation")).longitude);
    const [captchaCreated, setCaptchaCreated] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);
    // console.log("This is",localStorage.getItem("userName").split(" "))


    const [requestData, setRequestData] = useState({
        requestDate: localStorage.getItem("requestDate") || new Date(),
        prfferedTime: localStorage.getItem("prfferedTime") || "As soon a possible",
        itemName: localStorage.getItem("itemName") || "Air-Conditioner",
        serviceType: localStorage.getItem("serviceType") || "Repair",
        requestOption:
            localStorage.getItem("requestOption") || "Auto accept 1st offer",
        waterDamage: localStorage.getItem("waterDamage") || "No",
        lookingFor:
            localStorage.getItem("lookingFor") != null
                ? JSON.parse(localStorage.getItem("lookingFor"))
                : ["Plumbing Technician"],
        area: localStorage.getItem("area") || "",
        structure: localStorage.getItem("structure") || "",
        requestorStatus: localStorage.getItem("requestorStatus") || "",
        description: localStorage.getItem("description"),
        image: localStorage.getItem("image")
            ? JSON.parse(localStorage.getItem("image"))
            : [],
        company: localStorage.getItem("company") || "",
        policyNumber: localStorage.getItem("policyNumber") || "",
        expiryDate: localStorage.getItem("expiryDate") || "",
        deduction: localStorage.getItem("deduction") || "",
        userName: localStorage.getItem("userName"),
        userPhone: localStorage.getItem("userPhone"),
        allowSms: localStorage.getItem("allowSms")
            ? JSON.parse(localStorage.getItem("allowSms"))
            : true,
        allowContact: "yes",
        userEmail: localStorage.getItem("userEmail"),
        userAddress: localStorage.getItem("userAddress"),
        userUnit: localStorage.getItem("userUnit"),
        userCity: localStorage.getItem("userCity"),
        userState: localStorage.getItem("userState"),
        userZipCode: localStorage.getItem("userZipCode"),
        currentLocation:
            localStorage.getItem("userCurrentLocation") &&
            JSON.parse(localStorage.getItem("userCurrentLocation")),
    });





     const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            return true;
        } else {
            alert("App need your location work properly");
        }
        return false;
    };


    //register user after verification


    const postMyRequest = () => {
        if (localStorage.getItem("token")) {
            setOpenLoader(true);
            PostARequest().then(
                (res) => {
                    if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 200 ||
                        res.statusText === 201
                    ) {
                        setOpenLoader(false);
                        console.log(res.data);
                        localStorage.setItem("requestId", res.data._id);
                        updateCustomerProblem();
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
        } else {
            notify("You need to login in ordere to post request!");
        }
    };

    const updateCustomerProblem = () => {
        if (
            requestData.requestDate != "" &&
            requestData.prfferedTime != "" &&
            requestData.itemName != "" &&
            requestData.serviceType != "" &&
            requestData.anyFloorOrWaterDamage != "" &&
            requestData.serviceType != ""
        ) {
            setOpenLoader(true);
            var data = {
                serviceDate: requestData.requestDate,
                serviceTime: requestData.prfferedTime,
                problemItem: requestData.itemName,
                serviceName: requestData.serviceType,
                requestMany:
                    requestData.requestOption === "Auto accept 1st offer" ? false : true,
                autoAccept:
                    requestData.requestOption === "Auto accept 1st offer" ? true : false,
                anyFloorOrWaterDamage: requestData.waterDamage === "Yes" ? true : false,
                serviceCode: requestData.serviceType,
            };
            CustomerSericeUpdateProblem(data).then(
                (res) => {
                    if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 200 ||
                        res.statusText === 201
                    ) {
                        setOpenLoader(false);
                        localStorage.removeItem("requestDate");
                        localStorage.removeItem("prfferedTime");
                        localStorage.removeItem("itemName");
                        localStorage.removeItem("serviceType");
                        localStorage.removeItem("requestOption");
                        console.log(res);
                        // notify(res.data.message);
                        updateCustomerLookingFor();
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
        } else {
            notify("Please fill  all feilds!!");
        }
    };

    const updateCustomerLookingFor = () => {
        setOpenLoader(true);
        var data = {
            lookingFor: requestData.lookingFor,
        };
        CustomerSericeUpdateLookingfor(data).then(
            (res) => {
                if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 200 ||
                    res.statusText === 201
                ) {
                    setOpenLoader(false);
                    console.log(res);
                    // notify(res.data.message);
                    localStorage.removeItem("lookingFor");
                    updateCustomerProperty();
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

    const updateCustomerProperty = () => {
        if (
            requestData.area != "" &&
            requestData.structure != "" &&
            requestData.requestorStatus != ""
        ) {
            setOpenLoader(true);
            var data = {
                area: requestData.area,
                structure: requestData.structure,
                requesterStatus: requestData.requestorStatus,
            };
            CustomerSericeUpdateProperty(data).then(
                (res) => {
                    if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 200 ||
                        res.statusText === 201
                    ) {
                        setOpenLoader(false);
                        console.log(res);
                        // notify(res.data.message);
                        localStorage.removeItem("area");
                        localStorage.removeItem("structure");
                        localStorage.removeItem("requestorStatus");
                        updateCustomerPropertyDescriptionAndProperty();
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
        } else {
            notify("Please fill all fields!!");
        }
    };

    const updateCustomerPropertyDescriptionAndProperty = (tab) => {
        if (requestData.description != "") {
            setOpenLoader(true);
            var data = {
                description: requestData.description,
                photos: requestData.image,
            };
            CustomerSericeUpdateDescriptionAndPhoto(data).then(
                (res) => {
                    if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 200 ||
                        res.statusText === 201
                    ) {
                        setOpenLoader(false);
                        // notify(res.data.message);
                        console.log(res);
                        localStorage.removeItem("description");
                        localStorage.removeItem("image");
                        if (requestData.waterDamage === "Yes") {
                            updateCustomerPropertyInssurance();
                        } else {
                            updateCustomerContactDetails();
                        }
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
        } else {
            notify("Please add description!");
        }
    };

    const updateCustomerPropertyInssurance = (tab) => {
        setOpenLoader(true);
        var data = {
            company: requestData.company,
            policyNumber: localStorage.getItem("policyNumber"),
            expiryDate: requestData.expiryDate,
            deduction: localStorage.getItem("deduction"),
        };
        CustomerSericeUpdateInssurance(data).then(
            (res) => {
                if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 200 ||
                    res.statusText === 201
                ) {
                    setOpenLoader(false);
                    // notify(res.data.message);
                    console.log(res);
                    localStorage.removeItem("company");
                    localStorage.removeItem("policyNumber");
                    localStorage.removeItem("expiryDate");
                    localStorage.removeItem("deduction");
                    updateCustomerContactDetails();
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

    const updateCustomerContactDetails = (tab) => {
        if (
            requestData.userName != "" &&
            requestData.userPhone != "" &&
            requestData.userEmail != "" &&
            requestData.userAddress != "" &&
            requestData.userCity != "" &&
            requestData.userState != "" &&
            requestData.userZipCode != ""
        ) {
            setOpenLoader(true);
            var data = {
                name: requestData.userName,
                phone: requestData.userPhone,
                allowSms: requestData.allowSms,
                email: requestData.userEmail,
                address: requestData.userAddress,
                latitude:
                    localStorage.getItem("userCurrentLocation") &&
                    JSON.parse(localStorage.getItem("userCurrentLocation")).latitude,
                longitude:
                    localStorage.getItem("userCurrentLocation") &&
                    JSON.parse(localStorage.getItem("userCurrentLocation")).longitude,
                unit: requestData.userUnit,
                city: requestData.userCity,
                state: requestData.userState,
                zipCode: requestData.userZipCode,
            };
            CustomerSericeUpdateContactDetails(data).then(
                (res) => {
                    if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 200 ||
                        res.statusText === 201 ||
                        res.statusText === "OK"
                    ) {
                        setOpenLoader(false);
                        // notify(res.data.message);
                        console.log(res);
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userPhone");
                        localStorage.removeItem("allowSms");
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("userAddress");
                        localStorage.removeItem("userUnit");
                        localStorage.removeItem("userCity");
                        localStorage.removeItem("userState");
                        localStorage.removeItem("userZipCode");
                        localStorage.removeItem("userCurrentLocation");
                        //document.getElementById("complete").click();
                        document.getElementById("homepage").click();
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
        } else {
            notify("Please provide all information!");
        }
    };

    const registerUser = () => {


        return new Promise((resolve,reject)=>{
            var data = {
                email: email,
                password: password,
            };
            Signup(data).then(
                (res) => {
                    console.log("This is signup res", res);
                    if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 200 ||
                        res.statusText === 201 ||
                        res.statusText === "OK" ||
                        res.statusText === "Created" ||
                        res.data.statusText === "OK" ||
                        res.data.statusText === "Created" ||
                        res.data.statusText === "OK"
                    ) {
                        setOpenLoader(false);
                        console.log("This is greate", res.data.token);
                        localStorage.setItem("tokenTemp", res.data.token);
                        localStorage.setItem("idTemp", res.data._id);
                        // localStorage.setItem("token", res.data.token);
                        // localStorage.setItem("id", res.data._id);
                        localStorage.setItem("email", email);
                        if (localStorage.getItem("requestAfterLogin")) {
                            localStorage.removeItem("requestAfterLogin");
                            postMyRequest(res.data.token);
                        } else {
                            //document.getElementById("complete").click();
                            //document.getElementById("homepage").click();

                        }
                        resolve();

                    }
                },
                (error) => {
                    if (error.response) {
                        notify(error.response.data.message);
                    }
                    setOpenLoader(false);
                    console.log("saveuser failed", error.response.data);
                    resolve();
                }
            );
        })


    }











    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        localStorage.setItem("latitude", position.coords.latitude);
        setLongitude(position.coords.longitude);
        localStorage.setItem("longitude", position.coords.longitude);
    };
    console.log("this state in complete profile", state)
    console.log("this state in localstorage ", localStorage.getItem("state"))


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

    //   {
    //     "profileImage": "https://image.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg",
    //     "firstName": "Faraz",
    //     "lastName": "Hassan",
    //     "phoneNumber": 923060052374,
    //     "address": "Example address",
    //     "unit": "Example unit",
    //     "city": "Example city",
    //     "verify": "Example verify",
    //     "zipcode": 44000,
    //     "country": "Example country",
    //     "latitude": 1.099232,
    //     "longitude": 2.33332,
    //     "email": "faraz@gmail.com"
    // }
    const handleChange = (e) => {
        console.log(e.target.files[0]);
        uploadMyImage(e.target.files[0]);

        // setFilename(e.target.files[0].name);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setVerify(open);
    };
    const notify = (data) => toast(data);

    const validatePhoneNumber = (phoneNumber) => {
        console.log("This is validating phonenumeer", phoneNumber);
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
        return phoneNumber.match(/\d/g).length === 10;
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

    const sendFirebaseOTP = () => {
        console.log("This is valid", validatePhoneNumber(phoneNumber));
        setOpenLoader(true);
        createRecapha();


        const appVerifier = window.recaptchaVerifier;
        // console.log("THis is appverifier", appVerifier);
        if (appVerifier) {
            setCaptchaCreated(true);
        }
        console.log("verifier",appVerifier)
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((result) => {
                console.log('result  =   ', result);
                setConfirmResult(result);
                setGotoOtp(true);
                setOpenLoader(false);
                window.recaptchaVerifier = null
            })
            .catch((error) => {
                notify(error.code);
                setOpenLoader(false);
                console.log("firebase", error);
            });
    };




    const handleLoginRequest=async ()=>{


        try{
            await registerUser()
            console.log('user registered');
            var data = {
                profileImage: profileImage ||
                    "https://image.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg",
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address,
                unit: unit,
                city: city,
                state: state,
                zipcode: zipcode,
                country: country,
                latitude: latitude,
                longitude: longitude,
                email: localStorage.getItem("email"),
            };
            CompleteProfile(data).then(
                (res) => {
                    console.log('CompleteProfile = ',res);
                    if (
                        res.data.success ||
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 200 ||
                        res.statusText === 201 ||
                        res.statusText === "OK" ||
                        res.statusText === "Created" ||
                        res.data.statusText === "OK" ||
                        res.data.statusText === "Created" ||
                        res.data.statusText === "OK"
                    ) {
                        setOpenLoader(false);
                        localStorage.removeItem("userName");
                        localStorage.removeItem("userPhone");
                        localStorage.removeItem("allowSms");
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("userAddress");
                        localStorage.removeItem("userUnit");
                        localStorage.removeItem("userCity");
                        localStorage.removeItem("userState");
                        localStorage.removeItem("userZipCode");
                        localStorage.removeItem("userCurrentLocation");

                        localStorage.setItem("token", localStorage.getItem("tokenTemp"));
                        // localStorage.setItem("id", res.data._id);
                        localStorage.setItem("id", res.data.customerId);
                        verifyPhone().then(
                            (res2) => {
                                if (
                                    res2.data.success ||
                                    res2.status === 200 ||
                                    res2.status === 201 ||
                                    res2.status === 200 ||
                                    res2.statusText === 201 ||
                                    res2.statusText === "OK" ||
                                    res2.statusText === "Created" ||
                                    res2.data.statusText === "OK" ||
                                    res2.data.statusText === "Created" ||
                                    res2.data.statusText === "OK"
                                ) {


                                    document.getElementById("homepage").click();
                                }
                            },
                            (error) => {
                                // props.if(error.response);
                                // {
                                //   notify(error.response.data.message);
                                // }
                                setOpenLoader(false);
                                console.log("This is response", error.response);
                            }
                        );
                        console.log(res);

                    }
                },
                (error) => {
                    if (error.response) {
                        notify(error.response.data.message);
                    }
                    setOpenLoader(false);
                    console.log("CompleteProfile", error);
                }
            );
        }catch (e) {
            console.log('e = ',e);
        }

     }

    return goToOtp ? (
        <ConfirmOtp
            confirmResult={confirmResult}
            phoneNumber={phoneNumber}
            goBack={
                () => {
                    setGotoOtp(false);
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
                    handleLoginRequest();
                }
            }
        ></ConfirmOtp>
    ) : (
        <div>
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
            <input
                onChange={handleChange}
                type="file"
                // id="icon-button-file"
                style={{visibility: "hidden", position: "absolute"}}
                ref={(ref) => {
                    upload = ref;
                }}
            />
            <Link id="confirmOtp" to="/confirm-otp"></Link>
            <div style={{borderBottom: "1px solid #e9e9e9", height: 60}}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    style={{height: 60}}
                >
                    <p
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            margin: 0,
                            textAlign: "center",
                            width: "100%",
                        }}
                    >
                        Complete Your Profile
                    </p>
                </Grid>
            </div>
            <Grid
                container
                direction="row"
                justify="center"
                style={{marginTop: 30, padding: 20}}
            >
                <img
                    src={profileImage ? profileImage : Camera}
                    onClick={() => {
                        upload.click();
                    }}
                    style={{
                        borderRadius: "50%",
                        marginBottom: 10,
                        height: 100,
                        width: 100,
                    }}
                ></img>
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
                            localStorage.setItem("firstName", e.target.value);
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
                                localStorage.setItem("lastName", e.target.value);
                            }}
                        ></input>
                    </Grid>
                </Grid>
                <p
                    className={classes.label}
                    style={{marginTop: 20, marginBottom: 20}}
                >
                    Phone Number
                </p>
                <input
                    className={classes.input}
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        localStorage.setItem("phoneNumber", e.target.value);
                    }}
                ></input>
                {/* <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => {
            console.log(e);
            setPhoneNumber(e);
            localStorage.setItem("phoneNumber", e);
          }}
        /> */}
                <p className={classes.label} style={{marginTop: 10}}>
                    Address
                </p>
                <input
                    className={classes.input}
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        localStorage.setItem("address", e.target.value);
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
                        localStorage.setItem("unit", e.target.value);
                    }}
                ></input>
                <p className={classes.label} style={{marginTop: 10}}>
                    City
                </p>
                <input
                    className={classes.input}
                    value={city}
                    placeholder="City"
                    onChange={(e) => {
                        setCity(e.target.value);
                        localStorage.setItem("city", e.target.value);
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
                            localStorage.setItem("state", values.title);
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
                        <TextField label={state ? state : "State"} {...params} />
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
                        localStorage.setItem("zipcode", e.target.value);
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
                            setCountry(value.title);
                            localStorage.setItem("country", values.title);
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
                        <TextField
                            label={country ? country : "United States"}
                            {...params}
                        />
                    )}
                />

                <div id="recaptcha-container"></div>
                <button
                    className={classes.button}
                    // onClick={() => {
                    //   setVerify(true);
                    // }}
                    onClick={
                        () => {
                            // if (!validator.validate(email)) {
                            //   console.log("This is an email", email);
                            //   notify("Please Enter a valid Email");
                            // } else if (password === "") {
                            //   notify("Please Enter a password");
                            // } else {
                            // setOpenLoader(true);


                            setOpenLoader(true);
                            // console.log("This is great", data);
                            sendFirebaseOTP();

                        }
                        // document.getElementById("complete").click();
                    }
                    // }
                >
                    Continue
                </button>
                <Drawer
                    anchor={"bottom"}
                    open={verify}
                    onClose={toggleDrawer("bottom", false)}
                >
                    <p style={{fontWeight: 600, fontSize: 26, textAlign: "center"}}>
                        Verification Code Sent
                    </p>
                    <Grid container direction="row" justify="center">
                        <p style={{width: "90%", textAlign: "center", marginTop: 0}}>
                            A 6 digit verification code has been send to you phone "
                            {phoneNumber}"
                        </p>

                        <p
                            className={classes.label}
                            style={{fontSize: 14, textAlign: "center"}}
                        >
                            Tap Continue to enter code
                        </p>
                        <button
                            className={classes.button}
                            style={{marginBottom: 40}}
                            onClick={() => {
                                // if (validatePhoneNumber(phoneNumber)) {
                                sendFirebaseOTP();
                                // } else {
                                //   notify("Please use a valid phonenumber!");
                                // }
                            }}
                        >
                            Continue
                        </button>
                    </Grid>
                </Drawer>
            </Grid>
        </div>
    );
}
export default withRouter(LoginPage);
