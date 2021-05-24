import React, { useState } from "react";
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
  Badge,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Refrigertors from "../assets/refrigertors.png";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Calendar from "react-calendar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import AirConditioner from "../assets/problem/AirConditioner.png";
import Bathtub from "../assets/problem/Bathtub.png";
import Dishwasher from "../assets/problem/Dishwasher.png";
import Drain from "../assets/problem/Drain.png";
import Faucet from "../assets/problem/Faucet.png";
import Fireplace from "../assets/problem/Fireplace.png";
import GrarbageDisposal from "../assets/problem/GrarbageDisposal.png";
import Pipe from "../assets/problem/Pipe.png";
import Refrigerator from "../assets/problem/Refrigerator.png";
import Sewage from "../assets/problem/Sewage.png";
import Sink from "../assets/problem/Sink.png";
import Thermostat from "../assets/problem/Thermostat.png";
import Toilet from "../assets/problem/Toilet.png";
import Washer from "../assets/problem/Washer.png";
import WaterFilter from "../assets/problem/WaterFilter.png";
import WaterHeater from "../assets/problem/WaterHeater.png";

import ContactDetails from "../Components/RequestService/ContactDetails";
import DescriptionAndPhoto from "../Components/RequestService/DescriptionAndPhoto";

const items = [
  {
    image: AirConditioner,
    name: "Air Conditioner",
  },
  {
    image: Bathtub,
    name: "Bathtub",
  },
  {
    image: Dishwasher,
    name: "Dishwasher",
  },
  {
    image: Drain,
    name: "Drain",
  },
  {
    image: Faucet,
    name: "Faucet",
  },
  {
    image: Fireplace,
    name: "Fireplace",
  },
  {
    image: GrarbageDisposal,
    name: "GrarbageDisposal",
  },
  {
    image: Pipe,
    name: "Pipe",
  },
  {
    image: Refrigerator,
    name: "Refrigerator",
  },
  {
    image: Sewage,
    name: "Sewage",
  },
  {
    image: Sink,
    name: "Sink",
  },
  {
    image: Thermostat,
    name: "Thermostat",
  },
  {
    image: Toilet,
    name: "Toilet",
  },
  {
    image: Washer,
    name: "Washer",
  },
  {
    image: WaterFilter,
    name: "WaterFilter",
  },
  {
    image: WaterHeater,
    name: "WaterHeater",
  },
];

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
  icon: { marginTop: 10, fontSize: 16, color: "#2d86c9" },
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
}));
function ProviderDetail(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [calendar, setCalendar] = React.useState(false);
  const [prfferedTime, setPrefferedTime] = React.useState(false);
  const [postRequest, setPostRequest] = React.useState(false);
  const [value, setValue] = React.useState("As soon as possible");
  const [itemName, setItemName] = React.useState("Air Conditioner");
  const [calendarType, setCalendarType] = React.useState("");
  const [item, setItem] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Problem");
  const [image, setImage] = React.useState([]);
  const [requestData, setRequestData] = useState({
    requestDate: moment(new Date()).format("MMMM Do YYYY"),
    prfferedTime: localStorage.getItem("prfferedTime") || "As soon a possible",
    itemName: localStorage.getItem("itemName") || "Air Conditioner",
    serviceType: localStorage.getItem("serviceType") || "Repair",
    requestOption:
      localStorage.getItem("requestOption") || "Auto accept 1st offer",
    waterDamage: localStorage.getItem("waterDamage") || "Yes",
    lookingFor: localStorage.getItem("waterDamage")
      ? JSON.parse(localStorage.getItem("lookingFor"))
      : [],
    area: JSON.parse(localStorage.getItem("area")) || "",
    structure: JSON.parse(localStorage.getItem("structure")) || "",
    requestorStatus: JSON.parse(localStorage.getItem("requestorStatus")) || "",
    description: localStorage.getItem("description"),
    image: [],
    company: JSON.parse(localStorage.getItem("company")) || "",
    policyNumber: JSON.parse(localStorage.getItem("policyNumber")) || "",
    expiryDate: JSON.parse(localStorage.getItem("expiryDate")) || "",
    deduction: JSON.parse(localStorage.getItem("deduction")) || "",
    userName: "",
    userPhone: "",
    allowContact: "",
    userEmail: "",
    userAddress: "",
    userUnit: "",
    userCity: "",
    userState: "",
    userZipCode: "",
  });
  // setRequestData({ ...requestData, [event.target.id]: event.target.value });
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];
  //console.log("THis is great", props);

  const ProblemSection = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ padding: 20, height: "max-content" }}
      >
        <div
          className={classes.input}
          style={{ height: 50, paddingBottom: 35, marginBottom: 10 }}
        >
          <p className={classes.label}>Request Service on date *</p>
          <input
            className={classes.input}
            onFocus={() => {
              setCalendar(true);
            }}
            value={requestData.requestDate}
            style={{ border: "none", width: "90%" }}
            type={"text"}
          ></input>
          <DateRangeIcon
            style={{ color: "#1075c2" }}
            onClick={() => {
              setCalendar(true);
            }}
          ></DateRangeIcon>
        </div>

        {/* <Autocomplete
          options={[
            { title: "As soon as possible", year: 1994 },
            { title: "As soon as possible", year: 1994 },
          ]}
          getOptionLabel={(option) => option.title}
          style={{
            // width: 300,
            // marginLeft: 20,
            // marginTop: 20,
            // marginBottom: 20
            border: "none",
            width: "100%",
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <div
          className={classes.input}
          style={{ height: 50, paddingBottom: 35, marginBottom: 10 }}
        >
          <p className={classes.label}>Preffered Service Time *</p>
          <input
            className={classes.input}
            style={{ border: "none", width: "90%" }}
            type={"text"}
            onFocus={() => {
              setPrefferedTime(true);
            }}
            value={requestData.prfferedTime}
          ></input>
          <ArrowDropDownIcon
            style={{ color: "#1075c2" }}
            onClick={() => {
              setPrefferedTime(true);
            }}
          ></ArrowDropDownIcon>
        </div>
        {/* <p className={classes.label}>What item is having problem *</p>
        <Autocomplete
          options={[
            { title: "Dishwasher", year: 1994 },
            { title: "Dishwasher", year: 1994 },
          ]}
          getOptionLabel={(option) => option.title}
          style={{
            // width: 300,
            // marginLeft: 20,
            // marginTop: 20,
            // marginBottom: 20
            border: "none",
            width: "100%",
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <div
          className={classes.input}
          style={{ height: 50, paddingBottom: 35, marginBottom: 10 }}
        >
          <p className={classes.label}>Service Item *</p>
          <input
            className={classes.input}
            style={{ border: "none", width: "90%" }}
            type={"text"}
            onFocus={() => {
              setItem(true);
            }}
            value={requestData.itemName}
          ></input>
          <ArrowDropDownIcon
            style={{ color: "#1075c2" }}
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
              }}
            >
              <FormControlLabel
                value="Auto accept 1st offer"
                control={<Radio color="primary" />}
                label="Auto accept 1st offer"
              />
              <FormControlLabel
                value="Open for multiple offers"
                control={<Radio color="primary" />}
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
                setActiveTab("Looking For");
              }}
            >
              Next
            </button>
          </Grid>
        </div>
      </Grid>
    );
  };
  const LookingFor = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ padding: 20, height: "max-content" }}
      >
        <p style={{ textAlign: "justify" }}>
          You indicated that you have water damage , water damage expert my also
          contact you. You may change below.
        </p>
        <FormGroup row style={{ width: "100%" }}>
          {[
            "Plumbing Tecnician",
            "Cooling and Heating Technician",
            "Water and Flood Damage Specialist",
            "Mould Specialist",
            "Restoration Specialist",
          ].map((item) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => {
                      if (requestData.lookingFor.includes(item)) {
                        var temp = [];
                        requestData.lookingFor.map((data) => {
                          if (data !== item) {
                            temp.push(data);
                          }
                        });
                        setRequestData({ ...requestData, lookingFor: temp });
                      } else {
                        var temp = requestData.lookingFor;
                        temp.push(item);
                        console.log("This is item", item);
                        setRequestData({ ...requestData, lookingFor: temp });
                      }
                    }}
                    icon={<CheckCircleIcon style={{ color: "#efefef" }} />}
                    checkedIcon={
                      <CheckCircleIcon style={{ color: "#1075c2" }} />
                    }
                    checked={requestData.lookingFor.includes(item)}
                    name="checkedH"
                  />
                }
                label={item}
              />
            );
          })}
        </FormGroup>
        <div
          style={{
            width: "100vw",
            borderBottom: "1px solid #e9e9e9",
            display: "flex",
            position: "absolute",
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
                setActiveTab("Property");
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
        style={{ padding: 20, height: "max-content" }}
      >
        <p className={classes.label}>Area *</p>
        <Autocomplete
          options={[
            { title: "Kitchen", year: 1994 },
            { title: "Kitchen", year: 1994 },
          ]}
          onChange={(event, values) => {
            if (values) {
              setRequestData({ ...requestData, area: values.title });
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
            <TextField label={requestData.area} {...params} />
          )}
        />
        <p className={classes.label}>Structure *</p>
        <div
          style={{
            width: "100vw",
            maxWidth: "100vw",
          }}
        >
          {["Single Home", "APT/Conda Building", "Commercial", "Outdoor"].map(
            (value) => {
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
                      requestData.structure === value ? "#1075c2" : "#f2f2f2",
                    color: requestData.structure === value ? "white" : "black",
                  }}
                  onClick={() => {
                    setRequestData({ ...requestData, structure: value });
                  }}
                >
                  {value}
                </button>
              );
            }
          )}
        </div>
        <p className={classes.label}>Requestor Status *</p>
        <div
          style={{
            width: "100vw",
            display: "flex",
            height: 70,
          }}
        >
          {["Home Owner", "Property Manager", "Renter"].map((value) => {
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
                    requestData.requestorStatus === value
                      ? "#1075c2"
                      : "#f2f2f2",
                  color:
                    requestData.requestorStatus === value ? "white" : "black",
                }}
                onClick={() => {
                  setRequestData({ ...requestData, requestorStatus: value });
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
        <div
          style={{
            width: "100vw",
            borderBottom: "1px solid #e9e9e9",
            display: "flex",
            position: "absolute",
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
                setActiveTab("Description and Photo");
              }}
            >
              Next
            </button>
          </Grid>
        </div>
      </Grid>
    );
  };

  const handleFileChange = (e) => {
    console.log("Thes are files", e.target.files);
    var file = e.target.files;
    var im = [];
    for (var i = 0; i < e.target.files.length; i++) {
      im.push(e.target.files[i]);
    }
    setImage(im);
    setRequestData({ ...requestData, image: im });
    console.log("This is iamge", im);
  };
  // const DescriptionAndPhoto = () => {
  //   return (
  //     <Grid
  //       container
  //       direction="row"
  //       justify="center"
  //       style={{ padding: 20, height: "max-content" }}
  //     >
  //       <p style={{ textAlign: "justify" }}>
  //         Briefly describe your problem, please do not input any sensitive
  //         information here.
  //       </p>
  //       <textarea
  //         className={classes.input}
  //         style={{
  //           resize: "none",
  //           border: "1px solid #efefef",
  //           borderRadius: 20,
  //           height: 100,
  //           padding: 10,
  //         }}
  //         // value={requestData.description}
  //         onChange={(e) => {
  //           localStorage.setItem("description", e.target.value);
  //           // setRequestData({ ...requestData, description: e.target.value });
  //         }}
  //       ></textarea>
  //       <p className={classes.label}>Add Photos</p>
  //       <div style={{ width: "100%", marginTop: 20 }}>
  //         <input
  //           // required
  //           type="file"
  //           name="image"
  //           id="images"
  //           multiple
  //           className="form-control"
  //           // value={post.image.name}
  //           style={{ display: "none" }}
  //           onChange={handleFileChange}
  //         />
  //         <Grid container direction="row" alignItems="center">
  //           {requestData.image.length > 1 &&
  //             requestData.image.map((img) => {
  //               return (
  //                 <Badge
  //                   badgeContent={
  //                     <CancelIcon
  //                       style={{ color: "red", marginLeft: -40 }}
  //                       onClick={() => {
  //                         var temp = [];
  //                         requestData.image.map((data) => {
  //                           console.log("This is imaeg", img.name, data.name);
  //                           if (data.name != img.name) {
  //                             temp.push(data);
  //                           }
  //                         });
  //                         console.log("THis is ", temp);
  //                         setRequestData({ ...requestData, image: temp });
  //                       }}
  //                     ></CancelIcon>
  //                   }
  //                   color=""
  //                 >
  //                   <img
  //                     src={URL.createObjectURL(img)}
  //                     className={classes.image}
  //                   />
  //                 </Badge>
  //               );
  //             })}
  //           <Grid
  //             style={{
  //               width: 100,
  //               height: 100,
  //               background: "#efefef",
  //               borderRadius: 5,
  //             }}
  //             container
  //             direction="row"
  //             justify="center"
  //             alignItems="center"
  //             onClick={() => {
  //               document.getElementById("images").click();
  //             }}
  //           >
  //             <CameraAltIcon></CameraAltIcon>
  //           </Grid>
  //         </Grid>
  //         <div
  //           style={{
  //             width: "100vw",
  //             borderBottom: "1px solid #e9e9e9",
  //             display: "flex",
  //             position: "absolute",
  //             bottom: 0,
  //             height: 70,
  //           }}
  //         >
  //           <Grid item md={6} xs={6}>
  //             <button
  //               className={classes.button}
  //               style={{
  //                 height: 35,
  //                 padding: 5,
  //                 paddingLeft: 10,
  //                 paddingRight: 10,
  //                 marginRight: 10,
  //                 fontSize: 11,
  //                 borderRadius: 10,
  //                 width: "95%",
  //                 background: "#f2f2f2",
  //                 color: "black",
  //               }}
  //               onClick={() => {
  //                 setActiveTab("Property");
  //               }}
  //             >
  //               Prev
  //             </button>
  //           </Grid>
  //           <Grid item md={6} xs={6}>
  //             <button
  //               className={classes.button}
  //               style={{
  //                 height: 35,
  //                 padding: 5,
  //                 paddingLeft: 10,
  //                 paddingRight: 10,
  //                 marginRight: 10,
  //                 fontSize: 11,
  //                 borderRadius: 10,
  //                 width: "95%",
  //               }}
  //               onClick={() => {
  //                 setActiveTab("Inssurance");
  //               }}
  //             >
  //               Next
  //             </button>
  //           </Grid>
  //         </div>
  //       </div>
  //     </Grid>
  //   );
  // };

  const Inssurance = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ padding: 20, height: "max-content" }}
      >
        <p className={classes.label}>Company *</p>
        <Autocomplete
          options={[
            { title: "As soon as possible", year: 1994 },
            { title: "As soon as possible", year: 1994 },
          ]}
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
              setRequestData({ ...requestData, company: values.title });
            }
          }}
          renderInput={(params) => (
            <TextField label={requestData.company} {...params} />
          )}
        />

        <p className={classes.label}>Policy Number *</p>
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
          style={{ height: 50, paddingBottom: 35, marginBottom: 10 }}
        >
          <p className={classes.label}>Expiry Date *</p>
          <input
            className={classes.input}
            style={{ border: "none", width: "90%" }}
            type={"text"}
            value={requestData.expiryDate}
          ></input>
          <DateRangeIcon
            style={{ color: "#1075c2" }}
            onClick={() => {
              setCalendarType("expiryDate");
              setCalendar(true);
            }}
          ></DateRangeIcon>
        </div>

        <div
          className={classes.input}
          style={{ height: 50, paddingBottom: 35, marginBottom: 10 }}
        >
          <p className={classes.label}>Deduction </p>
          <input
            className={classes.input}
            style={{ border: "none", width: "80%" }}
            type={"text"}
            onChange={(e) => {
              localStorage.setItem("Deduction", e.target.value);
            }}
          ></input>
          {/* <RemoveCircleIcon style={{ color: "#1075c2" }}></RemoveCircleIcon>
          <AddCircleIcon style={{ color: "#1075c2" }}></AddCircleIcon> */}
        </div>
        <div
          style={{
            width: "100vw",
            borderBottom: "1px solid #e9e9e9",
            display: "flex",
            position: "absolute",
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
                setActiveTab("Contact Details");
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
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ padding: 10, height: "max-content", marginTop: -60 }}
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
                }}
              ></EditIcon>
            </Grid>
          </Grid>
          <p className={classes.label}>Request Service on date *</p>
          <p className={classes.labelBlack}>{requestData.requestDate} </p>
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
                }}
              ></EditIcon>
            </Grid>
          </Grid>
          <FormGroup row style={{ width: "100%" }}>
            {requestData.lookingFor.map((item) => {
              return (
                <FormControlLabel
                  checked={true}
                  control={
                    <Checkbox
                      icon={<CheckCircleIcon style={{ color: "#efefef" }} />}
                      checkedIcon={
                        <CheckCircleIcon style={{ color: "#1075c2" }} />
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
                }}
              ></EditIcon>
            </Grid>
          </Grid>
          <p className={classes.label}>Area *</p>
          <p className={classes.labelBlack}>{requestData.area} </p>
          <p className={classes.label}>Structure</p>
          <p className={classes.labelBlack}>{requestData.area}</p>

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
                }}
              ></EditIcon>
            </Grid>
          </Grid>
          <p className={classes.label}>problem Description *</p>
          <p className={classes.labelBlack}>
            {localStorage.getItem("description")}{" "}
          </p>
          <p className={classes.label}>Photos</p>
          {requestData.image.length > 1 &&
            requestData.image.map((img) => {
              return (
                <img src={URL.createObjectURL(img)} className={classes.image} />
              );
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
              <p className={classes.heading}>Inssurance</p>
            </Grid>
            <Grid item md={1} xs={1}>
              <EditIcon
                className={classes.icon}
                onClick={() => {
                  setActiveTab("Inssurance");
                }}
              ></EditIcon>
            </Grid>
          </Grid>
          <p className={classes.label}>Company *</p>
          <p className={classes.labelBlack}>{requestData.company} </p>
          <p className={classes.label}>Policy Number</p>
          <p className={classes.labelBlack}>{requestData.policyNumber} </p>
          <p className={classes.label}>Expiry Date</p>
          <p className={classes.labelBlack}>{requestData.expiryDate} </p>
          <p className={classes.label}>Deduction</p>
          <p className={classes.labelBlack}>{requestData.deduction} </p>
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
          <p className={classes.labelBlack}>{requestData.userPhone} </p>
          <p className={classes.label}>Allow U plumber to contact you</p>
          <p className={classes.labelBlack}>{requestData.allowContact} </p>
          <p className={classes.label}>Email * </p>
          <p className={classes.labelBlack}>{requestData.userEmail} </p>
          <p className={classes.label}>Address * </p>
          <p className={classes.labelBlack}>{requestData.userAddress} </p>
          <p className={classes.label}>Unit / APT * </p>
          <p className={classes.labelBlack}>{requestData.userUnit} </p>
          <p className={classes.label}>City * </p>
          <p className={classes.labelBlack}>{requestData.userCity} </p>
          <p className={classes.label}>State * </p>
          <p className={classes.labelBlack}>{requestData.userState} </p>
          <p className={classes.label}>Zipcode * </p>
          <p className={classes.labelBlack}>{requestData.userZipCode} </p>
        </div>
        <button
          className={classes.button}
          onClick={() => {
            // document.getElementById("requestAService/0").click();
          }}
        >
          Submit Requests
        </button>
      </Grid>
    );
  };

  return (
    <div style={{ background: "#f2f2f2", background: "white" }}>
      <Link id="homepage" to="/homepage"></Link>
      <Link id="sumittedRequest" to="/sumittedRequest"></Link>

      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
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
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (activeTab != "ReviewRequest") {
                  document.getElementById("homepage").click();
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
      >
        <div style={{ width: "100%" }}>
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
                "Inssurance",
                "Contact Details",
              ].map((value) => {
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
              setRequestData={(field, value) => {
                setRequestData({ ...requestData, [field]: value });
                console.log("THis is the request Data", requestData);
              }}
              image={requestData.image}
              description={requestData.description}
              setActiveTab={(tab) => {
                setActiveTab(tab);
              }}
            ></DescriptionAndPhoto>
          ) : activeTab === "Inssurance" ? (
            <Inssurance></Inssurance>
          ) : activeTab === "Contact Details" ? (
            <ContactDetails
              userName={requestData.userName}
              userPhone={requestData.userPhone}
              userAddress={requestData.userAddress}
              userCity={requestData.userCity}
              userEmail={requestData.userEmail}
              userZipCode={requestData.userZipCode}
              setRequestData={(field, value) => {
                console.log("This is field", field);
                setRequestData({ ...requestData, [field]: value });
                console.log("THis is the request Data", requestData);
              }}
              setActiveTab={(tab) => {
                setActiveTab(tab);
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
            <div style={{ width: "60vw" }}>
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
            style={{ height: "max-content", paddingLeft: 20, paddingRight: 20 }}
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
            <Rating style={{ fontSize: 40 }}></Rating>
            <p className={classes.label}>Write Something</p>
            <input
              className={classes.input}
              placeholder="Write Something"
              style={{ border: "none" }}
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
            style={{ height: "max-content", paddingLeft: 20, paddingRight: 20 }}
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
                    expiryDate: moment(e).format("MMMM Do YYYY"),
                  });
                  setCalendar(false);
                } else {
                  setRequestData({
                    ...requestData,
                    requestDate: moment(e).format("MMMM Do YYYY"),
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
            style={{ height: "max-content", paddingLeft: 20, paddingRight: 20 }}
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
                {[
                  "As soon as possible",
                  "Early Morning ( 6am to 8am)",
                  "Early Morning ( 8am to 12pm)",
                  "Afternoon ( 12pm to 3pm)",
                  "Late Afternoon ( 3pm to 5pm)",
                  "Evening ( 5pm to 7pm)",
                  "Late Evening ( 7pm to 9pm)",
                ].map((item) => {
                  return (
                    <FormControlLabel
                      value={item}
                      control={<Radio color="primary" />}
                      label={item}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
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
            style={{ height: "max-content", paddingLeft: 20, paddingRight: 20 }}
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
            <div style={{ height: 400, maxHeight: 400, overflow: "scroll" }}>
              <Grid container direction="row">
                {items.map((stuff) => {
                  return (
                    <Grid item md={4} xs={4}>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        style={{ marginBottom: 20 }}
                        onClick={() => {
                          setRequestData({
                            ...requestData,
                            itemName: stuff.name,
                          });
                          setItem(false);
                        }}
                      >
                        <img style={{ width: "70%" }} src={stuff.image}></img>
                        <p
                          style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {stuff.name}
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
          onClose={() => setPostRequest(false)}
        >
          <Grid container direction="row" justify="center">
            <CheckCircleIcon
              style={{ marginTop: 20, fontSize: 50, color: "#1075c2" }}
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
            style={{ height: 120 }}
          >
            <p
              style={{
                fontSize: 12,
                textAlign: "center",
                width: "90%",
              }}
            >
              Your service request has been submitted please wait for a request
              from plumber.
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
                document.getElementById("sumittedRequest").click();
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
                document.getElementById("homepage").click();
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
export default withRouter(ProviderDetail);
