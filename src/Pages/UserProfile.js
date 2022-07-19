import React, {useState, useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {
    makeStyles,
    Grid,
    TextField,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import ConfirmOtp from './ConfirmOTP'
import Alert from '@mui/material/Alert';
import PhoneInput from "react-phone-number-input";
import Header from "../Components/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
import firebase from "firebase";
import {connectFirebase} from "../Config/firebase";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "../assets/profile.png";
import {MyProfile, UpdateCustomerProfile
,deleteProfileApi,
DeleteCustomerProfile,
sendEmailVerification
} from "../ApiHelper";
import {ToastContainer, toast} from "react-toastify";
import {Countries, states} from "../Data/Data";
import EditProfile from "./EditProfile";
import ConfirmEmail from "./ConfirmEmail";

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

export default function UserProfile() {
  const [openLoader, setOpenLoader] = useState(false);
  const [openEmail,setOpenEmail] = useState(false)
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [confirmResult, setConfirmResult] = useState();
  const [captchaCreated, setCaptchaCreated] = useState(false);
  const [goToOtp, setGoToOtp] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage1")
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName1")
  );

  const [email, setEmail] = useState(localStorage.getItem("firstName1"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName1"));
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber1")
  );
  const [emailVerified,setEmailVerified]=useState(false)
  const [phoneVerified,setPhoneVerified]=useState(false)
  const [address, setAddress] = useState(localStorage.getItem("address1"));
  const [unit, setUnit] = useState(localStorage.getItem("unit1"));
  const [city, setCity] = useState(localStorage.getItem("city1"));
  const [state, setState] = useState(localStorage.getItem("state1"));
  const [zipcode, setZipcode] = useState(localStorage.getItem("zipcode1"));
  const [country, setCountry] = useState(localStorage.getItem("country1"));
  const [latitude, setLatitude] = useState(localStorage.getItem("latitude1"));
  const [deleteProfile,setDeleteProfile]=useState(false)
  const history= useHistory();
  const [longitude, setLongitude] = useState(
    localStorage.getItem("longitude1")
  );

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


    const appVerifier = window.recaptchaVerifier
     console.log("THis is appverifier", appVerifier);
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
            window.recaptchaVerifier = null
        })
        .catch((error) => {
            notify(error.message);
            setOpenLoader(false);
            console.log("This is the error", error);
        });
};
  const deleteUserProfile = async () => {
   
const data = {customerId:localStorage.getItem("id"),is_deleted:true}
console.log(data)
    setOpenLoader(true);
    try{
    const res=await DeleteCustomerProfile(data);
    console.log("deleteProfile",res.data)
  
    window.localStorage.clear();
    history.push('/')
    }catch(e){
        setOpenLoader(false)
        console.log("deleteProfile error",e)
    }
   }



   useEffect(async ()=>{
    connectFirebase();
        
    },[])

  const updateMyProfile = () => {
    var data = {
      profileImage: profileImage,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: 923060052374,
      address: address,
      unit: unit,
      city: city,
      state: state,
      zipcode: 44000,
      latitude: 1.099232,
      longitude: 2.33332,
      country: country,
    };
    setOpenLoader(true);
    UpdateCustomerProfile(data).then(
      (res) => {
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
          console.log("This is profile",res.data.data);
          var user = res.data.data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber(user.phoneNumber);
          setAddress(user.address);
          setCity(user.city);
          setState(user.state);
          setUnit(user.unit);
          setZipcode(user.zipcode);
          setCountry(user.country);
          setLongitude(user.longitude);
          setLatitude(user.latitude);
          setEmail(user.email);
          setProfileImage(user.profileImage);
          setEdit(false);
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

    const [edit, setEdit] = React.useState(false);

    const Profile = () => {
        return (
            
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
                ></img>{" "}
                <div style={{width: "100%"}}></div>
                <Grid item md={12} xs={12}>
                    <Grid container direction="row" justify="center">
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: 22,
                                margin: 5,
                                fontWeight: "bold",
                            }}
                        >
                            {firstName + " " + lastName}
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                margin: 5,
                                width: "100%",
                                color: "#b2b2b2",
                                margin: 0,
                            }}
                        >
                            {email}
                        </p>
                    </Grid>
                </Grid>{" "}
                <div style={{width: "100%"}}></div>
                <div className={classes.input} style={{height: 10}}></div>
                <Grid item md={12} xs={12}>
          <span style={{color: emailVerified?"#60a3d6":"red"}} className={classes.label}
          
          onClick={ async ()=>{
            if(!emailVerified){
            try  {
                const emaill = {email: email}
            const emailResult = await sendEmailVerification(emaill)
            setOpenEmail(true)
            }
            catch(e)
            {
                setOpenLoader(false)
                alert(e)
            }
        }
          }
        }
          >
            Email
          </span>
                    <p style={{fontSize: 12, margin: 5}}>{email}</p>
                </Grid>
                <div style={{width: "100%"}}></div>
                <div className={classes.input} style={{height: 10}}></div>
                <Grid item md={12} xs={12}>
          <span style={{color: phoneVerified?"#60a3d6":"red"}} className={classes.label}
          onClick={ ()=>{
            if(!phoneVerified){
            try  {
             sendFirebaseOTP()
            }
            catch(e)
            {
                setOpenLoader(false)
                alert(e)
            }
        }
          }
        }
          >
            Phone Number
          </span>
                    <p style={{fontSize: 12, margin: 5}}>{phoneNumber}</p>
                </Grid>
                <div style={{width: "100%"}}></div>
                <div className={classes.input} style={{height: 10}}></div>
                <Grid item md={12} xs={12}>
          <span style={{color: "#60a3d6"}} className={classes.label}>
            Address
          </span>
                    <p style={{fontSize: 12, margin: 5}}>{address}</p>
                </Grid>
                <Grid item md={6} xs={6}>
          <span style={{color: "#60a3d6"}} className={classes.label}>
            Unit /APT
          </span>
                    <p style={{fontSize: 12, margin: 5}}>{unit}</p>
                </Grid>
                <Grid item md={6} xs={6}>
          <span style={{color: "#60a3d6"}} className={classes.label}>
            City
          </span>
                    <p style={{fontSize: 12, margin: 0}}>{city}</p>
                </Grid>
                <Grid item md={6} xs={6}>
          <span style={{color: "#60a3d6"}} className={classes.label}>
            State
          </span>
                    <p style={{fontSize: 12, margin: 5}}>{state}</p>
                </Grid>
                <Grid item md={6} xs={6}>
          <span style={{color: "#60a3d6"}} className={classes.label}>
            Zipcode
          </span>
                    <p style={{fontSize: 12, margin: 5}}>{zipcode}</p>
                </Grid>
                <Grid item md={12} xs={12}>
          <span style={{color: "#60a3d6"}} className={classes.label}>
            Country
          </span>
                    <p style={{fontSize: 12, margin: 5}}>{country}</p>
                </Grid>
                {deleteProfile &&<Alert severity="error" style={{margin:0}} >
                    Your profile will be deleted and can't not be undone
                <button
                    
                    style={{width:"30%",height:30,background:"red",color:'white',  border: "none",
                    borderRadius: 15,cursor:'pointer'}}
                    onClick={() => {
                        
                       deleteUserProfile()
                    }}
                >
                    YES
                </button>
                <button
                 
                 style={{width:"30%",height:30,margin:20, background: "#1075c2",color:'white',border: "none",
                 borderRadius: 15,cursor:'pointer'}}
                    onClick={() => {
                        
                        setDeleteProfile(false)
                    }}
                >
                    NO
                </button>
                </Alert>
                }
                <button
                    className={classes.button}
                    onClick={() => {
                        setEdit(true);
                    }}
                >
                    Edit
                </button>
                <button
                    className={classes.button}
              
                    onClick={() => {
                       setDeleteProfile(true)
                        
                    }}
                >
                    Delete
                </button>
            </Grid>
        );
    };

    const getMyProfile = () => {
        setOpenLoader(true);
        MyProfile().then(
            (res) => {
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
                    console.log(res.data.data,'myprofile');
                    var user = res.data.data;
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                    setPhoneNumber("+"+user.countryPhoneCode+user.phoneNumber);
                    setAddress(user.address);
                    setCity(user.city);
                    setState(user.state);
                    setUnit(user.unit);
                    setZipcode(user.zipcode);
                    setCountry(user.country);
                    setLongitude(user.longitude);
                    setLatitude(user.latitude);
                    setEmail(user.email);
                    setProfileImage(user.profileImage);
                    setEmailVerified(user.emailVerified);
                    setPhoneVerified(user.phoneNumberVerified)
                    console.log("myprofile",res.data)

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

    useEffect(() => {
        getMyProfile();
        localStorage.setItem('prevurl','')
    }, []);

    const notify = (data) => toast(data);
    return (
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
            <Link id="homepage" to="/homepage"></Link>
            <Link id="reviews" to="/reviews/0"></Link>
            <div style={{borderBottom: "1px solid #e9e9e9", height: 60}}>
                <Header
                    onSidebarDisplay={() => {
                        setEdit(true);
                    }}
                    heading={edit?"Edit Profile":"User Profile"}
                    leftIcon={
                        <ArrowBackIosIcon
                            style={{cursor: "pointer"}}
                            onClick={() => {
                               if(edit)
                            {
                                setEdit(false)
                                window.location.reload()
                            }
                                else
                                document.getElementById("homepage").click();
                            }}
                        ></ArrowBackIosIcon>
                    }
                    rightIcon={<div></div>}
                ></Header>{" "}
                {edit ? (
                    <EditProfile
                        setEdit={setEdit}
                        profileImage={profileImage}
                        setProfileImage={setProfileImage}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        address={address}
                        setAddress={setAddress}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        unit={unit}
                        setUnit={setUnit}
                        city={city}
                        setCity={setCity}
                        state={state}
                        setState={setState}
                        zipcode={zipcode}
                        setZipcode={setZipcode}
                        country={country}
                        setCountry={setCountry}
                        emailVerified={emailVerified}
                        setEmailVerified={setEmailVerified}
                        phoneVerified={phoneVerified}
                        setPhoneVerified={setPhoneVerified}
                        updateMyProfile={updateMyProfile}
                    ></EditProfile>
                ) :
                openEmail ?(
                    <ConfirmEmail
                      onSuccessOtp={
                    async () => {
                        setOpenLoader(true);
                        try {
                            const res = await UpdateCustomerProfile({emailVerified: true});
                            window.location.reload()
                        }catch(e)
                        { 
                            alert(e)
                        }
                      }
                    }
                    goBack={
                        () => {
                            setOpenEmail(false);
                            setOpenLoader(false)
                        }
                    }
                    notify={notify}
                    setOpenLoader={setOpenLoader}
                    
                    />
                ):
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
                              setPhoneVerified(true)
                             setGoToOtp(false)
                            }
                        }
                    ></ConfirmOtp>
                ) :
                 (
                    <Profile></Profile>
                )}
            </div>
        </div>
    );
}
