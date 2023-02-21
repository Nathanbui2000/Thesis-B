import { Box,Typography,TextField, Stack, Grow, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import {GridRenderCellParams } from "@mui/x-data-grid";
import {
    Alert,
    Avatar,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    Button,  
} 
from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { IStudyResource } from "../../../types/study-resource";
import { useEffect, useState } from "react";
import { storage } from "../../../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { FileUploader } from "react-drag-drop-files";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import UploadIcon from '@mui/icons-material/Upload';
import StepInterface from "./StepInterface";

function AntiqueDocumentation(props:StepInterface) {
    // const [resource, setResource] = useState<IStudyResource | null>(null);
    
    //Download Documentation Template
    const cors = require("cors")({ origin: true });
    const [fileUrl, setfileUrl] = useState("");


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

    //Documentation Preview
    const fileTypes = ["PDF"];
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer | null>(
        null
    ); 
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
        setPageNumber(1);
        setNumPages(numPages);
    };
    const handleDownloadResource = () => {
        const firebasePath = "ThesisB/AddAntique/TemplateDocumentation/AntiqueDocumentationTemplate.docx";
        getDownloadURL(ref(storage, firebasePath))
        .then((url) => {
            setfileUrl(url);
            fetch(fileUrl).then(function (t) {
            return t.blob().then((b) => {
                var a = document.createElement("a");
                a.href = URL.createObjectURL(b);
                a.setAttribute("download","AntiqueDocumentationTemplate.docx");
                a.click();
                
            });
        });          
        })
        .catch((err) => {
            console.error(err);
        });
    }
    const handleUploadResource = () =>
    {
        if(file === null)
        {
            //Error Dialog Content
            setDialogTitle("Please Upload File !");
            setDialogContent ("No Uploaded File Detected. Please upload a file")
            return setIsInformativeDialogOpen(true);
        }

        props.setStep3AntiqueDocumentationFile(file);
        const updatedSteps = [...props.completedStepList];
        updatedSteps[props.activeStep] = { completed: true };
        props.setCompletedStepList(updatedSteps);
        setDialogTitle("Succesfully Uploaded File!"); 
        setDialogContent ("Thank you for completing the Antique Documentation. Please Process to the next step.")
        return setIsInformativeDialogOpen(true);
    }
    useEffect(() => {
        if (props.step3AntiqueDocumentationFile)
            setFile(props.step3AntiqueDocumentationFile);
    }, []);

    return (
        <Stack spacing={4} sx={{ mt: 3 }}>
        <div style={{ display: "center" }}>
            <Typography
            variant="h2"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
            Antique Documentation Details
            </Typography>
        </div>
        <div style={{ display: "center" }}>
            <Typography
            variant="h3"
            component="div"
            sx={{ justifySelf: "flex-start" }}
            >
            Step 3: Please Fill In Documentation For Antique
            </Typography>
        </div>
        <div
        style=
                {{
                    display: "center"
                }}
        >
            {/*Documentation Template Download*/}
            <div 
                style=
                {{
                    display: "center", 
                    alignItems: "center", 
                    cursor: "pointer",
                    paddingTop:"20px" 
                }}
            >
                <CloudDownloadIcon
                    onClick = {handleDownloadResource}
                ></CloudDownloadIcon>
                <Typography
                    style={{ marginLeft: "8px" }}
                    variant="h4"
                    component="div"
                    sx={{ justifySelf: "flex-start" }}
                    onClick = {handleDownloadResource}
                >
                Documentation Format (Click To Download)
                </Typography>
            </div>
            {/*Documentation Preview */}
            <div

            style=
                {{
                    display: "center", 
                    paddingTop:"20px" ,
                    border: "1px solid black",
                }}
            >   
                {/*Upload File Button*/}
                <div
                    style=
                    {{
                        display: "flex",
                        justifyContent: "center" 
                    }}
                >
                    <FileUploader 
                        handleChange={handleChange} 
                        name="file" 
                        disabled={props.completedStepList[props.activeStep].completed}
                        types={fileTypes} 
                        style=
                        {{
                            display: "center",
                            justifyContent: "center", 
                            paddingTop:"20px" 
                        }} 
                    />
                </div>
                {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
                <div
                    style=
                        {{
                            display: "center", 
                            alignItems: "center", 
                            cursor: "pointer",
                            paddingTop:"20px" 
                        }}
                >
                    <nav>
                        <button onClick={goToPrevPage}>Prev</button>
                        <button onClick={goToNextPage}>Next</button>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    </nav>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',borderColor: "black" }}>
                        <Document
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </div>

            </div>
            </div>
            {/*Upload Document Button*/}
            <div
            >
                <Button
                    variant="contained"
                    disabled={props.completedStepList[props.activeStep].completed}
                    startIcon={<UploadIcon />}
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleUploadResource}
                    size="small"
                >
                    Upload Document
                </Button>
            </div> 
        </div>
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
export default AntiqueDocumentation;

