import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';


export default function ItemDetails(props){
    const [open, setOpen] = React.useState(true);


    const handleClose=()=>{
        setOpen(false);
        props.setItemDetailsToDefault();
    }

    console.log('open dialog = ',props.itemDetails.item)
    const item=props.itemDetails.item;
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"style={{color:'black',fontWeight:'bold'}}>
                {"Contact Details"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description"style={{color:'black'}}>
            <Typography variant='body2'> Name: {item.contactDetails.name} </Typography>      
               
                </DialogContentText>
                <DialogContentText id="alert-dialog-description" style={{color:'black',marginTop:'10px'}} >
                <Typography variant='body2'> Phone:  {item.contactDetails.phone} </Typography>      
               
               
                </DialogContentText>
                <DialogContentText id="alert-dialog-description"style={{color:'black',marginTop:'10px'}}>
                <Typography variant='body2'> Address:    {item.contactDetails.address}</Typography>      
    
                </DialogContentText>
                <DialogContentText id="alert-dialog-description"style={{color:'black',marginTop:'10px'}}>
                <Typography variant='body2'> City:     {item.contactDetails.city}</Typography>      
                  
               
                </DialogContentText>
                <DialogContentText id="alert-dialog-description"style={{color:'black',marginTop:'10px'}}>
                <Typography variant='body2'> Email:       {item.contactDetails.email}</Typography>      
              
               
                </DialogContentText>
            </DialogContent>
            <DialogTitle id="alert-dialog-title"style={{color:'black',fontWeight:'bold'}}>
                {"Problem Details"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description"style={{color:'black'}}>
            <Typography variant='body2'> Problem Type: {item.problem.problemItem} </Typography>      
               
                </DialogContentText>
                <DialogContentText id="alert-dialog-description" style={{color:'black',marginTop:'10px'}} >
                <Typography variant='body2'> Service Date:  {item.problem.serviceDate} </Typography>      
               
               
                </DialogContentText>
                <DialogContentText id="alert-dialog-description"style={{color:'black',marginTop:'10px'}}>
                <Typography variant='body2'> Service Name:    {item.problem.serviceName}</Typography>      
    
                </DialogContentText>
                <DialogContentText id="alert-dialog-description"style={{color:'black',marginTop:'10px'}}>
                <Typography variant='body2'> Service Time:     {item.problem.serviceTime}</Typography>      
                  
               
                </DialogContentText>
              
            </DialogContent>

            <DialogTitle id="alert-dialog-title"style={{color:'black',fontWeight:'bold'}}>
                {"Property Details"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description"style={{color:'black'}}>
            <Typography variant='body2'> Area: {item.property.area} </Typography>      
               
                </DialogContentText>
                <DialogContentText id="alert-dialog-description" style={{color:'black',marginTop:'10px'}} >
                <Typography variant='body2'> Requester Status:  {item.property.requesterStatus} </Typography>      
               
               
                </DialogContentText>
                <DialogContentText id="alert-dialog-description"style={{color:'black',marginTop:'10px'}}>
                <Typography variant='body2'> Structure:    {item.property.structure}</Typography>      
    
                </DialogContentText>
              
              
            </DialogContent>
            <DialogTitle id="alert-dialog-title"style={{color:'black',fontWeight:'bold'}}>
                {"Description and Photo"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description"style={{color:'black'}}>
            <Typography variant='body2'> Description: {item.descriptionAndPhoto.description} </Typography>      
               
                </DialogContentText>
                <Grid direction='row' > 
                <DialogContentText id="alert-dialog-description" style={{color:'black',marginTop:'10px',width:'30%',height:'30%'}} >
                  {item.descriptionAndPhoto.photos!=null?
                   
                  ( <p>Photos :
                       <img
                            src={item.descriptionAndPhoto.photos[0] }
                           style={{width:70,height:70}}
                        ></img>
                        </p>)
                        :
                      ( <p> Videos :
                        <video src={item.descriptionAndPhoto.videos}
                        style={{width:70,height:70}}
                        />
                        </p> )}        
                </DialogContentText>
                </Grid>
                </DialogContent>



            <DialogActions>
               
                <Button onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}