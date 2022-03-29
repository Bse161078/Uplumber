import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
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
    CustomerSericeUpdateProperty, MyProfile,
    PostARequest,
    Signup,
    uploadImage,
    verifyPhone,updateCustomerEmailStatus,
    sendEmailVerification,
    verifyEmail
} from "../ApiHelper";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import {ToastContainer, toast} from "react-toastify";
import {connectFirebase} from "../Config/firebase";
import ConfirmOtp from "./ConfirmOTP";
import firebase from "firebase";
import {formatPhoneNumber} from "../Functions";
import ConfirmEmail from "./ConfirmEmail";

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

const checkIfUserEmailIsVerified=async ()=>{
    try {
        const data = await MyProfile();
        console.log("checkIfUserEmailIsVerified = ",data)
    }catch (e) {
        console.log("checkIfUserEmailIsVerified = ",e)
    }
}

 function LoginPage(props) {
    useEffect(() => {
        getLocation();
        connectFirebase();
        checkIfUserEmailIsVerified();
        
    }, []);
    const classes = useStyles();
    var upload = "";

    console.log('props = ',props)

  
     const user=Object.assign({}, JSON.parse(localStorage.getItem('emailForSignIn')));
     const [emailstatus,setEmailStatus]=useState([])
     
     const updateemailstatus =async () =>{
      if(user)
        {const res= await updateCustomerEmailStatus({emailVerified:true})
       setEmailStatus(res.data);
       console.log("emailstatus",res)
      } }
   console.log("emailstatus",emailstatus)

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
    const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
    const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
    const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("phoneNumber"));
    const [address, setAddress] = useState(localStorage.getItem("userAddress"));
    const [unit, setUnit] = useState(localStorage.getItem("userUnit"));
    const [city, setCity] = useState(localStorage.getItem("city"));
    const [state, setState] = useState(localStorage.getItem("userState"));
    const [zipcode, setZipcode] = useState(localStorage.getItem("userZipCode"));
    
  //  const [openLoader,setOpenLoader] = useState(false);
    const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const handleClose = () => {
        setSuccess(false)
    }  
    const [country, setCountry] = useState(
        localStorage.getItem("userCountry") || "United States"
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



    console.log("address = ",address)


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
    const VerificanEmail=async()=>{
        try
        {
            const email={
                email:localStorage.getItem("email")
            }
        const res = await sendEmailVerification(email);
        console.log("sendemailverificationcode",res)
  }
    catch(e)
    {
        console.log("sendemailverificationcode",e)
    }
}

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
                       // document.getElementById("homepage").click();
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

      //  const myTimeout = setTimeout(, 5000);


        const appVerifier = window.recaptchaVerifier;
        // console.log("THis is appverifier", appVerifier);
        if (appVerifier) {
            setCaptchaCreated(true);
        }
        console.log("verifier",appVerifier)
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber,
                    appVerifier)
            .then((result) => {
                console.log('result  =   ', result);
                setConfirmResult(result);
                setGotoOtp(true);
                setOpenLoader(false);
                window.recaptchaVerifier = null
            })
            .catch((error) => {
                notify(error.message);
                setOpenLoader(false);
                console.log("firebase", error);
            });
    };




    const handleLoginRequest=async ()=>{
      
const location =[longitude,latitude]
        try{
          
            
            var data = {
                profileImage: profileImage ||
                    "https://image.shutterstock.com/image-vector/profile-placeholder-image-gray-silhouette-260nw-1153673752.jpg",
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address?.userAddress,
                unit: unit,
                city: city,
                state: state,
                zipcode: zipcode,
                location:location,
                country: country,
                latitude: latitude,
                longitude: longitude,
                email: localStorage.getItem("email"),
            };
            
            console.log("completeprofiledata",data)
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


                                   // document.getElementById("homepage").click();
                                }
                            },
                            (error) => {
                                // props.if(error.response);
                                // {
                                //   notify(error.response.data.message);
                                // }
                                setOpenLoader(false);
                                console.log("veriifyphone", error.response);
                            }
                        );
                      
                          
                        
                        console.log(res);
                        VerificanEmail()
                        localStorage.setItem("prevurl",window.location.href)
                        props.history.push('/ConfirmEmail')
                    }
                },
                (error) => {
                    if (error.response) {
                        setOpenLoader(false)
                        alert("Already Registered",error.response.data.message);
                    }
                    alert("Already Registered",error.response.data.message);
                    setOpenLoader(false);
                    console.log("CompleteProfile", error);
                }
            );
        }catch (e) {
            console.log('e = ',e);
        }

     }
     function extractFromAdress(components, type){
        for (var i=0; i<components.length; i++)
            for (var j=0; j<components[i].types.length; j++)
                if (components[i].types[j]==type) return components[i].long_name;
        return "";
    }
    
     const handleSelect = async (address) => {
         
        console.log("This is the dares", address);
    
    
        try{
            const results = await geocodeByAddress(address);
            console.log('resultsaddress = ',results)
    
            if(results.length>0) {
    
                const addressComponents=results[0].address_components;
                console.log('addressComponents = ',addressComponents)
                const latLng = await getLatLng(results[0]);
                var userZipCode = extractFromAdress(addressComponents, "postal_code");
                var userCity = extractFromAdress(addressComponents, "locality");
                var userState = extractFromAdress(addressComponents, "administrative_area_level_1");
               var userCountry=extractFromAdress(addressComponents, "country");
                address=address.split(",").length>0?address.split(",")[0]:address;
    
                localStorage.setItem(
                    "userCurrentLocation",
                    JSON.stringify({latitude: latLng.lat, longitude: latLng.lng})
                );
                localStorage.setItem("userZipCode", userZipCode);
                localStorage.setItem("userCity", userCity);
                localStorage.setItem("userState", userState);
                localStorage.setItem("userAddress", address);
                localStorage.setItem("userCountry", userCountry);
    
    
                const data={
                    currentLocation:{
                        latitude: latLng.lat,
                        longitude: latLng.lng,
                    },
                    userAddress:address,
                    userCity: userCity,
                    userZipCode:userZipCode,
                    userState:userState,
                    userCountry:userCountry
                }
                
                setAddress(data)
                console.log("useraddress",data)
    
    
    
             
    
            }
    
    
        }catch (e) {
            console.error("resultsError", e)
        }
    
    
      };
      
     
    return goToOtp ? (

        
        <ConfirmOtp
            confirmResult={confirmResult}
            phoneNumber={phoneNumber}
            openLoader={openLoader}
            success = {success}
            failure = {failure}
            setOpenLoader= {setOpenLoader}
            handleClose = {handleClose}
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
        
    ):
    (
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
                {console.log("addressdata",address?.userAddress,address)}
                <PlacesAutocomplete
                    className={classes.input}
                   
                    value={address?.userAddress?address.userAddress:address!=="[object Object]"?address:''}
                    onChange={(addres) => {
                        setAddress(addres);
                        console.log("address",address.userAddress)
                        localStorage.setItem("address", address);
                        handleSelect(addres)
                    }}
                    //onSelect={handleSelect(address)}
                >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
                
                  >{console.log("sugg",suggestion.description)}
                      
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

                </PlacesAutocomplete>
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
                    value={address.userCity?address.userCity:city}
                    placeholder="City"
                    onChange={(e) => {
                        setCity(e.target.value);
                        localStorage.setItem("city", e.target.value);
                    }}
                ></input>
                <p className={classes.label} style={{marginTop: 10}}>
                    State
                </p>
                <input
                    className={classes.input}
                    value={address.userState?address.userState:state}
                    placeholder="State"
                    onChange={(e) => {
                        setState(e.target.value);
                        localStorage.setItem("state", e.target.value);
                    }}
                />

                <p className={classes.label} style={{marginTop: 10}}>
                    Zipcode
                </p>
                <input
                    className={classes.input}
                    value={address.userZipCode?address.userZipCode:zipcode}
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
                            label={address.userCountry ? address.userCountry : country}
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
                        ()  => {
                            
                        try{    if(city&&
                            firstName&&phoneNumber&&
                            address&&
                            lastName && unit){
                            setOpenLoader(true);
                            sendFirebaseOTP();
                             }
                            else{

                                setOpenLoader(false);
                             
                                notify("Please fill all the fields")
                             
                            }}catch(e){
                                notify(e)
                            }
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
