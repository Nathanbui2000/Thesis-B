import { Box,Typography,TextField, Stack, Grow } from "@mui/material";
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
function AntiqueVerification() {
    
    //User Input Verification Data
    const [details, setDetails] = React.useState({
        EstimateManufactureYear: "",
        IoTDeviceID: "",
        AntiqueRareness: "",
        AntiqueAuthenticity: "",
        AntiqueReal: "",
    });

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
        console.log("Verification Data Button Cliced!")
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
                                autoComplete="OwnerName"
                                id="EstimateManufactureYear"
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
                                required
                                name="IoTDeviceID"
                                label="IoT Device ID"
                                autoComplete="OwnerName"
                                id="IoTDeviceID"
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
                                autoComplete="OwnerName"
                                id = "AntiqueRareness"
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
                                autoComplete="OwnerName"
                                id="AntiqueAuthenticity"
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
                                name="AntiqueReal"
                                label="AntiqueReal"
                                id="AntiqueReal"
                                onChange={(e) =>
                                setDetails({ ...details, AntiqueReal: e.target.value })
                                }
                                value={details.AntiqueReal}
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
                        >
                            Confirm Verification Data
                    </Button>
                </Box>

                {/*Antique Generate QR Code*/}
            {/* </div> */}

        {/* </div> */}

    </Stack>
    )
}
export default AntiqueVerification;

