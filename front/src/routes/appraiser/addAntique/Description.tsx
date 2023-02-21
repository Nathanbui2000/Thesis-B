import { Box,Typography,TextField, Stack, Grow } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import { FileUploader } from "react-drag-drop-files";
import React, { FormEvent, useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

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
import { Description } from "../../../type/Truffle/Description";
import StepInterface from "./StepInterface";
const fileTypes = ["PDF"];

// interface DescriptionProps {
//     step2DescriptionInputData: any,
// }
function AntiqueDescription (props:StepInterface) {
    //NOTE - Managing The Page Content
    const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === '.' || event.key === '-') {
        event.preventDefault();
        }
    };




    //NOTE - Content Page Data
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    // Upload Documentation
    //Documentation Information
    const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer | null>(
        null
    ); 
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    // Function Set Up Preview PDF File
    const handleChange = (file: Blob | Uint8Array | ArrayBuffer) => {
        props.handleStep2InputDataChange()
        props.setAntiqueDescriptionFile(file);
        setFile(file);
    };
    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
    setPageNumber((prevPageNumber) => {
        if (numPages) {
        if (prevPageNumber + 1 >= numPages) {
            return numPages;
        } else {
            return prevPageNumber + 1;
        }
        }
        return 1; // return 1 if numPages is null
    });

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log("Submit event");
        //Todo: Update Antique Description Input from AddAntique File
        const data = new FormData(event.currentTarget);
        const antiqueMaterial = data.get("AntiqueMaterialName") as string;
        const antiqueHeight = data.get("AntiqueHeight") as string;
        const antiqueLength = data.get("AntiqueLength") as string;
        const antiqueWidth = data.get("AntiqueWidth") as string;
        const fileUpdate = data.get("antiqueFile") as string;

        //Update Step Completed
        const updatedSteps = [...props.completedStepList];
        updatedSteps[props.activeStep] = { completed: true };
        props.setCompletedStepList(updatedSteps);

        //Todo: Store AntiqueDescription Object into AddAntique File

    }

    useEffect(() => {
        if (props.antiqueDescriptionFile)
            setFile(props.antiqueDescriptionFile);
    }, []);
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
        {/** Step 2:Description Label*/}
            <Box
                component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}
                >
                <div style={{ display: "center" }}>
                    <Typography
                    variant="h2"
                    component="div"
                    sx={{ justifySelf: "flex-start" }}
                    >
                        Antique Description Data
                    </Typography>
                </div>
                <div style={{ display: "center" }}>
                    <Typography
                    variant="h3"
                    component="div"
                    sx={{ justifySelf: "flex-start" }}
                    >
                    Step 2: Add Antique Description Details
                    </Typography>
                </div>
                {/*Antique Form and Upload (Horizontal)*/}
                <div>
                    <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: '50px'
                        }}>
                        {/*Antique Description Detail Form*/}
                        <div style={{ 
                            textAlign: 'left',
                            paddingLeft: "50px",
                            fontWeight: "bold"
                        }}>
                            <Typography
                            variant="h4"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Antique Material Created
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="AntiqueMaterialName"
                                label="Materials Details "
                                autoComplete="OwnerName"
                                disabled={props.completedStepList[props.activeStep].completed}
                                value ={props.step2DescriptionInputData.AntiqueMaterialName}
                                onChange={props.handleStep2InputDataChange}
                            /> 
                            <Typography
                            variant="h4"
                            paddingTop = "10px"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Antique Height (Centimeter)  
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="AntiqueHeight"
                                label="Whole Number Height in cm"
                                onKeyPress={handleKeyPress}
                                disabled={props.completedStepList[props.activeStep].completed}
                                value ={props.step2DescriptionInputData.AntiqueHeight}
                                onChange = {props.handleStep2InputDataChange}
                                inputProps={{
                                    type: 'number',
                                    step: 1,
                                    inputMode: 'numeric',
                                    pattern: "[0-9]",
                                    min: 1,
                                }}
                            /> 
                            <Typography
                            variant="h4"
                            paddingTop = "10px"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Antique Length (Centimeter)
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="AntiqueLength"
                                disabled={props.completedStepList[props.activeStep].completed}
                                label="Whole Number Length in cm "
                                onKeyPress={handleKeyPress}
                                onChange= {props.handleStep2InputDataChange}
                                value={props.step2DescriptionInputData.AntiqueLength}
                                inputProps={{
                                    type: 'number',
                                    step: 1,
                                    pattern: "\\d+",
                                    min: 0,
                                }}

                            /> 
                            <Typography
                            variant="h4"
                            paddingTop = "10px"
                            component="div"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Antique Width (Centimeter)
                            </Typography>
                            <TextField
                                style={{width: '400px'}}
                                margin="normal"
                                required
                                name="AntiqueWidth"
                                disabled={props.completedStepList[props.activeStep].completed}
                                label="Whole Number Width in cm"
                                onKeyPress={handleKeyPress}
                                onChange ={props.handleStep2InputDataChange}
                                value = {props.step2DescriptionInputData.AntiqueWidth}
                                inputProps={{
                                    type: 'number',
                                    step: 1,
                                    pattern: "\\d+",
                                    min: 0,
                                }}

                            /> 

                        </div>
                        {/*Upload PNG Image*/}
                        <div>
                            <Typography
                            variant="h3"
                            component="div"
                            paddingRight='20px'
                            maxWidth="400px"
                            maxHeight = "500px"
                            sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                            >
                                Upload Image For Antique
                            </Typography>
                            {/*PNG Image Preview*/}
                            <FileUploader 
                                handleChange={handleChange} 
                                disabled={props.completedStepList[props.activeStep].completed}
                                name="AntiqueDescriptionFile" 
                                types={fileTypes}
                                value={props.antiqueDescriptionFile}
                                onChange={props.setAntiqueDescriptionFile}
                                
                                />
                            <br></br>
                            <br></br>
                            {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
                            <div>
                                <nav>
                                    <button onClick={goToPrevPage}>Prev</button>
                                    <button onClick={goToNextPage}>Next</button>
                                    <p>
                                        Page {pageNumber} of {numPages}
                                    </p>
                                </nav>

                                <Document
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                            </div>

                        </div>
                    </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={props.completedStepList[props.activeStep].completed}
                            sx={{ mt: 3, mb: 2, width: '150px' }}
                        >
                            Confirm Details
                        </Button>
                </div>  
            </Box>
        </Stack>
    )
}
export default AntiqueDescription;

