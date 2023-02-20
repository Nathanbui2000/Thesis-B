import { Box,Typography,TextField, Stack, Grow, DialogTitle, DialogActions,Dialog,DialogContent } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import {
    Alert,
    Avatar,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    Button,  
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { alignProperty } from "@mui/material/styles/cssUtils";
import axios from "axios";
import { useUserContext } from "../../../store/user-context";
import cookie from "js-cookie";
import {IUser} from "../../../type/Java/user";

interface OwnerDetailProps {
    completedStepList : any
    setCompletedStepList : any
    activeStep: any
    handleOwnerDetail: any
    handleStep1Change: any
    step1UserData: any

}
function OwnerDetail(props: OwnerDetailProps) {
    const userCtx = useUserContext();
    const [userData, setUserData] = useState<IUser | null>(null);

    const [details, setDetails] = React.useState({
        emailAddress: "",
        firstName: "",
        lastName: "",
    });

    //NOTE - Informative Dialog Data
    const [isInformativeDialogOpen, setIsInformativeDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");
    const handleInformativeDialogOpen= () => {
        setIsInformativeDialogOpen(true);
    };
    const [userVerified,setUserVerified] = useState(false);

    const step1UserData= props.step1UserData;
    const handleStep1Change = props.handleStep1Change;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //NOTE -  Retrieve Data 
        const data = new FormData(event.currentTarget);
        const emailAddress = data.get("emailAddress") as string;
        const firstName = data.get("firstName") as string;
        const lastName = data.get("lastName") as string;
        setDetails({ emailAddress, firstName, lastName });
        retrieveUserData(emailAddress, firstName,lastName);

        //Todo: Call Backend Java - Validate Email and Firstname and LastName

    };

    const retrieveUserData = (emailAddress: string,firstName: string, lastName:string ) => 
    {
        const authorizationValue = "Bearer " + userCtx.accessToken;
        const params = new URLSearchParams();
        params.append("username", emailAddress);

        const options = {
            method: "GET",
            headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: authorizationValue,
            },
            params,
            url: "http://localhost:8080/api/v1/user/get-user-by-username",
        };

        axios(options)
            .then((resp) => {
                console.log(resp);
                setUserData(resp.data);
                props.handleOwnerDetail(userData);
                //Open Dialog and Disable Textfield
                setDialogTitle("User Confirmed");
                setDialogContent
                (
                    "Username: "  + emailAddress + "Has been confirmed in our system. Please Process to next step" + "\n"  
                    + "You will not be able to change the data" 

                );
                setUserVerified(true);
                setIsInformativeDialogOpen(true);
                StepComplete();
            })
            .catch((err) => {
                console.error(err);
                //Open Errors Dialog
                setDialogTitle("User Not Found !");
                setDialogContent
                (
                    "Username: "  + emailAddress + " Not Found In Our System, Please Try Again "
                );
                setIsInformativeDialogOpen(true);
                setUserVerified(false);

            });
    } 
  
    function handleCloseDialog(): void {
        setIsInformativeDialogOpen(false);
    }

    const StepComplete = () => 
    {
        //Update Form
        const updatedSteps = [...props.completedStepList];
        updatedSteps[props.activeStep] = { completed: true };
        props.setCompletedStepList(updatedSteps);
        console.log("Props Value After Update");
        console.log(props.completedStepList[props.activeStep].completed);
    }

    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
        <div style={{ display: "center" }}>
            <Typography
            variant="h2"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
            Owner Details
            </Typography>
        </div>
        <div style={{ display: "center" }}>
            <Typography
            variant="h3"
            component="div"
            paddingTop = "2"
            sx={{ justifySelf: "flex-start" }}
            >
            Step 1: Please Verify Owner Details Information
            </Typography>
        </div>
        <div style=
        {{ 
            width: '1000px', 
            margin: '0 auto',
            border: '1px solid',
            padding: '10px',
        }}>
            <Box
            component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth

                    label="Email Address"
                    name="emailAddress"
                    autoComplete="email"
                    autoFocus
                    disabled={props.completedStepList[props.activeStep].completed}
                    value = {step1UserData.emailAddress }
                    onChange = {props.handleStep1Change}
                   
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    autoComplete="Owner Name"
                    value = {step1UserData.firstName}
                    disabled={props.completedStepList[props.activeStep].completed}
                    onChange = {props.handleStep1Change}
                />  
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    autoComplete="Owner Name"
                    value = {step1UserData.lastName}
                    disabled={props.completedStepList[props.activeStep].completed}
                    onChange = {props.handleStep1Change}

                />  
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={props.completedStepList[props.activeStep].completed}
                    sx={{ mt: 3, mb: 2, width: '150px' }}
                >
                    Verify User
                </Button>
            </Box>
        </div>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        </Box> */}
        <Dialog open={isInformativeDialogOpen} onClose={() => setIsInformativeDialogOpen(false)}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseDialog()
                
                }>OK</Button>
            </DialogActions>
        </Dialog>
        </Stack>
        
    )
}
export default OwnerDetail;

