import MyAntiqueListNormalUser from "./routes/normalUser/MyAntique/MyAntique";
import AppointmentNormalUser from "./routes/normalUser/BookAppointment/appointment";
import VerifyAntiqueNormalUser from './routes/normalUser/Verification/VerifyAntique';
import MainDashboardNormalUser from "./routes/normalUser/MainDashboard";
// import UnitOfStudyView from "./routes/UnitOfStudyView";
import LoginView from "./routes/LoginView";
import LandingPage from './routes/landingPages/Pages/landing'
import Information from './routes/landingPages/Pages/information'
import React from "react";
import UserProfileNormalUser from "./routes/normalUser/UserProfile/userProfile"
import MainDashboardAppraiser from "./routes/appraiser/MaindashboardAppraiser"
const routes = (databaseController: any ) => [
    { path: "/normal/dashboard", 
        element: <MainDashboardNormalUser 
        databaseControllerContract = {databaseController}
        /> },

        { path: "/Login", 
        element: <LoginView 
        databaseControllerContract = {databaseController}
        /> },

        { path: "/normal/dashboard/verify-antique",
        element: <VerifyAntiqueNormalUser 
        databaseControllerContract = {databaseController}
        /> },

        { path: "/normal/dashboard/my-antique-list",
        element: <MyAntiqueListNormalUser 
        databaseControllerContract = {databaseController}
        /> },
        // { path: "/dashboard/appoinment",
        // element: <AppointmentNormalUser 
        // databaseControllerContract = {databaseController}
        // /> },
        { path: "/",
        element: <Information 
        /> },
        { path: "/landing",
        element: <LandingPage 
        /> },
        { path: "/normal/user-profile",
        element: <UserProfileNormalUser 
        /> },
        { path: "/appraiser/dashboard",
        element: <MainDashboardAppraiser 
        databaseControllerContract = {databaseController}
        /> },
];

export default routes;