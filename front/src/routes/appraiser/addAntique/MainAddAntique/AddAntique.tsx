import { Button, Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios-instance";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../../components/navbarAppraiser/NavBarAppraiser"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AntiqueDescription from "../Description"
import AntiqueDocumentation from "../Documentation"
import AntiqueVerification from "../AntiqueVerification"
import AntiqueEmailVerification from "../EmailVerification"
import { borders } from '@mui/system';
import OwnerDetail from "../OwnerDetail"
import cookie from "js-cookie";
import "./AddAntique.css"
import { IUser } from "../../../../type/Java/user";
import { Description } from "../../../../type/Truffle/Description";
import { useUserContext } from "../../../../store/user-context";
import LoadingSpinner from "../../../../components/loading/LoadingSpinner";
const { Buffer } = require('buffer');

// import ipfsClient from 'ipfs-http-client'
const ipfsClient = require("ipfs-http-client");
const projectId = '2K1WniY6VeM5ZhcrGF8tOWYVDt4';
const projectSecret = '108882a8b0811cf56bb385541b7e748c';
// const auth = 'Basic ' + btoa(projectId + ':' + projectSecret);
// const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`, 'utf-8').toString('base64');
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth
    }
})
const steps = ["Owner Details",'Antique Description', 'Antique Documentation', 'Anitque Verification','Email Verification'];
interface AddAntiqueProps {
    databaseControllerContract: any;
    blockchainController: any;
    mainTruffleUser: any
}

