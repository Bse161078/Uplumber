import {Grid, makeStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer/Drawer";
import React from "react";
import Button from '@mui/material/Button';


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
        background: "#1075c2",
        paddingLeft:30,
        paddingRight:30,
        paddingTop:10,
        paddingBottom:10
    },
}));

export default function Alert(props){
    const classes = useStyles();

    return(
        <Drawer
            anchor={"bottom"}
            open={props.show}
            onClose={()=>{}}

            style={{zIndex:10000002}}
        >
            <Grid container direction="column" alignItems="center" style={{marginBottom:40}}>
                <Grid item>
                    <img
                        src={props.headerImage}
                        style={{
                            marginBottom: 0,
                            width: 150,
                            height: 150,
                            textAlign: 'center'
                        }}
                    ></img>
                </Grid>
                <Grid item>
                    <p style={{marginLeft:'20',marginRight:'20',fontStyle:'bold'}}>
                        {props.title}
                    </p>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={10}>
                        <Grid item>
                            <Button variant="contained" style={{backgroundColor:''}}
                            onClick={(e)=>props.onCancel()}
                            >Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained"
                                    onClick={(e)=>props.onSuccess()}
                            >Request Now</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </Drawer>
    )
}