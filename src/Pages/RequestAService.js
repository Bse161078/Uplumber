import React, {useState, useEffect} from "react";
import {
    makeStyles,
    Grid,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormGroup,
    Checkbox,
    CircularProgress,
    Backdrop,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Link, withRouter} from "react-router-dom";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Calendar from "react-calendar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {ToastContainer, toast} from "react-toastify";

import ContactDetails from "../Components/RequestService/ContactDetails";
import DescriptionAndPhoto from "../Components/RequestService/DescriptionAndPhoto";
import {
    PostARequest,
    CustomerSericeUpdateProblem,
    CustomerSericeUpdateLookingfor,
    CustomerSericeUpdateProperty,
    CustomerSericeUpdateDescriptionAndPhoto,
    CustomerSericeUpdateInssurance,
    CustomerSericeUpdateContactDetails,
    MyProfile,
    GetAllInssuraceCompanies,
    getAreas,
    getHomeStructures,
    getPrefferedTimings,
    getLookingFor,
    getItems,
    getRequestorStatus,
    uploadImage,
    checkUser,
    AddLeadPrice
} from "../ApiHelper";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

const useStyles = makeStyles((theme) => ({
    input: {
        border: "none",
        borderBottom: "1px solid #e9e9e9",
        width: "100%",
        height: 40,
        fontSize: 12,
    },
    label: {
        width: "100%",
        // color: "#aeaeae",
        color: "#1075c2",
        margin: 0,
        fontSize: 13,
        marginTop: 20,
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
    heading: {
        fontSize: 16,
        margin: 0,
        marginTop: 10,
        fontWeight: 600,
    },
    icon: {marginTop: 10, fontSize: 16, color: "#2d86c9"},
    labelBlack: {
        width: "100%",
        margin: 0,
        fontSize: 13,
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 15,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

function ProviderDetail(props) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const [bottomState, setBottomState] = React.useState(false);
    const [calendar, setCalendar] = React.useState(false);
    const [prfferedTime, setPrefferedTime] = React.useState(false);
    const [postRequest, setPostRequest] = React.useState(false);

    const [allAreas, setAllAreas] = React.useState(null);
    const [value, setValue] = React.useState("As soon as possible");
    const [itemName, setItemName] = React.useState("Air-Condition");
    const [openLoader, setOpenLoader] = useState(false);
    const [calendarType, setCalendarType] = React.useState("");
    const [item, setItem] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState("Problem");
    const [editing, setEditing] = React.useState(false);
    const [image, setImage] = React.useState([]);

    const [requestData, setRequestData] = useState({
        requestDate: localStorage.getItem("requestDate") || new Date(),
        prfferedTime: localStorage.getItem("prfferedTime") || "As soon a possible",
        itemName: localStorage.getItem("itemName") || "Air-Condition",
        serviceType: localStorage.getItem("serviceType") || "Repair",
        requestOption:
            localStorage.getItem("requestOption") || "Auto accept 1st offer",
        waterDamage: localStorage.getItem("waterDamage") || "No",
        lookingFor:
            localStorage.getItem("lookingFor") != null
                ? JSON.parse(localStorage.getItem("lookingFor"))
                : [],
        area: localStorage.getItem("area") || "Bathroom",
        structure: localStorage.getItem("structure") || "Single Home",
        requestorStatus: localStorage.getItem("requestorStatus") || "Home Owner",
        description: localStorage.getItem("description") || "",
        image: localStorage.getItem("image")
            ? JSON.parse(localStorage.getItem("image"))
            : null,
        company: localStorage.getItem("company") || "",
        policyNumber: localStorage.getItem("policyNumber") || "",
        expiryDate: localStorage.getItem("expiryDate") || new Date(),
        deduction: localStorage.getItem("deduction") || "",
        userName: localStorage.getItem("userName") || "",
        userPhone: localStorage.getItem("userPhone") || "+1",
        allowSms: localStorage.getItem("allowSms")
            ? JSON.parse(localStorage.getItem("allowSms"))
            : true,
        allowContact: "yes",
        userEmail: localStorage.getItem("userEmail") || "",
        userAddress: localStorage.getItem("userAddress") || "",
        userUnit: localStorage.getItem("userUnit") || "",
        userCity: localStorage.getItem("userCity") || "",
        userState: localStorage.getItem("userState") || "",
        userZipCode: localStorage.getItem("userZipCode") || "",
        currentLocation: localStorage.getItem("userCurrentLocation")
            ? JSON.parse(localStorage.getItem("userCurrentLocation"))
            : "",
        leadPrice: Number(localStorage.getItem("leadPrice"))||30,

    });
    console.log("this is user state", localStorage.getItem("userState"));

    const [prefferedTimeData, setPrefferedTimeData] = React.useState([]);
    const [inssuranceCompaniesData, setInssuranceCompaniesData] = React.useState(
        []
    );
    const [areasData, setAreasData] = React.useState([]);
    const [structuresData, setStructuresData] = React.useState([]);
    const [lookingForData, setLookingForData] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [requestorStatusData, setRequestorStatusData] = React.useState([]);

    useEffect(() => {
        console.log("This si user", JSON.parse(localStorage.getItem("userData")));
        handleSelect(localStorage.getItem("userAddress"));
        // getMyProfile();
        getInssuranceCompnies();
        getAllLookingFor();
        getAllAaeas();
        getAllStructures();
        getAllPrefferedTimings();
        getAllItems();
        getAllRequestorStatus();
        getLocation();

        // setRequestData({
        //   ...requestData,
        //   userName: user.firstName + " " + user.lastName,
        //   userPhone: "+" + user.phoneNumber,
        //   userEmail: user.email,
        //   userAddress: user.address,
        //   userCity: user.city,
        //   userState: user.state,
        //   userZipCode: user.zipcode,
        //   userUnit: user.unit,
        //   userState: user.state,
        // });
    
    }, []);

   

    // console.log("This is request data", requestData);
    // setRequestData({ ...requestData, [event.target.id]: event.target.value });

    // const handleChange = (address) => {
    //   console.log("This is the adress", address);
    // };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                console.log("This is the current Location", latLng);
                setRequestData("currentLocation", {
                    latitude: latLng.lat,
                    longitude: latLng.lng,
                });

                localStorage.setItem(
                    "userCurrentLocation",
                    JSON.stringify({latitude: latLng.lat, longitude: latLng.lng})
                );
            })
            .catch((error) => console.error("Error", error));
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const uploadMyImage = async (files) => {
        var temp = [];
        setOpenLoader(true);
        // console.log("This is great", data);
        for (var i = 0; i < files.length; i++) {
            uploadImage(files[i]).then(
                (res) => {
                    console.log(res);
                    if (res.data.success || res.status === 200 || res.status === 201) {
                        console.log("This is res of image upload", res);
                        temp.push(res.data);
                        setRequestData({...requestData, ["image"]: temp});
                        localStorage.setItem("image", JSON.stringify(temp));
                        console.log("Thiss i the requset data", requestData);
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

            setOpenLoader(false);

            // temp.push();
        }
        // setRequestData({ ...requestData, ["image"]: temp });
    };

    console.log("This is requesst data", requestData);

    const handleFileChange = (e) => {
        console.log("THis is great", e.target.files);
        var temp = [];
        //  uploadMyImage(e.target.files);
        // for (var i = 0; i < e.target.files.length; i++) {
        //   uploadMyImage(e.target.files[i]);
        //   // temp.push();
        // }
        // setRequestData({ ...requestData, ["image"]: temp });
    };

    const toggleDrawer = (anchor, open) => (event) => {
        setState(open);
    };
    const toggleDrawerBottom = (anchor, open) => (event) => {
        setBottomState(open);
    };
    const position = [51.505, -0.09];
    const [currentLocation, setCurrentLoction] = useState(null);
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
        console.log("This is the position", position.coords);
        setCurrentLoction(position.coords);
    };

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
 
    const add_lead_price = () => {
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
                        console.log("leadpriceadd",res.data);
                        localStorage.setItem("requestId", res.data._id);
                        const postData={ serviceId:res.data._id,leadPrice:localStorage.getItem("leadPrice")}
                       console.log("leadprice",postData)
                        AddLeadPrice(postData);
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
            notify("You need to login in order to post request!");
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
                leadPrice: requestData.leadPrice
            };
            localStorage.setItem("leadPrice",requestData.leadPrice)
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
            leadPrice: requestData.leadPrice

        };
        localStorage.setItem("leadPrice",requestData.leadPrice)
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
                leadPrice: requestData.leadPrice
            };
            localStorage.setItem("leadPrice",requestData.leadPrice)
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

    const updateCustomerPropertyDescriptionAndProperty = async (tab) => {
        console.log('updateCustomerPropertyDescriptionAndProperty = ', requestData.image);
        let photos = [];
        let videos = [];

        setOpenLoader(true);
        if (requestData.image != null && image.length > 0) {


            for (let i = 0; i < requestData.image.length; i++) {
                try {
                    const blobRes = await fetch(requestData.image[i].data);
                    const blob = await blobRes.blob();
                    console.log('blob = ', blob)
                    const uploadResponse = await uploadImage(new File([blob], requestData.image[i].name));

                    if (uploadResponse.status === 200) {
                        if ((requestData.image[i].file_type).includes("image")) {
                            photos.push(uploadResponse.data);
                        } else if ((requestData.image[i].file_type).includes("video")) {
                            videos.push(uploadResponse.data);
                        }
                    }
                } catch (e) {
                    console.log('e = ', e)
                }
            }
        }
        if (requestData.description && requestData.description.length > 0) {
            var data = {
                description: requestData.description,
                photos, videos
            };
            try {
                const res = await CustomerSericeUpdateDescriptionAndPhoto(data);
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
                } else {
                    notify("Something went wrong please try again later!");
                }
            }catch (e) {
                notify("Something went wrong please try again later!");
            }
        }
        else {
            notify("Please add description!");
            setOpenLoader(false);
            // notify(res.data.message);
        }
    };

    const updateCustomerPropertyInssurance = (tab) => {
        setOpenLoader(true);
        var data = {
            company: requestData.company,
            policyNumber: localStorage.getItem("policyNumber"),
            expiryDate: requestData.expiryDate,
            deduction: localStorage.getItem("deduction"),
            leadPrice: requestData.leadPrice
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
    // console.log("This si t", requestData);
    const updateCustomerContactDetails = async () =>
    {
        
       if (
            requestData.userName != "" &&
            requestData.userPhone || JSON.parse(localStorage.getItem("userData")).phoneNumber != "" &&
            requestData.userEmail || localStorage.getItem("email") != "" &&
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
                leadPrice: requestData.leadPrice
            };
            const res = await  CustomerSericeUpdateContactDetails(data)
            const postData={ serviceId:localStorage.getItem("requestId"),leadPrice:requestData.leadPrice}
            console.log("addleadpricedata",postData)
            const result = await AddLeadPrice(postData)
            console.log("customerUpdated",res.data)
            setOpenLoader(false);
                        // notify(res.data.message);
                        console.log("addleadprice",result);
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
                        setPostRequest(true);
        
    
    
}
else{
    notify("Please provide all information!")
}
}
  { /* const updateCustomerContactDetails = () => {
      
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
                leadPrice: requestData.leadPrice
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
                         notify(res.data.message);
                        console.log("updateService",res);
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
                        setPostRequest(true);
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
    };*/}

    const checkThisUser = () => {
        setOpenLoader(true);
        checkUser(requestData.userEmail, requestData.userPhone).then(
            (res) => {
                if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 200
                ) {
                    setOpenLoader(false);
                    console.log("THis si my proifle", res.data, '  ', requestData);
                    if (res.data.message === "Customer exists") {
                        localStorage.setItem("requestAfterLogin", "true");
                        document.getElementById("login").click();
                    } else {
                        document.getElementById("create-account").click();
                    }
                } else if (res.status === 404) {
                    if (res.data.message === "Customer not found") {
                        document.getElementById("create-account").click();
                    }
                }
            },
            (error) => {
                setOpenLoader(false);
                console.log("This is response", error.response);
                if (error.response.data.message === "Customer not found") {
                    document.getElementById("create-account").click();
                }
            }
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
                    res.status === 200
                ) {
                    setOpenLoader(false);
                    console.log("THis si my proifle", res.data.data);
                    var user = res.data.data;

                    // setUnit(user.unit);
                    // setCountry(user.country);
                    // setLongitude(user.longitude);
                    // setLatitude(user.latitude);
                    // setEmail(user.email);
                    // setProfileImage(user.profileImage);

                    setRequestData({
                        ...requestData,
                        userName: user.firstName + " " + user.lastName,
                    });
                }
            },
            (error) => {
                notify("Something went wrong fetching profile!");
                setOpenLoader(false);
                console.log("This is response", error.response);
            }
        );
    };

    const getInssuranceCompnies = () => {
        setOpenLoader(true);
        GetAllInssuraceCompanies().then(
            (res) => {
                if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 200
                ) {
                    setOpenLoader(false);
                    console.log("These are inssurace companies", res.data);
                    var temp = [];
                    res.data.Insurances.map((item) => {
                        temp.push({
                            title: item.Insurance,
                            value: item.Insurance,
                        });
                    });
                    setInssuranceCompaniesData(temp);
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
    const getAllAaeas = () => {
        setOpenLoader(true);
        getAreas().then(
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
                    console.log("These are areas", res.data);
                    var temp = [];
                    res.data.Insurances.map((item, index) => {
                        if (index == 0) {
                            console.log("This is coming here");
                            setTimeout(() => {
                                setRequestData({...requestData, area: item.Area});
                                localStorage.setItem("area", item.Area);
                            }, 3000);
                        }
                        temp.push({
                            title: item.Area,
                            value: item.Area,
                        });
                    });
                    setAreasData(temp);
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
    const getAllLookingFor = () => {
        setOpenLoader(true);
        getLookingFor().then(
            (res) => {
                if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 200
                ) {
                    setOpenLoader(false);
                    console.log("These are looking for", res.data);
                    setLookingForData(res.data.Insurances);
                    setRequestData({
                        ...requestData,
                        lookingFor: [res.data.Insurances[0].LookingFor],
                    });
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

    const getAllItems = () => {
        setOpenLoader(true);
        getItems().then(
            (res) => {
                if (res.data.success || res.status === 200 || res.status === 201) {
                    setOpenLoader(false);
                    console.log("These are looking for", res.data);
                    setItems(res.data.Customers);
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
    const getAllRequestorStatus = () => {
        setOpenLoader(true);
        getRequestorStatus().then(
            (res) => {
                if (res.data.success || res.status === 200 || res.status === 201) {
                    setOpenLoader(false);
                    console.log("These are reuestor Data", res.data);
                    setRequestorStatusData(res.data.ServiceTime);
                    setRequestData({
                        ...requestData,
                        requestorStatus: res.data.ServiceTime[0].Status,
                    });
                    localStorage.setItem(
                        "requestorStatus",
                        res.data.ServiceTime[0].Status
                    );
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

    const getAllStructures = () => {
        setOpenLoader(true);
        getHomeStructures().then(
            (res) => {
                if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 200
                ) {
                    setOpenLoader(false);
                    console.log("These are structures", res.data.Properties);

                    setRequestData({
                        ...requestData,
                        structure: res.data.Properties[0].property,
                    });
                    localStorage.setItem("structure", res.data.Properties[0].property);

                    setStructuresData(res.data.Properties);
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

    const getAllPrefferedTimings = () => {
        setOpenLoader(true);
        getPrefferedTimings().then(
            (res) => {
                if (
                    res.data.success ||
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 200
                ) {
                    setOpenLoader(false);
                    console.log("These are preffered timings", res.data.ServiceTime);
                    setPrefferedTimeData(res.data.ServiceTime);
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

    const ProblemSection = () => {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                style={{padding: 20, height: "max-content"}}
            >
                <div
                    className={classes.input}
                    style={{height: 50, paddingBottom: 35, marginBottom: 10}}
                >
                    <p className={classes.label}>Request Service on date *</p>
                    <input
                        className={classes.input}
                        onFocus={() => {
                            setCalendar(true);
                        }}
                        value={moment(requestData.requestDate).format("MMMM Do YYYY")}
                        style={{border: "none", width: "90%"}}
                        type={"text"}
                    ></input>
                    <DateRangeIcon
                        style={{color: "#1075c2"}}
                        onClick={() => {
                            setCalendar(true);
                        }}
                    ></DateRangeIcon>
                </div>

                <div
                    className={classes.input}
                    style={{height: 50, paddingBottom: 35, marginBottom: 10}}
                >
                    <p className={classes.label}>Preffered Service Time *</p>
                    <input
                        className={classes.input}
                        style={{border: "none", width: "90%"}}
                        type={"text"}
                        onFocus={() => {
                            setPrefferedTime(true);
                        }}
                        value={requestData.prfferedTime}
                    ></input>
                    <ArrowDropDownIcon
                        style={{color: "#1075c2"}}
                        onClick={() => {
                            setPrefferedTime(true);
                        }}
                    ></ArrowDropDownIcon>
                </div>

                <div
                    className={classes.input}
                    style={{height: 50, paddingBottom: 35, marginBottom: 10}}
                >
                    <p className={classes.label}>Service Item *</p>
                    <input
                        className={classes.input}
                        style={{border: "none", width: "90%"}}
                        type={"text"}
                        onFocus={() => {
                            setItem(true);
                        }}
                        value={requestData.itemName}
                    ></input>
                    <ArrowDropDownIcon
                        style={{color: "#1075c2"}}
                        onClick={() => {
                            setItem(true);
                        }}
                    ></ArrowDropDownIcon>
                </div>
                <p className={classes.label}>What service do you need *</p>
                <div
                    style={{
                        width: "100vw",
                        maxWidth: "100vw",
                        overflow: "scroll",
                        display: "flex",
                        height: 70,
                    }}
                >
                    {["Repair", "Replace", "New Install"].map((value) => {
                        return (
                            <button
                                className={classes.button}
                                style={{
                                    height: 30,
                                    padding: 5,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    marginRight: 10,
                                    minWidth: 80,
                                    fontSize: 11,
                                    width: "max-content",
                                    background:
                                        requestData.serviceType === value ? "#1075c2" : "#f2f2f2",
                                    color: requestData.serviceType === value ? "white" : "black",
                                }}
                                onClick={(e) => {
                                    setRequestData({
                                        ...requestData,
                                        serviceType: value,
                                    });
                                }}
                            >
                                {value}
                            </button>
                        );
                    })}
                </div>
                <p className={classes.label}>Request Options</p>
                <div
                    style={{
                        border: "1px solid #e9e9e9",
                        borderRadius: 20,
                        width: "100%",
                        padding: 10,
                        marginTop: 10,
                    }}
                >
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={requestData.requestOption}
                            onChange={(e) => {
                                setRequestData({
                                    ...requestData,
                                    requestOption: e.target.value,
                                });
                                localStorage.setItem("requestOption", e.target.value);
                            }}
                        >
                            <FormControlLabel
                                value="Auto accept 1st offer"
                                control={<Radio color="primary"/>}
                                label="Auto accept 1st offer"
                            />
                            <FormControlLabel
                                value="Open for multiple offers"
                                control={<Radio color="primary"/>}
                                label="Open for multiple offers"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <p className={classes.label}>Any flood or water damage? *</p>
                <div
                    style={{
                        width: "100vw",
                        borderBottom: "1px solid #e9e9e9",
                        display: "flex",
                        height: 70,
                    }}
                >
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 30,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                minWidth: "95%",
                                fontSize: 11,
                                width: "max-content",
                                background:
                                    requestData.waterDamage === "Yes" ? "#1075c2" : "#f2f2f2",
                                color: requestData.waterDamage === "Yes" ? "white" : "black",
                            }}
                            onClick={() => {
                                setRequestData({
                                    ...requestData,
                                    waterDamage: "Yes",
                                    lookingFor: ["Plumber", "Water Damage Specialist"],
                                });
                            }}
                        >
                            Yes
                        </button>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 30,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                minWidth: "95%",
                                fontSize: 11,
                                width: "max-content",
                                background: "#f2f2f2",
                                color: "black",
                                background:
                                    requestData.waterDamage === "No" ? "#1075c2" : "#f2f2f2",
                                color: requestData.waterDamage === "No" ? "white" : "black",
                            }}
                            onClick={() => {
                                setRequestData({
                                    ...requestData,
                                    waterDamage: "No",
                                });
                            }}
                        >
                            No
                        </button>
                    </Grid>
                </div>
                <div
                    style={{
                        width: "100vw",

                        display: "flex",
                        height: 70,
                    }}
                >
                    <Grid item md={8} xs={8}></Grid>
                    <Grid item md={4} xs={4}>
                        <button
                            className={classes.button}
                            style={{
                                height: 35,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                fontSize: 11,
                                borderRadius: 10,
                                width: "95%",
                            }}
                            onClick={() => {
                                // updateCustomerProblem();
                                if (editing) {
                                    setActiveTab("ReviewRequest");
                                } else {
                                    if (requestData.waterDamage === "Yes") {
                                        setActiveTab("Looking For");
                                    } else {
                                        setActiveTab("Property");
                                    }
                                }

                                //
                            }}
                        >
                            Next
                        </button>
                    </Grid>
                </div>
            </Grid>
        );
    };

    console.log("This is item", requestData);
    const LookingFor = () => {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                style={{padding: 20, height: "max-content"}}
            >
                <p style={{textAlign: "justify"}}>
                    You indicated that you have water damage , water damage expert my also
                    contact you. You may change below.
                </p>
                <FormGroup row style={{width: "100%"}}>
                    {lookingForData &&
                    lookingForData.map((item) => {
                        return (
                            <FormControlLabel
                                style={{width: "100%"}}
                                control={
                                    <Checkbox
                                        onClick={() => {
                                            if (requestData.lookingFor.includes(item.LookingFor)) {
                                                var temp = [];
                                                requestData.lookingFor.map((data) => {
                                                    if (data !== item.LookingFor) {
                                                        temp.push(data);
                                                    }
                                                });
                                                setRequestData({...requestData, lookingFor: temp});
                                                localStorage.setItem(
                                                    "lookingFor",
                                                    JSON.stringify(temp)
                                                );
                                            } else {
                                                var temp = requestData.lookingFor;
                                                temp.push(item.LookingFor);
                                                console.log("This is item", item.LookingFor);
                                                setRequestData({...requestData, lookingFor: temp});
                                                localStorage.setItem(
                                                    "lookingFor",
                                                    JSON.stringify(temp)
                                                );
                                            }
                                        }}
                                        icon={<CheckCircleIcon style={{color: "#efefef"}}/>}
                                        checkedIcon={
                                            <CheckCircleIcon style={{color: "#1075c2"}}/>
                                        }
                                        checked={requestData.lookingFor.includes(item.LookingFor)}
                                        name="checkedH"
                                    />
                                }
                                label={item.LookingFor}
                            />
                        );
                    })}
                </FormGroup>
                <div
                    style={{
                        width: "95vw",
                        borderBottom: "1px solid #e9e9e9",
                        display: "flex",
                        // position: "absolute",
                        bottom: 0,
                        height: 70,
                    }}
                >
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 35,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                fontSize: 11,
                                borderRadius: 10,
                                width: "95%",
                                background: "#f2f2f2",
                                color: "black",
                            }}
                            onClick={() => {
                                setActiveTab("Problem");
                            }}
                        >
                            Prev
                        </button>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 35,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                fontSize: 11,
                                borderRadius: 10,
                                width: "95%",
                            }}
                            onClick={() => {
                                // updateCustomerLookingFor();
                                if (editing) {
                                    setActiveTab("ReviewRequest");
                                } else {
                                    setActiveTab("Property");
                                }
                            }}
                        >
                            Next
                        </button>
                    </Grid>
                </div>
            </Grid>
        );
    };

    const Property = () => {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                style={{padding: 20, height: "max-content"}}
            >
                <p className={classes.label}>Area *</p>
                {areasData && (
                    <Autocomplete
                        options={areasData && areasData}
                        onChange={(event, values) => {
                            if (values) {
                                setRequestData({...requestData, area: values.title});
                                localStorage.setItem("area", values.title);
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
                                label={requestData.area || areasData[0].title}
                                {...params}
                            />
                        )}
                    />
                )}

                <p className={classes.label}>Property *</p>
                <div
                    style={{
                        width: "100vw",
                        maxWidth: "100vw",
                    }}
                >
                    {structuresData &&
                    structuresData.map((value) => {
                        if (value.Name != "") {
                            return (
                                <button
                                    className={classes.button}
                                    style={{
                                        height: 30,
                                        padding: 5,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        marginRight: 10,
                                        minWidth: 80,
                                        fontSize: 11,
                                        width: "max-content",
                                        background:
                                            requestData.structure === value.property ||
                                            structuresData[0] === value.property
                                                ? "#1075c2"
                                                : "#f2f2f2",
                                        color:
                                            requestData.structure === value.property ||
                                            structuresData[0] === value.property
                                                ? "white"
                                                : "black",
                                    }}
                                    onClick={() => {
                                        setRequestData({
                                            ...requestData,
                                            structure: value.property,
                                        });
                                        localStorage.setItem("structure", value.property);
                                    }}
                                >
                                    {value.property}
                                </button>
                            );
                        }
                    })}
                </div>
                <p className={classes.label}>Requestor Status *</p>
                <div
                    style={{
                        width: "100vw",
                        maxWidth: "100vw",
                    }}
                >
                    {requestorStatusData &&
                    requestorStatusData.map((value) => {
                        return (
                            <button
                                className={classes.button}
                                style={{
                                    height: 30,
                                    padding: 5,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    marginRight: 10,
                                    minWidth: 80,
                                    fontSize: 11,
                                    width: "max-content",
                                    background:
                                        requestData.requestorStatus === value.Status ||
                                        requestorStatusData[0] === value.Status
                                            ? "#1075c2"
                                            : "#f2f2f2",
                                    color:
                                        requestData.requestorStatus === value.Status ||
                                        requestorStatusData[0] === value.Status
                                            ? "white"
                                            : "black",
                                }}
                                onClick={() => {
                                    setRequestData({
                                        ...requestData,
                                        requestorStatus: value.Status,
                                    });
                                    localStorage.setItem("requestorStatus", value.Status);
                                }}
                            >
                                {value.Status}
                            </button>
                        );
                    })}
                </div>
                <div
                    style={{
                        width: "95vw",
                        borderBottom: "1px solid #e9e9e9",
                        display: "flex",
                        // position: "absolute",
                        bottom: 0,
                        height: 70,
                    }}
                >
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 35,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                fontSize: 11,
                                borderRadius: 10,
                                width: "95%",
                                background: "#f2f2f2",
                                color: "black",
                            }}
                            onClick={() => {
                                setActiveTab("Looking For");
                            }}
                        >
                            Prev
                        </button>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 35,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                fontSize: 11,
                                borderRadius: 10,
                                width: "95%",
                            }}
                            onClick={() => {
                                // updateCustomerProperty();
                                if (editing) {
                                    setActiveTab("ReviewRequest");
                                } else {
                                    setActiveTab("Description and Photo");
                                }
                            }}
                        >
                            Next
                        </button>
                    </Grid>
                </div>
            </Grid>
        );
    };

    const Insurance = () => {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                style={{padding: 20, height: "max-content"}}
            >
                <p className={classes.label}>Company *</p>
                <Autocomplete
                    options={inssuranceCompaniesData && inssuranceCompaniesData}
                    getOptionLabel={(option) => option.title}
                    style={{
                        // width: 300,
                        // marginLeft: 20,
                        // marginTop: 20,
                        // marginBottom: 20
                        border: "none",
                        width: "100%",
                    }}
                    onChange={(event, values) => {
                        if (values) {
                            setRequestData({...requestData, company: values.title});
                        }
                    }}
                    renderInput={(params) => (
                        <TextField label={requestData.company} {...params} />
                    )}
                />

                <p className={classes.label}>Policy Number</p>
                <input
                    className={classes.input}
                    type={"text"}
                    // value={requestData.policyNumber}
                    onChange={(e) => {
                        // setRequestData({ ...requestData, policyNumber: e.target.value });
                        localStorage.setItem("policyNumber", e.target.value);
                    }}
                ></input>

                <div
                    className={classes.input}
                    style={{height: 50, paddingBottom: 35, marginBottom: 10}}
                >
                    <p className={classes.label}>Expiry Date *</p>
                    <input
                        className={classes.input}
                        style={{border: "none", width: "90%"}}
                        type={"text"}
                        value={moment(requestData.expiryDate).format("MMMM Do YYYY")}
                    ></input>
                    <DateRangeIcon
                        style={{color: "#1075c2"}}
                        onClick={() => {
                            setCalendarType("expiryDate");
                            setCalendar(true);
                        }}
                    ></DateRangeIcon>
                </div>

                <div
                    className={classes.input}
                    style={{height: 50, paddingBottom: 35, marginBottom: 10}}
                >
                    <p className={classes.label}>Deduction </p>
                    <input
                        className={classes.input}
                        style={{border: "none", width: "80%"}}
                        type={"text"}
                        onChange={(e) => {
                            //  setRequestData({ ...requestData, deduction: e.target.value });
                            localStorage.setItem("deduction", e.target.value);
                        }}
                    ></input>
                    {/* <RemoveCircleIcon style={{ color: "#1075c2" }}></RemoveCircleIcon>
          <AddCircleIcon style={{ color: "#1075c2" }}></AddCircleIcon> */}
                </div>
                <div
                    style={{
                        width: "95vw",
                        borderBottom: "1px solid #e9e9e9",
                        display: "flex",
                        // position: "absolute",
                        bottom: 0,
                        height: 70,
                    }}
                >
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 35,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                fontSize: 11,
                                borderRadius: 10,
                                width: "95%",
                                background: "#f2f2f2",
                                color: "black",
                            }}
                            onClick={() => {
                                setActiveTab("Description and Photo");
                            }}
                        >
                            Prev
                        </button>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <button
                            className={classes.button}
                            style={{
                                height: 35,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                marginRight: 10,
                                fontSize: 11,
                                borderRadius: 10,
                                width: "95%",
                            }}
                            onClick={() => {
                                // updateCustomerPropertyInssurance();
                                if (editing) {
                                    setActiveTab("ReviewRequest");
                                } else {
                                    setActiveTab("Contact Details");
                                }
                            }}
                        >
                            Next
                        </button>
                    </Grid>
                </div>
            </Grid>
        );
    };

    const ReviewRequest = () => {
        console.log("requestData",requestData)
        return (
            <Grid
                container
                direction="row"
                justify="center"
                style={{padding: 10, height: "max-content", marginTop: -60}}
            >
                <div
                    style={{
                        width: "100%",

                        background: "white",
                        borderRadius: 20,
                        padding: 10,
                    }}
                >
                    <Grid container direction="row">
                        <Grid item md={11} xs={11}>
                            {" "}
                            <p className={classes.heading}>Problem</p>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <EditIcon
                                className={classes.icon}
                                onClick={() => {
                                    setActiveTab("Problem");
                                    setEditing(true);
                                }}
                            ></EditIcon>
                        </Grid>
                    </Grid>
                    <p className={classes.label}>Request Service on date *</p>
                    <p className={classes.labelBlack}>
                        {moment(requestData.requestDate).format("MMMM Do YYYY")}{" "}
                    </p>
                    <p className={classes.label}>Preffered service time *</p>
                    <p className={classes.labelBlack}>{requestData.prfferedTime}</p>

                    <p className={classes.label}>What item is having problem?</p>
                    <p className={classes.labelBlack}>{requestData.itemName}</p>

                    <p className={classes.label}>What service do you need ? *</p>
                    <p className={classes.labelBlack}>{requestData.serviceType}</p>

                    <p className={classes.label}>Request Option *</p>
                    <p className={classes.labelBlack}>{requestData.requestOption}</p>

                    <p className={classes.label}>Any flood of water damage? *</p>
                    <p className={classes.labelBlack}>{requestData.waterDamage}</p>
                </div>

                <div
                    style={{
                        width: "100%",

                        background: "white",
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 20,
                    }}
                >
                    <Grid container direction="row">
                        <Grid item md={11} xs={11}>
                            {" "}
                            <p className={classes.heading}>Looking For</p>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <EditIcon
                                className={classes.icon}
                                onClick={() => {
                                    setActiveTab("Looking For");
                                    setEditing(true);
                                }}
                            ></EditIcon>
                        </Grid>
                    </Grid>
                    <FormGroup row style={{width: "100%"}}>
                        {requestData.lookingFor.map((item) => {
                            return (
                                <FormControlLabel
                                    checked={true}
                                    control={
                                        <Checkbox
                                            icon={<CheckCircleIcon style={{color: "#efefef"}}/>}
                                            checkedIcon={
                                                <CheckCircleIcon style={{color: "#1075c2"}}/>
                                            }
                                            name="checkedH"
                                        />
                                    }
                                    label={item}
                                />
                            );
                        })}
                    </FormGroup>
                </div>

                <div
                    style={{
                        width: "100%",

                        background: "white",
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 20,
                    }}
                >
                    <Grid container direction="row">
                        <Grid item md={11} xs={11}>
                            {" "}
                            <p className={classes.heading}>Property</p>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <EditIcon
                                className={classes.icon}
                                onClick={() => {
                                    setActiveTab("Property");
                                    setEditing(true);
                                }}
                            ></EditIcon>
                        </Grid>
                    </Grid>
                    <p className={classes.label}>Area *</p>
                    <p className={classes.labelBlack}>{requestData.area} </p>
                    <p className={classes.label}>Structure</p>
                    <p className={classes.labelBlack}>{requestData.structure}</p>

                    <p className={classes.label}>Requestor Status</p>
                    <p className={classes.labelBlack}>{requestData.requestorStatus}</p>
                </div>

                <div
                    style={{
                        width: "100%",

                        background: "white",
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 20,
                    }}
                >
                    <Grid container direction="row">
                        <Grid item md={11} xs={11}>
                            {" "}
                            <p className={classes.heading}>Description and Photo</p>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <EditIcon
                                className={classes.icon}
                                onClick={() => {
                                    setActiveTab("Description and Photo");
                                    setEditing(true);
                                }}
                            ></EditIcon>
                        </Grid>
                    </Grid>
                    <p className={classes.label}>problem Description *</p>
                    <p className={classes.labelBlack}>
                        {localStorage.getItem("description")}{" "}
                    </p>
                    <p className={classes.label}>Photos</p>
                    {requestData.image && requestData.image.length > 0 &&
                    requestData.image.map((img) => {
                        let imageDiv = null;
                        if (img.type === 'image') {
                            imageDiv = <img src={img.data} style={{padding: 20}} className={classes.image}/>
                        } else if (img.type === 'video') {
                            imageDiv = <video width={130} height={100} style={{padding: 20}} controls>
                                <source src={img.data} id="video_here"/>
                                Your browser does not support HTML5 video.
                            </video>
                        }
                        return imageDiv;
                    })}
                </div>

                <div
                    style={{
                        width: "100%",

                        background: "white",
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 20,
                    }}
                >
                    <Grid container direction="row">
                        <Grid item md={11} xs={11}>
                            {" "}
                            <p className={classes.heading}>Insurance</p>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <EditIcon
                                className={classes.icon}
                                onClick={() => {
                                    setActiveTab("Insurance");
                                    setEditing(true);
                                }}
                            ></EditIcon>
                        </Grid>
                    </Grid>
                    <p className={classes.label}>Company *</p>
                    <p className={classes.labelBlack}>{requestData.company} </p>
                    <p className={classes.label}>Policy Number</p>
                    <p className={classes.labelBlack}>
                        {localStorage.getItem("policyNumber")}{" "}
                    </p>
                    <p className={classes.label}>Expiry Date</p>
                    <p className={classes.labelBlack}>
                        {moment(requestData.expiryDate).format("MMMM Do YYYY")}{" "}
                    </p>
                    <p className={classes.label}>Deduction</p>
                    <p className={classes.labelBlack}>
                        {" "}
                        {localStorage.getItem("deduction")}{" "}
                    </p>
                </div>

                <div
                    style={{
                        width: "100%",

                        background: "white",
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 20,
                    }}
                >
                    <Grid container direction="row">
                        <Grid item md={11} xs={11}>
                            {" "}
                            <p className={classes.heading}>Contact Details</p>
                        </Grid>
                        <Grid item md={1} xs={1}>
                            <EditIcon
                                className={classes.icon}
                                onClick={() => {
                                    setActiveTab("Contact Details");
                                }}
                            ></EditIcon>
                        </Grid>
                    </Grid>
                    <p className={classes.label}>Name *</p>
                    <p className={classes.labelBlack}> {requestData.userName}</p>
                    <p className={classes.label}>Phone *</p>
                    <p className={classes.labelBlack}>{"+"+localStorage.getItem("phoneNumber")} </p>
                    <p className={classes.label}>Allow U plumber to contact you</p>
                    <p className={classes.labelBlack}>
                        {requestData.allowSms ? "Yes" : "No"}{" "}
                    </p>
                    <p className={classes.label}>Email * </p>
                    
                    <p className={classes.labelBlack}>{requestData.userEmail?requestData.userEmail:localStorage.getItem("email")} </p>
                    <p className={classes.label}>Address * </p>
                    <p className={classes.labelBlack}>{requestData.userAddress} </p>
                    <p className={classes.label}>Unit / APT </p>
                    <p className={classes.labelBlack}>{requestData.userUnit} </p>
                    <p className={classes.label}>City * </p>
                    <p className={classes.labelBlack}>{requestData.userCity} </p>
                    <p className={classes.label}>State * </p>
                    <p className={classes.labelBlack}>{requestData.userState} </p>
                    <p className={classes.label}>Zipcode * </p>
                    <p className={classes.labelBlack}>{requestData.userZipCode} </p>
                </div>
                <Link id="homepage" to="/homepage"></Link>
                <Link id="current-requests" to="/current-requests"></Link>
                <button
                    className={classes.button}
                    onClick={() => {
                        if (
                            requestData.requestDate != "" &&
                            requestData.prfferedTime != "" &&
                            requestData.itemName != "" &&
                            requestData.serviceType != "" &&
                            requestData.waterDamage != "" &&
                            requestData.serviceType != "" &&
                            requestData.area != "" &&
                            requestData.structure != "" &&
                            requestData.requestorStatus != "" &&
                            requestData.description != "" &&
                            requestData.userName != "" &&
                            requestData.userPhone != "" &&
                            requestData.userEmail != "" &&
                            requestData.userAddress != "" &&
                            requestData.userCity != "" &&
                            requestData.userState != "" &&
                            localStorage.getItem("userCurrentLocation") != null
                        // requestData.currentLocation != ""
                        ) {
                            if (localStorage.getItem("id") && localStorage.getItem("token")) {
                                postMyRequest();
                             
                            } else {
                                localStorage.setItem("userState",requestData.userState)
                                checkThisUser();
                               
                            }
                        } else {
                                console.log("PLease fill the information")
                                alert("Please fill complete information");
                            
                        }
                    }}
                >
                    Submit A Request
                </button>
            </Grid>
        );
    };
    const notify = (data) => toast(data);
    // console.log("This iserquest data", requestData);
    return (
        <div style={{background: "#f2f2f2", background: "white"}}>
            <Link id="sumittedRequest" to="/sumittedRequest"></Link>
            <Link id="homepage" to="/homepage"></Link>
            <Link id="login" to="/login"></Link>
            <Link id="create-account" to="/create-account"></Link>

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
            <Link id="reviews" to="/reviews/0"></Link>
            <div style={{borderBottom: "1px solid #e9e9e9", height: 60}}>
                <Header
                    onSidebarDisplay={() => {
                        setState(true);
                    }}
                    heading={
                        activeTab != "ReviewRequest"
                            ? "Request a Service"
                            : "Review Request"
                    }
                    leftIcon={
                        <ArrowBackIosIcon
                            style={{cursor: "pointer"}}
                            onClick={() => {
                                if (activeTab != "ReviewRequest") {
                                    if (activeTab === "Problem") {
                                        document.getElementById("homepage").click();
                                    }
                                    else if (activeTab === "Looking For") {
                                        setActiveTab("Problem")
                                    }
                                    else if (activeTab === "Property") {
                                        if (requestData.waterDamage === "Yes") {
                                            setActiveTab("Looking For")
                                        }
                                        else {
                                            setActiveTab("Problem")
                                        }
                                    }

                                    else if (activeTab === "Description and Photo") {

                                        setActiveTab("Property")

                                    }
                                    else if (activeTab === "Insurance") {
                                        setActiveTab("Description and Photo")
                                    }
                                    else if (activeTab === "Contact Details") {
                                        if (requestData.waterDamage === "Yes") {
                                            setActiveTab("Insurance")
                                        }
                                        else {
                                            setActiveTab("Description and Photo")
                                        }
                                    }


                                } else {
                                    setActiveTab("Contact Details");
                                }
                            }}
                        ></ArrowBackIosIcon>
                    }
                    rightIcon={<div></div>}
                ></Header>{" "}
            </div>

            <Grid
                container
                direction="row"
                justify="center"
                style={{
                    marginTop: 0,
                    maxHeight: "calc( 100vh - 100px )",
                    minHeight: "calc( 100vh - 100px )",
                    overflowY: "scroll",
                    height: "max-content",
                    background: activeTab != "ReviewRequest" ? "white" : "#f2f2f2",
                }}
                className="hideScrollBar"
            >
                <div style={{width: "100%"}}>
                    <div
                        style={{
                            width: "100vw",
                            maxWidth: "100vw",
                            overflow: "scroll",
                            display: "flex",
                            height: 70,
                        }}
                    >
                        {activeTab != "ReviewRequest" &&
                        [
                            "Problem",
                            "Looking For",
                            "Property",
                            "Description and Photo",
                            "Insurance",
                            "Contact Details",
                        ].map((value) => {
                            if (value === "Looking For" || value === "Insurance") {
                                if (requestData.waterDamage === "Yes") {
                                    return (
                                        <button
                                            className={classes.button}
                                            style={{
                                                height: 30,
                                                padding: 5,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                marginLeft: 10,
                                                minWidth: 130,
                                                fontSize: 11,
                                                width: "max-content",
                                                background:
                                                    activeTab === value ? "#1075c2" : "#f2f2f2",
                                                color: activeTab === value ? "white" : "black",
                                            }}
                                            onClick={() => {
                                                setActiveTab(value);
                                            }}
                                        >
                                            {value}
                                        </button>
                                    );
                                }
                            } else {
                                return (
                                    <button
                                        className={classes.button}
                                        style={{
                                            height: 30,
                                            padding: 5,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            marginLeft: 10,
                                            minWidth: 130,
                                            fontSize: 11,
                                            width: "max-content",
                                            background: activeTab === value ? "#1075c2" : "#f2f2f2",
                                            color: activeTab === value ? "white" : "black",
                                        }}
                                        onClick={() => {
                                            setActiveTab(value);
                                        }}
                                    >
                                        {value}
                                    </button>
                                );
                            }
                        })}
                    </div>
                    {activeTab === "Problem" ? (
                        <ProblemSection></ProblemSection>
                    ) : activeTab === "Looking For" ? (
                        <LookingFor></LookingFor>
                    ) : activeTab === "Property" ? (
                        <Property></Property>
                    ) : activeTab === "Description and Photo" ? (
                        <DescriptionAndPhoto
                            handleFileChange={handleFileChange}
                            setRequestData={(field, value) => {
                                setRequestData({...requestData, [field]: value});
                                console.log("THis is the request Data", requestData);
                            }}
                            image={requestData.image}
                            description={requestData.description}
                            setActiveTab={(tab) => {
                                if (requestData.waterDamage === "Yes") {
                                    setActiveTab(tab);
                                } else {
                                    setActiveTab("Contact Details");
                                }
                                // updateCustomerPropertyDescriptionAndProperty(tab);
                            }}
                        ></DescriptionAndPhoto>
                    ) : activeTab === "Insurance" ? (
                        <Insurance></Insurance>
                    ) : activeTab === "Contact Details" ? (
                        <ContactDetails
                            userName={requestData.userName}
                            userPhone={requestData.userPhone}
                            userAddress={requestData.userAddress}
                            // setCurrentLoction={(e) => {
                            //   localStorage.setItem(
                            //     "userCurrentLocation",
                            //     JSON.stringify({ latitude: e.lat, longitude: e.lng })
                            //   );
                            //   setCurrentLoction({ latitude: e.lat, longitude: e.lng });
                            // }}
                            userCity={requestData.userCity}
                            allowSms={requestData.allowSms}
                            userEmail={requestData.userEmail}
                            userZipCode={requestData.userZipCode}
                            userUnit={requestData.userUnit}
                            userState={requestData.userState}
                            requestData={requestData}
                            setRequestData={(field, value) => {
                                console.log("This is field", field);
                                setRequestData({...requestData, [field]: value});
                                console.log("THis is the request Data", requestData);
                            }}
                            updateAddressDetails={(data) => {

                                setRequestData({
                                    ...requestData,
                                    currentLocation: data.currentLocation,
                                    userAddress: data.userAddress,
                                    userCity: data.userCity,
                                    userZipCode: data.userZipCode,
                                    userState: data.userState
                                });
                            }}
                            setActiveTab={(tab) => {
                                console.log("This is the active tab", tab);
                                console.log("This is the editing ", editing);
                                setActiveTab("ReviewRequest");
                            }}
                        ></ContactDetails>
                    ) : (
                        <ReviewRequest></ReviewRequest>
                    )}
                </div>
                <div className="sideBar">
                    <Drawer
                        anchor={"left"}
                        open={state}
                        onClose={toggleDrawer("bottom", false)}
                    >
                        <div style={{width: "60vw"}}>
                            <Sidebar></Sidebar>
                        </div>
                    </Drawer>
                </div>
                <Drawer
                    anchor={"bottom"}
                    open={bottomState}
                    onClose={toggleDrawerBottom("bottom", false)}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        // alignItems="center"
                        style={{height: "max-content", paddingLeft: 20, paddingRight: 20}}
                    >
                        {" "}
                        <p
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,

                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            Rate and Review
                        </p>
                        <Rating style={{fontSize: 40}}></Rating>
                        <p className={classes.label}>Write Something</p>
                        <input
                            className={classes.input}
                            placeholder="Write Something"
                            style={{border: "none"}}
                        ></input>
                        <button
                            className={classes.button}
                            onClick={() => {
                                setBottomState(false);
                            }}
                        >
                            Submit
                        </button>
                    </Grid>
                </Drawer>

                <Drawer
                    anchor={"bottom"}
                    // open={needModifications}
                    open={calendar}
                    onClose={() => {
                        setCalendar(false);
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        // alignItems="center"
                        style={{height: "max-content", paddingLeft: 20, paddingRight: 20}}
                    >
                        {" "}
                        <p
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,

                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            Select a Date
                        </p>
                        <Calendar
                            onChange={(e) => {
                                if (calendarType === "expiryDate") {
                                    setRequestData({
                                        ...requestData,
                                        expiryDate: e,
                                    });
                                    setCalendar(false);
                                } else {
                                    console.log("Thhis is request date");
                                    setRequestData({
                                        ...requestData,
                                        requestDate: e,
                                    });
                                    setCalendar(false);
                                }
                            }}
                        ></Calendar>
                    </Grid>
                </Drawer>

                <Drawer
                    anchor={"bottom"}
                    // open={needModifications}
                    open={prfferedTime}
                    onClose={() => {
                        setPrefferedTime(false);
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        // alignItems="center"
                        style={{height: "max-content", paddingLeft: 20, paddingRight: 20}}
                    >
                        {" "}
                        <p
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,

                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            Select preffered time
                        </p>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="gender"
                                name="gender1"
                                value={requestData.prfferedTime}
                                onChange={(e) => {
                                    setRequestData({
                                        ...requestData,
                                        prfferedTime: e.target.value,
                                    });
                                }}
                            >
                                {prefferedTimeData &&
                                prefferedTimeData.map((item) => {
                                    return (
                                        <FormControlLabel
                                            value={item.ServiceTime}
                                            control={<Radio color="primary"/>}
                                            label={item.ServiceTime}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                        <button
                            style={{
                                color: "white",
                                border: "none",
                                borderRadius: 15,
                                width: "100%",
                                background: "#1075c2",
                                height: 45,
                            }}
                            onClick={() => {
                                setBottomState(false);
                            }}
                            onClick={() => {
                                setPrefferedTime(false);
                            }}
                        >
                            Done
                        </button>
                    </Grid>
                </Drawer>

                <Drawer
                    anchor={"bottom"}
                    // open={needModifications}
                    open={item}
                    onClose={() => {
                        setItem(false);
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        // alignItems="center"
                        style={{height: "max-content", paddingLeft: 20, paddingRight: 20}}
                    >
                        {" "}
                        <p
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,

                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            What item is having a problem?
                        </p>
                        <div style={{height: 400, maxHeight: 400, overflow: "scroll"}}>
                            <Grid container direction="row">
                                {items &&
                                items.map((stuff) => {
                                    return (
                                        <Grid item md={4} xs={4}>
                                            <Grid
                                                container
                                                direction="column"
                                                alignItems="center"
                                                style={{marginBottom: 20}}
                                                onClick={() => {
                                                    setRequestData({
                                                        ...requestData,
                                                        itemName: stuff.Description,
                                                        leadPrice:stuff.Price
                                                    });

                                                    localStorage.setItem("itemName", stuff.Description);
                                                    localStorage.setItem("leadPrice", stuff.Price);

                                                    setItem(false);
                                                }}
                                            >
                                                <img style={{width: "70%"}} src={stuff.Image}></img>
                                                <p
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "center",
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {stuff.Description}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </div>
                        <button
                            className={classes.button}
                            onClick={() => {
                                setBottomState(false);
                            }}
                            onClick={() => {
                                setPrefferedTime(false);
                            }}
                        >
                            Done
                        </button>
                    </Grid>
                </Drawer>

                <Drawer
                    anchor={"bottom"}
                    open={postRequest}
                    onClose={() => {
                        setPostRequest(false);
                        document.getElementById("current-requests").click();
                    }}
                >
                    <div style={{width: "100%", height: 300}}>
                        <Grid container direction="row" justify="center">
                            <CheckCircleIcon
                                style={{marginTop: 20, fontSize: 50, color: "#1075c2"}}
                            ></CheckCircleIcon>
                        </Grid>
                        <p
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,

                                textAlign: "center",
                                width: "100%",
                            }}
                        >
                            Thank you for your submission
                        </p>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            // alignItems="center"
                            style={{height: 120}}
                        >
                            <p
                                style={{
                                    fontSize: 12,
                                    textAlign: "center",
                                    width: "90%",
                                }}
                            >
                                Your service request has been submitted. Please wait for offers
                                from plumbers.
                            </p>
                            <p
                                style={{
                                    color: "#358acb",
                                    textDecoration: "underline",
                                    fontSize: 12,
                                    textAlign: "center",
                                    width: "90%",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    document.getElementById("current-requests").click();
                                }}
                            >
                                View My Requests
                            </p>
                            <button
                                className={classes.button}
                                onClick={() => {
                                    setBottomState(false);
                                }}
                                onClick={() => {
                                    document.getElementById("current-requests").click();
                                }}
                            >
                                Continue
                            </button>
                        </Grid>
                    </div>
                </Drawer>
            </Grid>
        </div>
    );
}

export default withRouter(ProviderDetail);
