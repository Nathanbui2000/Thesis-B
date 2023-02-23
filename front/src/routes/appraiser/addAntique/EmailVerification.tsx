import { Box,Typography,TextField, Stack, Grow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import {
    Alert,
    Avatar,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    Button,  
    InputAdornment,
    
} from "@mui/material";
import cookie from "js-cookie";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, FormEvent, useState } from "react";
import { setCookie } from "../../../store/user-context";
import StepInterface from "./StepInterface";
import axios from "axios";
function EmailVerification(props: StepInterface) {

    const [searchValue, setSearchValue] = useState("");
    const [verificationCodeInput,setVerificationCodeInput] = useState("");
    //NOTE - Informative Dialog Data
    const [isInformativeDialogOpen, setIsInformativeDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");
    const handleInformativeDialogOpen= () => {
        setIsInformativeDialogOpen(true);
    };
    function handleCloseDialog(): void {
        setIsInformativeDialogOpen(false);
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log("EmailVerification Button CLicked!");
        //Verify Verification Code
        const params = new URLSearchParams();
        params.append('username',cookie.get("userName") || "");
        params.append('verificationCode',verificationCodeInput);

        const getAppointmentOption= {
        method: "GET",
        params,
        url: "http://localhost:8080/api/v1/user/check-antique-verification-code",
        };
        axios(getAppointmentOption)
        .then((response) => {
            if (response.status === 200) {
                console.log("Successfully Verified Your Email. Please Process");
                const updatedSteps = [...props.completedStepList];
                updatedSteps[props.activeStep] = { completed: true };
                props.setCompletedStepList(updatedSteps);

                //Todo: Open Successfully Remove Appointment dialog
                setDialogTitle("Verification Successfully !");
                setDialogContent
                (
                    "Thank you for verifying your email. Please Process"
                );
                return setIsInformativeDialogOpen(true);
                
            }
        })
        .catch((error) => {
            console.log(error);
            setDialogTitle("Something Went Wrong !");
            setDialogContent (error.response.data)
            return setIsInformativeDialogOpen(true);
        });

    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setVerificationCodeInput(event.target.value);
    }

   const sendVerificationCode = () => {
        console.log("Send Verification Code Button Clicked!");
        const params = new URLSearchParams();
        params.append('username',cookie.get("userName") || "");

        const getAppointmentOption= {
        method: "POST",
        params,
        url: "http://localhost:8080/api/v1/user/antique-user-verification-requested",
        };
        axios(getAppointmentOption)
        .then((response) => {
            if (response.status === 200) {
                console.log("Successfully Sent Verification Code");
                //Todo: Open Successfully Remove Appointment dialog
                setDialogTitle("Verification Code Sent!");
                setDialogContent
                (
                    "Verification Code has been successfully sent to your email"
                );
                return setIsInformativeDialogOpen(true);
                
            }
        })
        .catch((error) => {
            console.log(error);
            setDialogTitle("Something Went Wrong !");
            setDialogContent ("Something went wrong, please try it again")
            return setIsInformativeDialogOpen(true);
        });

    }

    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
            <div style={{ display: "center" }}>
                <Typography
                variant="h2"
                component="div"
                sx={{ justifySelf: "flex-start" }}
                >
                Verify Appraiser
                </Typography>
            </div>
            <div style={{ display: "center" }}>
                <Typography
                variant="h3"
                component="div"
                sx={{ justifySelf: "flex-start" }}
                >
                Step 5: Please Verify Your Account
                </Typography>
            </div>
            <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                    >
                <div>
                    {/*Antique Verification Detail Input*/}
                    <div style={{ 
                            textAlign: 'center',
                            fontWeight: "bold"
                        }}>
                            <Typography
                            variant="h4"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Verify Your Email Account
                            </Typography>

            <div>
                <TextField

                    label="Enter Verification Code"
                    type="number"
                    variant="outlined"
                    style={{ width: "50%" }}
                    value={verificationCodeInput}
                    disabled={props.completedStepList[props.activeStep].completed}

                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={sendVerificationCode}                              
                                disabled={props.completedStepList[props.activeStep].completed}

                                
                                >
                                    Send Verification Code
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
                    </div>
                </div>
                {/*Upload Button*/}
                    <Button
                            variant="contained"
                            type="submit"
                            startIcon={<MarkEmailReadIcon />}
                            sx={{ mt: 1, mb: 2 }}
                            disabled={props.completedStepList[props.activeStep].completed}

                            // onClick={handleUploadResource}
                            size="small"
                        >
                            Confirm
                    </Button>
            </Box>
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
export default EmailVerification;


