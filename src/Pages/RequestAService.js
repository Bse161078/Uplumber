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
import Rating from "@material-ui/lab/Rating";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Calendar from "react-calendar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

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
}));
function ProviderDetail(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [calendar, setCalendar] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const [activeTab, setActiveTab] = React.useState("Problem");
  const [image, setImage] = React.useState([]);

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
  console.log("THis is great", props);

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
        <p className={classes.label}>Preffered Service Time *</p>
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
          renderInput={(params) => <TextField {...params} />}
        />
        <p className={classes.label}>What item is having problem *</p>
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
        />
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
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="Auto accept 1st offer"
              />
              <FormControlLabel
                value="male"
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
    console.log("This is iamge", im);
  };
  const DescriptionAndPhoto = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ padding: 20, height: "max-content" }}
      >
        <p style={{ textAlign: "justify" }}>
          Briefly describe your problem, please do not input any sensitive
          information here.
        </p>
        <textarea
          className={classes.input}
          style={{
            resize: "none",
            border: "1px solid #efefef",
            borderRadius: 20,
            height: 100,
            padding: 10,
          }}
        ></textarea>
        <p className={classes.label}>Add Photos</p>
        <div style={{ width: "100%", marginTop: 20 }}>
          <input
            // required
            type="file"
            name="image"
            id="images"
            multiple
            className="form-control"
            // value={post.image.name}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Grid container direction="row" alignItems="center">
            {image.length > 1 &&
              image.map((img) => {
                return (
                  <Badge
                    badgeContent={
                      <CancelIcon
                        style={{ color: "red", marginLeft: -40 }}
                        onClick={() => {
                          var temp = [];
                          image.map((im) => {
                            console.log("This is imaeg", img.name, im.name);
                            if (im.name != img.name) {
                              temp.push(img);
                            }
                          });
                          console.log("THis is ", temp);
                          setImage(temp);
                        }}
                      ></CancelIcon>
                    }
                    color=""
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                        marginRight: 15,
                      }}
                    />
                  </Badge>
                );
              })}
            <Grid
              style={{
                width: 100,
                height: 100,
                background: "#efefef",
                borderRadius: 5,
              }}
              container
              direction="row"
              justify="center"
              alignItems="center"
              onClick={() => {
                document.getElementById("images").click();
              }}
            >
              <CameraAltIcon></CameraAltIcon>
            </Grid>
          </Grid>
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
                  setActiveTab("Property");
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
                  setActiveTab("Inssurance");
                }}
              >
                Next
              </button>
            </Grid>
          </div>
        </div>
      </Grid>
    );
  };

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
          renderInput={(params) => <TextField {...params} />}
        />

        <p className={classes.label}>Policy Number *</p>
        <input className={classes.input} type={"text"}></input>

        <div
          className={classes.input}
          style={{ height: 50, paddingBottom: 35, marginBottom: 10 }}
        >
          <p className={classes.label}>Request Service on date *</p>
          <input
            className={classes.input}
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

        <div
          className={classes.input}
          style={{ height: 50, paddingBottom: 35, marginBottom: 10 }}
        >
          <p className={classes.label}>Deduction </p>
          <input
            className={classes.input}
            style={{ border: "none", width: "80%" }}
            type={"text"}
          ></input>
          <RemoveCircleIcon style={{ color: "#1075c2" }}></RemoveCircleIcon>
          <AddCircleIcon style={{ color: "#1075c2" }}></AddCircleIcon>
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
  const ContactDetails = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ padding: 20, height: "max-content" }}
      >
        <p className={classes.label}>Name *</p>
        <input className={classes.input} type={"text"}></input>

        <p className={classes.label}>Phone number *</p>
        <input className={classes.input} type={"text"}></input>
        <p style={{ textAlign: "justify" }}>
          Do you allow U-Plumber to contact you via mobile phone number (text)?
          Please note this will help you get response from a plumber faster but
          it may cost you an extra charge (from your phone provider)
        </p>
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
              }}
            >
              No
            </button>
          </Grid>
        </div>
        <p style={{ textAlign: "justify" }}>
          Enter you email this will allow U Plumber or provider to contact you
          via this email.
        </p>
        <p className={classes.label}>Email *</p>
        <input className={classes.input} type={"text"}></input>
        <p className={classes.label}>Address *</p>
        <input className={classes.input} type={"text"}></input>
        <p className={classes.label}>Unit/APT *</p>
        <input className={classes.input} type={"text"}></input>
        <p className={classes.label}>City *</p>
        <input className={classes.input} type={"text"}></input>
        <p className={classes.label}>State *</p>
        <input className={classes.input} type={"text"}></input>
        <p className={classes.label}>Zipcode *</p>
        <input className={classes.input} type={"text"}></input>

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
                setActiveTab("Inssurance");
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
            >
              Next
            </button>
          </Grid>
        </div>
      </Grid>
    );
  };

  return (
    <div style={{ background: "#f2f2f2", background: "white" }}>
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={"Request a Service"}
          leftIcon={
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                document.getElementById("homepage").click();
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
            {[
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
            <DescriptionAndPhoto></DescriptionAndPhoto>
          ) : activeTab === "Inssurance" ? (
            <Inssurance></Inssurance>
          ) : (
            <ContactDetails></ContactDetails>
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
            <Calendar></Calendar>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
export default withRouter(ProviderDetail);
