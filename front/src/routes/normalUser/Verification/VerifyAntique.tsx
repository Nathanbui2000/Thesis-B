import { Grow, Box, Stack, Typography, TextField, InputAdornment, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

import {AntiqueObject} from '../../../type/Truffle/AntiqueObject'
import moment from 'moment';


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
    console.log("Verify Antique Database Contract Information");

    console.log(databaseControllerContract);
    const headers = ['UID', 'Antique Name', 'Owner Name', 'Owner Unique Address', 'Verifier Name', 'Estimated Manufactuer Year', 'Approve Date', 'Verification ID'];
    const [searchResults, setSearchResults] = useState<AntiqueObject | null>(null);
    const [searchValue, setSearchValue] = useState("");
    // const classes = useStyles();
    
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }
    const handleClick = () => {
        console.log(searchValue);
        const emptyFile = new File([new Blob()], "empty.txt", {
                type: "text/plain"
        });
        // Perform the search here using the searchValue
        const antiqueObject: AntiqueObject = {
            antiqueID: 1234567890,
            name: "Vase",
            owner: {
                id:1,
                firstName: "John",
                lastName: "Smith",
                uniqueAddress: "0x1234567890abcdef"
            },
            professionalVerifier: {
                id:1,
                firstName: "Jane",
                lastName: "Doe",
                uniqueAddress: "0x0987654321fedcba"
            },
            verification: {
                estimateManufacturYear: "1910",
                approveDate: new Date("2022-01-01"),
                id: 1,
                IotDeviceId: 1,
                authenticity: "True",
                rareness: "rare"
            },
            documentation: {
                id: 1,
                documentationFile: emptyFile
            },
            description: {
                id:1,
                material: "Materials 1",
                height: 1,
                lenght: 1.2,
                width: 3,
            }

        };
        setSearchResults(antiqueObject);
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
                Verify Your Antique UID
                </Typography>
            </div>
            <div>
                <TextField
                    id="standard-search"
                    label="Insert Name or UID Here"
                    type="search"
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
            {searchResults !== null && (
                <TableContainer className="result-table">
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
                                <TableRow key={searchResults.antiqueID}>
                                    <TableCell>{searchResults.antiqueID}</TableCell>
                                    <TableCell>{searchResults.name}</TableCell>
                                    <TableCell>{searchResults.owner.firstName + " " +searchResults.owner.lastName}</TableCell>
                                    <TableCell>{searchResults.owner.uniqueAddress}</TableCell>
                                    <TableCell>{searchResults.professionalVerifier.firstName + " " +searchResults.professionalVerifier.lastName}</TableCell>
                                    <TableCell>{searchResults.verification.estimateManufacturYear}</TableCell>
                                    <TableCell>{moment(searchResults.verification.approveDate).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{searchResults.verification.id}</TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>

                </TableContainer>
            )}
            {/* {searchResults !== null ? (
                <Box border={1} p={2}>
                    <Typography>UID: {searchResults.antiqueID}</Typography>
                    <Typography>Name: {searchResults.name}</Typography>
                    <Typography>Owner: {searchResults.owner.firstName} {searchResults.owner.lastName}</Typography>
                    <Typography>Verifier: {searchResults.professionalVerifier.firstName} {searchResults.professionalVerifier.lastName}</Typography>
                    <Typography>Estimated Manufacture Year: {searchResults.verification.estimateManufacturYear}</Typography>
                    <Typography>Approve Date: {moment(searchResults.verification.approveDate).format('MM/DD/YYYY')}</Typography>
                    <Typography>Verification ID: {searchResults.verification.id}</Typography>
                </Box>
            ) : null} */}
        </Stack>
        </div>
    )
}
export default VerifyAntique;
