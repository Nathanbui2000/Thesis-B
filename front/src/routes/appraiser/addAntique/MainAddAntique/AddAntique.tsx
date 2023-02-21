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
import "./AddAntique.css"
import { IUser } from "../../../../type/Java/user";
import { Description } from "../../../../type/Truffle/Description";
const steps = ["Owner Details",'Antique Description', 'Antique Documentation', 'Anitque Verification','Email Verification',"Submit Data"];
interface AddAntiqueProps {
    databaseControllerContract: any;
}

function AddAntique(props: AddAntiqueProps) {
    const stepComponents = [OwnerDetail, AntiqueDescription, AntiqueDocumentation,AntiqueVerification,AntiqueEmailVerification,AntiqueDescription];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());


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
    const [userVerifiedData, setUserVerifiedData] = useState<IUser| null>(null);
    const handleOwnerDetail = (data: IUser) => {
        setUserVerifiedData(data);
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


    

    //SECTION - Steps Process Controller Function
    const navigate = useNavigate();
    const databaseControllerContract = props.databaseControllerContract;
    console.log("Main Dashboard Database Contract Information");
    const customHeader = (props: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        {props.value}
        </div>
    );
    console.log(databaseControllerContract);

    const isStepOptional = (step: number) => {
        return step === -1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };
    const handleNext = () => {
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


    useEffect(() => {
   
    }, []);

    return (
        <div>
            <NavBar/>
            <Stack spacing={3} sx={{ mt: 3 }}>
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
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
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
                                                handleOwnerDetail : handleOwnerDetail,
                                                step1UserData: step1UserData,
                                                handleStep1Change: handleStep1Change,

                                                step2DescriptionInputData: step2DescriptionInputData,
                                                handleStep2UpdateDescription: handleStep2UpdateDescription,
                                                antiqueDescription: antiqueDescription,
                                                handleStep2InputDataChange:handleStep2InputDataChange,
                                                antiqueDescriptionFile: antiqueDescriptionFile,
                                                setAntiqueDescriptionFile:setAntiqueDescriptionFile,

                                                
                                                setStep3AntiqueDocumentationFile: setStep3AntiqueDocumentationFile,
                                                step3AntiqueDocumentationFile: step3AntiqueDocumentationFile,


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

            </Stack>
        </div>
    )
}

export default AddAntique;
