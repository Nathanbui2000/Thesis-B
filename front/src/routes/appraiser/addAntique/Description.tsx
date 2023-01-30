import { Box,Typography,TextField, Stack, Grow } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import { FileUploader } from "react-drag-drop-files";
import React, { useEffect, useState } from "react";
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
const fileTypes = ["PDF"];

function Description() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    // Upload Documentation
    //Documentation Information
    const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer | null>(
        null
    ); //
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    // Function Set Up Preview PDF File
    const handleChange = (file: Blob | Uint8Array | ArrayBuffer) => {
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

    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
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
        <div>
        {/*Antique Form and Upload (Horizontal)*/}
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
                /> 
                <Typography
                variant="h4"
                paddingTop = "10px"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Antique Height (Meter)
                </Typography>
                <TextField
                    style={{width: '400px'}}
                    margin="normal"
                    required
                    name="AntiqueHeight"
                    label="The Heigth In Meters of Antiqe Object"
                    autoComplete="OwnerName"
                /> 
                <Typography
                variant="h4"
                paddingTop = "10px"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Antique Length (Meter)
                </Typography>
                <TextField
                    style={{width: '400px'}}
                    margin="normal"
                    required
                    name="AntiqueLength"
                    label="The Length In Meters of Antiqe Object "
                    autoComplete="OwnerName"
                /> 
                <Typography
                variant="h4"
                paddingTop = "10px"
                component="div"
                sx={{ justifySelf: "flex-start" , fontStyle: "bold"}}
                >
                    Antique Width (Meter)
                </Typography>
                <TextField
                    style={{width: '400px'}}
                    margin="normal"
                    required
                    name="AntiqueWidth"
                    label="The Width In Meters of Antiqe Object"
                    autoComplete="OwnerName"
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
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
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
                sx={{ mt: 3, mb: 2, width: '150px' }}
            >
                Confirm Details
            </Button>
        </div>

    </Stack>
    )
}
export default Description;

