import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Avatar from "../assets/profile.png";
import Rating from "@material-ui/lab/Rating";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, withRouter } from "react-router-dom";
import { CustomerNotifications } from "../ApiHelper";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    borderBottom: "1px solid #e9e9e9",
    width: "100%",
    height: 40,
    fontSize: 12,
    // [theme.breakpoints.down("sm")]: {
    //   height: "100%",
    // },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function ProviderDetail(props) {
  const classes = useStyles();
  const [allNotifications, setAllNotifications] = useState("");
  const [state, setState] = React.useState(false);
  const [bottomState, setBottomState] = React.useState(false);
  const [needModifications, setNeedModifications] = React.useState(false);
  const [modification, setModification] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Contacts");
  const [openLoader, setOpenLoader] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setState(open);
  };
  const toggleDrawerBottom = (anchor, open) => (event) => {
    setBottomState(open);
  };
  const position = [51.505, -0.09];
  //console.log("THis is great", props);

  const getAllNotifications = () => {
    setOpenLoader(true);
    CustomerNotifications().then(
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
          console.log("This is res notification", res.data);
          setAllNotifications(res.data.Customers);
        }
      },
      (error) => {
        notify(error.response.data.message);
        setOpenLoader(false);
        console.log("This is response", error.response);
      }
    );
  };

  useEffect(() => {
    getAllNotifications();
  }, []);
  const notify = (data) => toast(data);
  return (
    <div style={{ background: "#f2f2f2", background: "white" }}>
      <Link id={"route"} to={"/show-route"}></Link>
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
      <Link id="homepage" to="/homepage"></Link>
      <Link id="reviews" to="/reviews/0"></Link>
      <div style={{ borderBottom: "1px solid #e9e9e9", height: 60 }}>
        <Header
          onSidebarDisplay={() => {
            setState(true);
          }}
          heading={"Notifications"}
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
        alignItems="flex-start"
        style={{
          marginTop: 0,
          maxHeight: "calc( 100vh - 60px )",
          // minHeight: "calc( 100vh - 100px )",
          overflowY: "scroll",
        }}
      >
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
        <div>
          {allNotifications &&
            allNotifications.map((item) => {
              return (
                <Grid
                  container
                  direction="row"
                  style={{
                    paddingInlineEnd: 10,
                    paddingInlineStart: 10,
                    paddingTop: 10,
                    borderBottom: "1px solid #f1f1f1",
                    height: "max-content",
                    background: item === 2 ? "#e2f2ff" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    document.getElementById("route").click();
                  }}
                >
                  <Grid item md={2} xs={2}>
                    <img
                      src={item.image}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    ></img>
                  </Grid>
                  <Grid item md={9} xs={9}>
                    <Grid container direction="row" style={{ marginLeft: 5 }}>
                      <p
                        style={{
                          width: "100%",
                          margin: 0,
                          fontWeight: 600,
                          fontSize: 14,
                          textAlign: "justify",
                        }}
                      >
                        {item.notificationText}
                      </p>
                      <span style={{ fontSize: 10, color: "gray" }}>
                        3 minutes ago
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
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
          open={needModifications}
          onClose={() => {
            setNeedModifications(false);
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
              Need Modification
            </p>
            <p className={classes.label}>Write Description</p>
            <input
              className={classes.input}
              placeholder="Write Something"
              style={{ border: "none" }}
            ></input>
            <button
              className={classes.button}
              onClick={() => {
                setNeedModifications(false);
                setModification(true);
              }}
            >
              Submit
            </button>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}
export default withRouter(ProviderDetail);
