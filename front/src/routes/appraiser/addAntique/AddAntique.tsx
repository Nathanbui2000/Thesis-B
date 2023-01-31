import { Button, Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbarAppraiser/NavBarAppraiser"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AntiqueDescription from "./Description"
import AntiqueDocumentation from "./Documentation"
import AntiqueVerification from "./AntiqueVerification"
import AntiqueEmailVerification from "./EmailVerification"
import { borders } from '@mui/system';
import OwnerDetail from "./OwnerDetail"
const steps = ["Owner Details",'Antique Description', 'Antique Documentation', 'Anitque Verification','Email Verification',"Submit Data"];
interface AddAntiqueProps {
    databaseControllerContract: any;
}
function AddAntique(props: AddAntiqueProps) {
    const stepComponents = [OwnerDetail, AntiqueDescription, AntiqueDocumentation,AntiqueVerification,AntiqueEmailVerification,AntiqueDescription];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
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
                                            {React.createElement(stepComponents[activeStep])}
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
                                        style={{backgroundColor: "red", color: "white"}}
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