function AddAntique(props: AddAntiqueProps) {
    const stepComponents = [OwnerDetail, AntiqueDescription, AntiqueDocumentation,AntiqueVerification,AntiqueEmailVerification];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const userCtx = useUserContext();
    const [isLoading, setIsLoading] = useState(false);

    //SECTION -  Steps Data State Store Information
    //User StepCompleted
    const [completedStepList, setCompletedStepList] = useState([
        {completed: false}, 
        {completed: false},
        {completed: false},
        {completed: false},
        {completed: false}
    ]);
    const checkStepCompleted = (activeStep : any ) => {
        return completedStepList[activeStep].completed;
    }

        //NOTE - Steps 1: Data Pass To Children Components
    //OwnerDetail Step Data
    const [userVerifiedData, setStep1UserVerifiedData] = useState<IUser| null>(null);
    const [appraiserUserData, setAppraiserUserData] = useState<IUser| null>(null);
    const handleStep1OwnerDetail = (data: IUser) => {
        setStep1UserVerifiedData(data);
    };

    const [step1UserData, setStep1USerData] = React.useState({
        emailAddress: "",
        firstName: "",
        lastName: ""
    });

    const handleStep1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            setStep1USerData({
                ...step1UserData,
                [event.target.name]: event.target.value,
            });
        }
    };

        //NOTE - Steps 2: Data Pass To Children Components
    const [antiqueDescription, setAntiqueDescription] = useState<Description| null>(null);    
    const [step2DescriptionInputData, setStep2DescriptionInputData] = React.useState({
        AntiqueMaterialName: "",
        AntiqueHeight: 0,
        AntiqueLength: 0,
        AntiqueWidth: 0,
        AntiqueDescriptionFile: File,
    });
    const [antiqueDescriptionFile, setAntiqueDescriptionFile] = useState<File | null>(null);

    const handleStep2InputDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // if (event && event.target) {
        //     setStep2DescriptionInputData({
        //         ...step2DescriptionInputData,
        //         [event.target.name]: event.target.value,
        //     });
        // }
        if (event && event.target) {
            const name = event.target.name;
            const value = event.target.value;
            if (name === "AntiqueDescriptionFile") {
            const file = event.target.files ? event.target.files[0] : null;
            setAntiqueDescriptionFile(file);
            } else {
            setStep2DescriptionInputData({
                ...step2DescriptionInputData,
                [name]: value,
            });
            }
        }
    };
    const handleStep2UpdateDescription = (data: Description) => {
        setAntiqueDescription(data);
    }
        //NOTE - Step3: Documentation File 

    const [step3AntiqueDocumentationFile, setStep3AntiqueDocumentationFile] = useState<File | null>(null);
 
        //NOTE: Step 4: Verification Data
    const [step4VerificationInputData, setStep4VerificationInputData] = React.useState({
        EstimateManufactureYear: "",
        IoTDeviceID: 0,
        AntiqueRareness: "",
        AntiqueAuthenticity: "",
        AntiqueRealness: "",
    });
    const handleStep4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            setStep4VerificationInputData({
                ...step4VerificationInputData,
                [event.target.name]: event.target.value,
            });
        }
    };

    

    //SECTION - Steps Process Controller Function
    const navigate = useNavigate();
    const databaseControllerContract = props.databaseControllerContract;
    const blockchainController = props.blockchainController;
    const mainTruffleUser = props.mainTruffleUser;
    // console.log("Main Dashboard Database Contract Information");
    const customHeader = (props: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        {props.value}
        </div>
    );
    // console.log(databaseControllerContract);

    const isStepOptional = (step: number) => {
        return step === -1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };
    const handleNext = () => {
        if (activeStep === steps.length - 1)
            handleSaveAntiqueToTruffle();
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    const retrieveUserData = async (username: string) => {
        const authorizationValue = "Bearer " + userCtx.accessToken;
        const params = new URLSearchParams();
        params.append("username", username);

        const options = {
        method: "GET",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: authorizationValue,
        },
        params,
        url: "http://localhost:8080/api/v1/user/get-user-by-username",
        };

        try {
        const resp = await axios(options);
        return resp.data;
        } catch (err) {
        console.error(err);
        // throw error or return default value
        }
    };




    //SECTION - Truffle Logic
    
    async function handleSaveAntiqueToTruffle()  {
        //Retrieve USer Data
        // await retrieveUserData(step1UserData.emailAddress, setStep1UserVerifiedData);
        // await retrieveUserData(cookie.get('userName') || "",setAppraiserUserData);
        setIsLoading(true);
        
        const [userVerifiedData, appraiserUserData] = await Promise.all([
            retrieveUserData(step1UserData.emailAddress),
            retrieveUserData(cookie.get('userName') || ""),
        ]);
        console.log(userVerifiedData);
        console.log(appraiserUserData);
        // console.log("Saving...");
        // console.log("Step 1 Data")
        // console.log(userVerifiedData);

        // console.log("Step 2 Data");
        // console.log(step2DescriptionInputData);
        // console.log(antiqueDescriptionFile);

        // console.log("Step 3 Data");
        // console.log(step3AntiqueDocumentationFile);

        // console.log("Step 4 Data");
        // console.log(step4VerificationInputData);
        // //Todo: Save File To IPFS
        // console.log(ipfs);
        const step2DescriptionFileCID = await uploadFileToIPFS (antiqueDescriptionFile);
        // console.log("Step 2 File Description CID");
        // console.log(step2DescriptionFileCID);

        const step3DocumentsFileCID = await uploadFileToIPFS (step3AntiqueDocumentationFile);
        // console.log("Step 3 File Document CID");
        // console.log(step3AntiqueDocumentationFile);

        console.log(databaseControllerContract);
        if(antiqueDescriptionFile && step3AntiqueDocumentationFile)
            //Todo: Step 1 - Save Description , Documentation, Description To Truffle
            //Todo: Step 2 - Save Antique To Blockchain return AntiqueID
            //Todo: Step 3 - Save AntiqueID + Username to Backend JAVA
            await saveDataToBlockchain
            (
                step2DescriptionFileCID, 
                step3DocumentsFileCID,
                antiqueDescriptionFile,
                step3AntiqueDocumentationFile,
                userVerifiedData,
                appraiserUserData
            );
            
    }

    const saveDataToBlockchain = async (documentationFileCID: string ,descriptionFileCID: String,antiqueDescriptionFile: File, step3AntiqueDocumentationFile: File , userVerifiedData: IUser, appraiserUserData: IUser ) => 
    {
        // blockchainController.eth.personal.unlockAccount(userVerifiedData.blockchainAddress,"Password",20000);
        // blockchainController.eth.personal.unlockAccount(appraiserUserData.blockchainAddress,"Password",20000);

        var sendID = await blockchainController.eth.sendTransaction({
            from: mainTruffleUser,
            to: appraiserUserData.blockchainAddress , 
            value : blockchainController.utils.toWei('3','Ether')});
        const accounts = await blockchainController.eth.getAccounts();
        console.log(accounts);
        
        // const descriptionIDBeforeSend = await 
        // databaseControllerContract.methods.AddDescription
        // (
        //     0,
        //     step2DescriptionInputData.AntiqueMaterialName,
        //     step2DescriptionInputData.AntiqueHeight,
        //     step2DescriptionInputData.AntiqueLength,
        //     step2DescriptionInputData.AntiqueWidth,
        //     descriptionFileCID,
        //     antiqueDescriptionFile.size,
        //     antiqueDescriptionFile.type,
        //     antiqueDescriptionFile.name,
        //     userVerifiedData.blockchainAddress
        // )
        // .call();
        // console.log("Description ID After 1st Call Before Send: "+ descriptionIDBeforeSend);
        // console.log(userVerifiedData.blockchainAddress);
        const DescriptionIDSend = await 
        databaseControllerContract.methods.AddDescription
        (
            0,
            step2DescriptionInputData.AntiqueMaterialName,
            step2DescriptionInputData.AntiqueHeight,
            step2DescriptionInputData.AntiqueLength,
            step2DescriptionInputData.AntiqueWidth,
            descriptionFileCID,
            antiqueDescriptionFile.size,
            antiqueDescriptionFile.type,
            antiqueDescriptionFile.name,
            userVerifiedData.blockchainAddress
        )
        .send 
        (
            {
                from: appraiserUserData.blockchainAddress,
                gas: 672197
            }
        )
        console.log(DescriptionIDSend);
        const DescriptionIDCall = await 
        databaseControllerContract.methods.AddDescription
        (
            0,
            step2DescriptionInputData.AntiqueMaterialName,
            step2DescriptionInputData.AntiqueHeight,
            step2DescriptionInputData.AntiqueLength,
            step2DescriptionInputData.AntiqueWidth,
            descriptionFileCID,
            antiqueDescriptionFile.size,
            antiqueDescriptionFile.type,
            antiqueDescriptionFile.name,
            userVerifiedData.blockchainAddress
        )
        .call();


        // console.log( "Description ID After 2nd Call and 1st Send: "+ descriptionIDAfterSend);
        // console.log(descriptionIDAfterSend);
        // var descriptionObject = await databaseControllerContract.methods.GetDescriptionByID(parseInt(descriptionIDAfterSend)-1).call();
        // console.log( "Description Object Saved");
        // console.log(descriptionObject);
        // const currentAccount = await blockchainController.eth.getAccounts();
        // console.log( "Current User Account:");
        // console.log(currentAccount);
        // let newAccount = await blockchainController.eth.personal.newAccount("Password");
        // blockchainController.eth.personal.unlockAccount(newAccount,"Password",20000);
        // var sendID = await blockchainController.eth.sendTransaction({
        //     from: mainTruffleUser,
        //     to: newAccount , 
        //     value : blockchainController.utils.toWei('3','Ether')});
        
        // console.log("Account After Send: "+ await blockchainController.eth.getBalance(newAccount) )
        // console.log(newAccount);
        // const currentAccountAfterCreated = await blockchainController.eth.getAccounts();
        // console.log(currentAccountAfterCreated);

        //Todo: Save Documentation To Blockchain
        const DocumentationIDSend = await databaseControllerContract.methods.AddDocumentation
        (
            documentationFileCID,
            step3AntiqueDocumentationFile.size,
            step3AntiqueDocumentationFile.type,
            step3AntiqueDocumentationFile.name,
            "File Description",
            userVerifiedData.blockchainAddress
        )
        .send
        (
            {
                from: appraiserUserData.blockchainAddress,
                gas: 672197
            }
        );
        const DocumentationIDCall = await databaseControllerContract.methods.AddDocumentation
        (
            documentationFileCID,
            step3AntiqueDocumentationFile.size,
            step3AntiqueDocumentationFile.type,
            step3AntiqueDocumentationFile.name,
            "File Description",
            userVerifiedData.blockchainAddress
        )
        .call()

        //Todo: Save Verification To Blockchain
        const VerificationIDSend = await databaseControllerContract.methods.AddVerification
        (
            userVerifiedData.blockchainAddress,
            userVerifiedData.userId,
            appraiserUserData.username,
            step4VerificationInputData.IoTDeviceID,
            step4VerificationInputData.EstimateManufactureYear,
            step4VerificationInputData.AntiqueRareness,
            step4VerificationInputData.AntiqueAuthenticity,
            step4VerificationInputData.AntiqueRealness,
            appraiserUserData.blockchainAddress
        )
        .send
        (
            {
                from: appraiserUserData.blockchainAddress,
                gas: 672197
            }
        );
        const VerificationIDCall = await databaseControllerContract.methods.AddVerification
        (
            userVerifiedData.blockchainAddress,
            userVerifiedData.userId,
            appraiserUserData.username,
            step4VerificationInputData.IoTDeviceID,
            step4VerificationInputData.EstimateManufactureYear,
            step4VerificationInputData.AntiqueRareness,
            step4VerificationInputData.AntiqueAuthenticity,
            step4VerificationInputData.AntiqueRealness,
            appraiserUserData.blockchainAddress
        ).call();

        //Todo: Save Antique Object Using ID
        const AntiqueIDSend = await databaseControllerContract.methods.AddAntique
        (
            DocumentationIDCall-1,
            VerificationIDCall-1,
            DescriptionIDCall - 1,
            appraiserUserData.blockchainAddress
        )
        .send 
        (
            {
                from: appraiserUserData.blockchainAddress,
                gas: 672197
            }
        );
        const AntiqueIDCall= await databaseControllerContract.methods.AddAntique
        (
            DocumentationIDCall -1,
            VerificationIDCall - 1,
            DescriptionIDCall - 1,
            appraiserUserData.blockchainAddress
        ).call()

        //NOTE -  Call Backend To Save AntiqueID
        const authorizationValue = "Bearer " + userCtx.accessToken;
        const params = new URLSearchParams();
        params.append("username", userVerifiedData.username);
        params.append("AntiqueID", String(AntiqueIDCall-1));

        const options = {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: authorizationValue,
        },
        params,
        url: "http://localhost:8080/api/v1/antique-user/add-by-username",
        };

        try 
        {
            const resp = await axios(options);
            console.log(resp);
            console.log(await databaseControllerContract.methods.GetDocumentationByID(VerificationIDCall-1).call());
            console.log(await databaseControllerContract.methods.GetAntiqueByID(AntiqueIDCall-1).call());
            console.log(await databaseControllerContract.methods.GetDescriptionByID(DescriptionIDCall-1).call());
            console.log(await databaseControllerContract.methods.GetVerificationByID(VerificationIDCall-1).call());

        } 
        catch (err)
        {
            console.error(err);
            setIsLoading(false); 
            
            // throw error or return default value
        }
        setIsLoading(false);        
    }
    
    const uploadFileToIPFS = async (file: File | null) => {
        if (file)
        {
            const fileContent = Buffer.from(await file.arrayBuffer());
            const { cid } = await ipfs.add(fileContent);
            console.log(cid);
            return cid.toString();
        }
    }; 


    useEffect(() => {
   
    }, []);

    return (
        <div>
            <NavBar/>
            <Stack spacing={3} sx={{ mt: 3 }}>
                {isLoading && 
                <div id="loading-spinner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <LoadingSpinner />
                </div>
                }
                {!isLoading && 
                    <div style={{ display: "center" }}>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{ justifySelf: "flex-start" }}
                            >
                            Add Antique Data Process
                        </Typography>
                        <Box 
                            sx={{ 
                                width: '100%',
                                borderRadius: '16px',
                                borderColor: "black",
                                paddingTop: 5,
                                paddingleft:2,
                                paddingright:2,
                            }}
                            
                        >
                            <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                optional?: React.ReactNode;
                                } = {};
                                if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                                }
                                if (isStepSkipped(index)) {
                                stepProps.completed = false;
                                }
                                return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                                );
                            })}
                            </Stepper>
                            {activeStep === steps.length ? (
                                // <React.Fragment>
                                //     {/*REVIEW - Fix UI For Completed All Step */}
                                //     <Typography sx={{ mt: 2, mb: 1 }}>
                                //     All steps completed - you&apos;re finished
                                //     </Typography>
                                //     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                //     <Box sx={{ flex: '1 1 auto' }} />
                                //     <Button onClick={handleReset}>Reset</Button>
                                //     </Box>
                                // </React.Fragment>
                                <React.Fragment>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            p: 5,
                                            bgcolor: "#f3f3f3",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <Typography variant="h5" gutterBottom>
                                            Congratulations!
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            You have successfully added the antique data.
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                        <Box sx={{ flex: "1 1 auto" }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>

                                ) : (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                            <React.Fragment>
                                                    {React.createElement(stepComponents[activeStep],
                                                    {
                                                        completedStepList: completedStepList,
                                                        setCompletedStepList: setCompletedStepList,
                                                        activeStep: activeStep,
                                                        handleStep1OwnerDetail : handleStep1OwnerDetail,
                                                        step1UserData: step1UserData,
                                                        handleStep1Change: handleStep1Change,
                                                        setStep1UserVerifiedData:setStep1UserVerifiedData,

                                                        step2DescriptionInputData: step2DescriptionInputData,
                                                        handleStep2UpdateDescription: handleStep2UpdateDescription,
                                                        antiqueDescription: antiqueDescription,
                                                        handleStep2InputDataChange:handleStep2InputDataChange,
                                                        antiqueDescriptionFile: antiqueDescriptionFile,
                                                        setAntiqueDescriptionFile:setAntiqueDescriptionFile,

                                                        
                                                        setStep3AntiqueDocumentationFile: setStep3AntiqueDocumentationFile,
                                                        step3AntiqueDocumentationFile: step3AntiqueDocumentationFile,

                                                        step4VerificationInputData:step4VerificationInputData,
                                                        handleStep4Change:handleStep4Change,


                                                    }
                                                    )}
                                            </React.Fragment>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, paddingBottom: "10px", paddingLeft: "50px", paddingRight: "50px" }}>
                                        <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                        style={{backgroundColor: "red", color: "white"}}
                                        >
                                        Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {isStepOptional(activeStep) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Skip
                                        </Button>
                                        )}
                                        <Button onClick={handleNext}
                                                color="primary"
                                                style={{backgroundColor: !checkStepCompleted(activeStep) ? "gray" : "red", color: "white"}}
                                                // disabled={!checkStepCompleted(activeStep)}

                                        >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                                )}
                        </Box>
                    </div>
                }
            </Stack>
        </div>
    )
}

export default AddAntique;


