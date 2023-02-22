import { Box,Typography,TextField, Stack, Grow, DialogActions, Dialog, DialogContent, DialogTitle } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import UploadIcon from '@mui/icons-material/Upload';
import * as React from "react";

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
import { FormEvent } from "react";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import StepInterface from "./StepInterface";

function AntiqueVerification(props:StepInterface) {
    
    // //User Input Verification Data
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
    const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === '.' || event.key === '-') {
        event.preventDefault();
        }
    };

    //Choice Box Data 
    const [antiqueRealness, setAntiqueRealness ] = React.useState([
        { id: 0, value: "Real" },
        { id: 1, value: "Not Real" },
        { id: 2, value: "Unable To Defind" },
    ]);
    
    //Generate QR Code Detail
    const canvasRef = useRef();


    // const handleUploadResource =  () => {

    // }
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //Todo: Validate Input Data
        if (!props.step4VerificationInputData?.EstimateManufactureYear ||
            props.step4VerificationInputData.IoTDeviceID <= 0 ||
            !props.step4VerificationInputData?.AntiqueRareness ||
            !props.step4VerificationInputData?.AntiqueAuthenticity ||
            !props.step4VerificationInputData?.AntiqueRealness ||
            props.step4VerificationInputData.EstimateManufactureYear.length <= 0 ||
            props.step4VerificationInputData.AntiqueRareness.length <= 0 ||
            props.step4VerificationInputData.AntiqueAuthenticity.length <= 0 ||
            props.step4VerificationInputData.AntiqueRealness.length <= 0)
            {
                setDialogTitle("Please Completed Missing Information Above !");
                setDialogContent ("Please provide All Necessary Information for Antique Verification ");
                return setIsInformativeDialogOpen(true);
            }
        //Todo: Show Completed
        const updatedSteps = [...props.completedStepList];
        updatedSteps[props.activeStep] = { completed: true };
        props.setCompletedStepList(updatedSteps);
        setDialogTitle("Successfully Completed Verification !");
        setDialogContent ("Antique Verification detail has been saved. Please process to the next step")
        return setIsInformativeDialogOpen(true);

        // Check Validate Data
        //Call Axios Bachend 
    }

    // useEffect(() => {
    //     QRCode.toCanvas(
    //     canvasRef.current,
    //     // QR code doesn't work with an empty string
    //     // so we are using a blank space as a fallback
    //     details || " ",
    //     (error: any) => error && console.error(error)
    //     );
    // }, [details]);
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
            <div style={{ display: "center" }}>
                <Typography
                variant="h2"
                component="div"
                sx={{ justifySelf: "flex-start" }}
                >
                Antique Verification
                </Typography>
            </div>
            <div style={{ display: "center" }}>
                <Typography
                variant="h3"
                component="div"
                sx={{ justifySelf: "flex-start" }}
                >
                Step 4: Verifying Antique Object
                </Typography>
            </div>
            
        {/* Vertical Box: Verification And Button
        <div> */}
            {/*Horizontal Box: QR Code and Antique Form*/}
            {/* <div style={{display: 'flex', justifyContent: 'space-between'}}> */}
                {/*Antique Verification Detail Form*/}

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
                            // paddingLeft: "50px",
                            fontWeight: "bold"
                        }}>
                            <Typography
                            variant="h4"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Estimate Manufacture Years
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="EstimateManufactureYear"
                                label="Estimate Manufacturer Year"
                                value ={props.step4VerificationInputData.EstimateManufactureYear}
                                onChange = {props.handleStep4Change}
                                disabled={props.completedStepList[props.activeStep].completed}

                            /> 
                            <Typography
                            variant="h4"
                            paddingTop = "10px"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                IoT Device ID
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                type ="number"
                                required
                                onKeyPress={handleKeyPress}
                                disabled={props.completedStepList[props.activeStep].completed}
                                name="IoTDeviceID"
                                label="IoT Device ID"
                                value = {props.step4VerificationInputData.IoTDeviceID}
                                inputProps={{
                                    type: 'number',
                                    step: 1,
                                    inputMode: 'numeric',
                                    pattern: "[0-9]",
                                    min: 1,
                                }}
                                onChange = {props.handleStep4Change}
                                

                            /> 
                            <Typography
                            variant="h4"
                            paddingTop = "10px"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Rareness
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="AntiqueRareness"
                                label="Antique Rareness"
                                value = {props.step4VerificationInputData.AntiqueRareness}
                                onChange = {props.handleStep4Change}
                                disabled={props.completedStepList[props.activeStep].completed}


                            /> 
                            <Typography
                            variant="h4"
                            paddingTop = "10px"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Authenticity
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="AntiqueAuthenticity"
                                label="Authenticity of the Antique Object"
                                value = {props.step4VerificationInputData.AntiqueAuthenticity}
                                onChange = {props.handleStep4Change}
                                disabled={props.completedStepList[props.activeStep].completed}

                            /> 
                            <Typography
                            variant="h4"
                            paddingTop = "10px"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Antique's Realness
                            </Typography>
                            <TextField
                                select
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="AntiqueRealness"
                                onChange={props.handleStep4Change}
                                value={props.step4VerificationInputData.AntiqueRealness}
                                disabled={props.completedStepList[props.activeStep].completed}

                            >
                            {antiqueRealness.map((antiqueRealness) => (
                                <MenuItem key={antiqueRealness.id} value={antiqueRealness.value}>
                                    {antiqueRealness.value}
                                </MenuItem>
                                ))} 
                            </TextField> 

                        </div>
                    </div>
                    {/*Upload Button*/}
                    <Button
                            variant="contained"
                            type="submit"
                            startIcon={<UploadIcon />}
                            sx={{ mt: 1, mb: 2 
                            }}
                            // onClick={handleUploadResource}
                            size="small"
                            disabled={props.completedStepList[props.activeStep].completed}

                        >
                            Confirm Verification Data
                    </Button>
                </Box>

                {/*Antique Generate QR Code*/}
            {/* </div> */}

        {/* </div> */}
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
export default AntiqueVerification;

