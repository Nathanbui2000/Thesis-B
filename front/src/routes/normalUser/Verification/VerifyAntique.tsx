import { Grow, Box, Stack, Typography, TextField, InputAdornment, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

import {AntiqueObject} from '../../../type/Truffle/AntiqueObject'
import {Description} from '../../../type/Truffle/Description'
import {AntiqueTruffleData} from '../../../type/Truffle/Antique'
import {Documentation} from '../../../type/Truffle/Documentation'
import {Verification} from '../../../type/Truffle/Verification'
import moment from 'moment';
import {IUser} from "../../../type/Java/user";
import NavBar from "../../../components/navbar/NavBar"
import "./Verification.css"
// import { Search as SearchIcon } from "@material-ui/icons";
// const useStyles = makeStyles((theme) => ({
//   searchIcon: {
//     "&:before": {
//         content: "AntiqueIotChain UID",
//         position: "absolute",
//         left: 0,
//         top: 0,
//         width: "100%",
//         height: "100%",
//         background: "url(/path/to/search-icon.svg)",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//     },
//   },
// }));
interface VerifyAntiqueProps {
  databaseControllerContract: any;
}


function VerifyAntique(props:VerifyAntiqueProps) 
{

    const databaseControllerContract = props.databaseControllerContract;
    // console.log("Verify Antique Database Contract Information");

    // console.log(databaseControllerContract);
    const headers = ['UID', 'Antique Name', 'Owner Name', 'Owner Unique Address', 'Verifier Name', 'Estimated Manufactuer Year', 'Approve Date', 'Verification ID',"Documentation","Verification Details","Description Data"];
    const [antiqueTruffleData, setAntiqueTruffleData] = useState<AntiqueTruffleData | null>(null);
    const [antiqueVerificationTruffleData, setAntiqueVerificationTruffleData] = useState<Verification | null>();
    const [antiqueDescriptionTruffleData, setAntiqueDescriptionTruffleData] = useState<Description | null>(null);
    const [antiqueDocumentationTruffleData, setAntiqueDocumentationTruffleData] = useState<Documentation | null>();
    const [antiqueOwnerData, setAntiqueOwnerData] = useState<IUser | null>(null);
    const [verifierData, setVerifierData] = useState<IUser | null>(null);
    const [searchValue, setSearchValue] = useState("");
    // const classes = useStyles();
    
    //Dialog Informations 
    const [isInformativeDialogOpen, setIsInformativeDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState("");
    const handleInformativeDialogOpen= () => {
        setIsInformativeDialogOpen(true);
    };

    function handleCloseDialog(): void {
        setIsInformativeDialogOpen(false);
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const retrieveVerifierData = async () => 
    {
        const params = new URLSearchParams();
        if (antiqueVerificationTruffleData != null)
        {
            params.append("blockchainAddress",antiqueVerificationTruffleData.uploader);
            const retrieveAppraiserUserData = 
            {
                method: "GET",
                headers: { "content-type": "application/x-www-form-urlencoded" },
                params,
                url: "http://localhost:8080/api/v1/user/get-user-by-blockchain-address",
            };
            axios(retrieveAppraiserUserData)
            .then((response) => {
                if (response.status === 200) 
                {
                    setVerifierData(response.data);
                }
            })
            .catch((error) => 
            {
                setAntiqueTruffleData(null);
                setDialogTitle("Invalid Antique UID Number" );
                setDialogContent(
                        "Antique Appraiser Not Found !.Please Try Another Antique UID Number"
                );
                setIsInformativeDialogOpen(true);
            });
        
        }
        else 
        {

        }
    }

    const retrieveAntiqueData = async () =>
    {
        //Todo: Call Blockchain With Provided ID:
        const truffleData = await databaseControllerContract.methods.GetAntiqueByID(searchValue).call()
        setAntiqueTruffleData(truffleData);
        console.log(antiqueTruffleData);
        const descriptionData = await databaseControllerContract.methods.GetDescriptionByID(truffleData?.descriptionID).call();
        // Wait for 2 milliseconds
        setAntiqueDescriptionTruffleData(descriptionData);

        setAntiqueDocumentationTruffleData(await databaseControllerContract.methods.GetDocumentationByID(truffleData?.documentationID).call());
        setAntiqueVerificationTruffleData(await databaseControllerContract.methods.GetVerificationByID(truffleData?.verificationID).call());

        console.log(antiqueDescriptionTruffleData);
        console.log(antiqueVerificationTruffleData);
        console.log(antiqueDocumentationTruffleData);
        await retrieveVerifierData();
                
    }
    const handleClick = () => {
        console.log(searchValue);
        //Todo: Send Request to server 
        //Step 1: Retrieve Owner User Data
        const params = new URLSearchParams();
        if (searchValue != null) 
        {
            params.append("antiqueID", searchValue);
        }
        const retrieveOwnerUserData = {
            method: "GET",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            params,
            url: "http://localhost:8080/api/v1/antique-user/get-user-by-antiqueID",
        };
        axios(retrieveOwnerUserData)
            .then((response) => {
                if (response.status === 200) 
                {
                    //Step 2: Retrieve Antique Object Data
                    setAntiqueOwnerData(response.data);
                    retrieveAntiqueData();
                    // console.log(response);
                }
            })
            .catch((error) => 
            {
                setAntiqueTruffleData(null);
                setDialogTitle("Invalid Antique UID Number" );
                setDialogContent(
                        "Antique UID Number: "  + searchValue  + " is not found !. Please try again"
                );
                setIsInformativeDialogOpen(true);
            });
        


        const emptyFile = new File([new Blob()], "empty.txt", {
                type: "text/plain"
        });
        // Perform the search here using the searchValue
        // const antiqueObject: AntiqueObject = {
        //     antiqueID: 1234567890,
        //     name: "Vase",
        //     owner: {
        //         id:1,
        //         firstName: "John",
        //         lastName: "Smith",
        //         uniqueAddress: "0x1234567890abcdef"
        //     },
        //     professionalVerifier: {
        //         id:1,
        //         firstName: "Jane",
        //         lastName: "Doe",
        //         uniqueAddress: "0x0987654321fedcba"
        //     },
        //     verification: {
        //         estimateManufacturYear: "1910",
        //         approveDate: new Date("2022-01-01"),
        //         id: 1,
        //         IotDeviceId: 1,
        //         authenticity: "True",
        //         rareness: "rare"
        //     },
        //     documentation: {
        //         id: 1,
        //         documentationFile: emptyFile
        //     },
        //     description: {
        //         id:1,
        //         material: "Materials 1",
        //         height: 1,
        //         lenght: 1.2,
        //         width: 3,
        //         fileUpload: emptyFile,
        //     }

        // };
        // setSearchResults(antiqueObject);
        //Set searchResult Array
    }
    const navigate = useNavigate();
    return (
        <div>
        <NavBar />
        <Stack spacing={3} sx={{ mt: 3 }}>
            <div style={{ display: "center" }}>
                <Typography
                variant="h3"
                component="div"
                sx={{ justifySelf: "flex-start" }}
                >
                Verify Antique UID
                </Typography>
            </div>
            <div>
                <TextField
                    id="standard-search"
                    label="Insert Antique UID Here"
                    type="number"
                    variant="outlined"
                    style={{ width: "50%" }}
                    value={searchValue}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    // className={classes.searchIcon}
                                    onClick={handleClick}
                                    > 
                                    Search
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            {antiqueTruffleData !== null && (
                <TableContainer className="result-table">
                    <div style={{width: '100%', overflowX: 'auto'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                        {headers.map(header => 
                                        <TableCell>
                                                <Typography variant="h6" component="th" gutterBottom>
                                                    {header}
                                                </Typography>
                                        </TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow key={antiqueTruffleData?.antiqueID}>
                                        <TableCell>{antiqueTruffleData?.antiqueID}</TableCell>
                                        <TableCell>{antiqueDescriptionTruffleData?.materialCreated}</TableCell>
                                        <TableCell>{antiqueOwnerData?.firstName + " " + antiqueOwnerData?.lastName}</TableCell>
                                        <TableCell>
                                            <a
                                                href = {"https://etherscan.io/address/" + antiqueOwnerData?.blockchainAddress}
                                                rel = "noopener noreferrer"
                                                target = "_blank"
                                            >
                                                {antiqueOwnerData?.blockchainAddress.substring(0,10)}...
                                            </a>
                                        
                                        </TableCell>
                                        <TableCell>{verifierData?.firstName + " " +  verifierData?.lastName}</TableCell>
                                        <TableCell>{antiqueVerificationTruffleData?.estimateManufactureYears}</TableCell>
                                        <TableCell>{moment(antiqueVerificationTruffleData?.approveDate).format('MM/DD/YYYY')}</TableCell>
                                        <TableCell>{antiqueVerificationTruffleData?.verificationID}</TableCell>

                                        <TableCell>
                                            <a
                                                href = {"https://cloudflare-ipfs.com/ipfs/" + antiqueDocumentationTruffleData?.filehash}
                                                rel = "noopener noreferrer"
                                                target = "_blank"
                                            >
                                                {antiqueDocumentationTruffleData?.fileName}
                                                
                                            </a>
                                        </TableCell>

                                        <TableCell>{antiqueVerificationTruffleData?.antiqueRealness}</TableCell>
                                        <TableCell>
                                            <a
                                                href = {"https://cloudflare-ipfs.com/ipfs/" + antiqueDescriptionTruffleData?.filehash}
                                                rel = "noopener noreferrer"
                                                target = "_blank"
                                            >
                                                {antiqueDescriptionTruffleData?.fileName}
                                                
                                            </a>
                                        </TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </TableContainer>
                
            )}
            <Dialog open={isInformativeDialogOpen} onClose={() => setIsInformativeDialogOpen(false)}>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogContent>{dialogContent}</DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseDialog()
                            
                            }>OK</Button>
                        </DialogActions>
            </Dialog>
        </Stack>
        </div>
    )
}
export default VerifyAntique;
