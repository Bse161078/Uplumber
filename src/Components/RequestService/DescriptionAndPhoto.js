import React, {useState} from "react";
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
import {uploadFile} from "../../ApiHelper";
import CancelIcon from "@material-ui/icons/Cancel";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

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
}));
const DescriptionAndPhoto = (props) => {
    const classes = useStyles();
    const onChangeFile = async (event) => {
        console.log('selected file = ', event.target.files[0]);
        try {
            var data = new FormData();
            data.append('image', event.target.files[0]);

            console.log('uploading file  ')
            const response = await uploadFile(data);

            console.log('file uploaded = ', response)
        } catch (e) {
            console.log('file uploaded error = ', e)
        }
    }


    console.log('props.image = ', props.image)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            style={{padding: 20, height: "max-content"}}
        >
            <p style={{textAlign: "justify"}}>
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
                value={props.description}
                onChange={(e) => {
                    localStorage.setItem("description", e.target.value);
                    props.setRequestData("description", e.target.value);
                }}
            ></textarea>
            <p className={classes.label}>Add Photos</p>
            <div style={{width: "100%", marginTop: 20}}>
                <input
                    // required
                    type="file"
                    name="image"
                    id="images"
                    multiple
                    className="form-control"
                    // value={post.image.name}
                    style={{display: "none"}}
                    onChange={(e) => {


                        onChangeFile(e);
                        const files = e.target.files[0];


                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(files);
                        fileReader.addEventListener("load", function () {
                            console.log('result =  ', this.result);


                            const fileType = files.type;
                            console.log('files = ', files, '   ', fileType)
                            if (fileType.includes("image")) {
                                // invalid file type code goes here.
                            if(props.image){
                                let image=props.image
                                image.push({type: 'image', data: this.result})
                                props.setRequestData('image', image)
                            
                            }else {
                                let image=[]
                                image.push({type: 'image', data: this.result})
                                props.setRequestData('image', image)
                            }
                            } else if (fileType.includes("video")) {
                                // invalid file type code goes here.
                                if(props.image){
                                    let image=props.image
                                    image.push({type: 'video', data: URL.createObjectURL(files)})
                                    props.setRequestData('image', image)
                                
                                }else {
                                    let image=[]
                                    image.push({type: 'video', data: URL.createObjectURL(files)})
                                    props.setRequestData('image', image)
                                }

                            }
                        });
                        e.target.value = ''

                    }}
                />

              
                <Grid container direction="row" alignItems="center">
                {
                    props.image && props.image.map((img,index)=>{
                     let imageDiv=null;
                     
                     if(img.type==='image'){
                         imageDiv=<img src={img.data} style={{padding:20}} className={classes.image}/>
                     }else if(img.type==='video'){
                        imageDiv=<video width={130} height={100} style={{padding:20}} controls>
                        <source src={img.data} id="video_here"/>
                        Your browser does not support HTML5 video.
                    </video>
                     }
                     
                     if(imageDiv){
                         return(
                            <Badge
                            badgeContent={
                                <CancelIcon
                                    onClick={(e) => {
                                        let images=props.image;
                                        images.splice(index,1);
                                        props.setRequestData('image', images)
    
                                    }
                                    }
                                    style={{color: "red", marginLeft: -40}}
                                ></CancelIcon>
                            }
                            color=""
                        >{
                            imageDiv
                        }
                        </Badge>         
                         )
                     }else{
                         return null;
                     }


                    })
                }
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
                                props.setActiveTab("Property");
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
                                props.setActiveTab("Insurance");
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

export default DescriptionAndPhoto;
