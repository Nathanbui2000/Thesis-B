import MyAntiqueListNormalUser from "./routes/normalUser/MyAntique/MyAntique";
import AppointmentNormalUser from "./routes/normalUser/BookAppointment/appointment";
import VerifyAntiqueNormalUser from './routes/normalUser/Verification/VerifyAntique';
import MainDashboardNormalUser from "./routes/normalUser/MainDashboard/MainDashboard";
// import UnitOfStudyView from "./routes/UnitOfStudyView";
import LoginView from "./routes/LoginView";
import LandingPage from './routes/landingPages/Pages/landing'
import Information from './routes/landingPages/Pages/information'
import React from "react";
import UserProfileNormalUser from "./routes/normalUser/UserProfile/userProfile"
import MainDashboardAppraiser from "./routes/appraiser/dashboard/MaindashboardAppraiser"
import MyAppointmentAppraiser from "./routes/appraiser/myAppointmentList/MyAppointmentAppraiser"
import AddAppointmentAppraiser from "./routes/appraiser/addAntique/AddAntique"
import AppraiserProfile from "./routes/appraiser/userProfile/appraiserProfile";
import SignUpNormalUserView from "./routes/normalUser/SignUp";
import SignUpAppraiserView from "./routes/appraiser/SignUp"
import ForgotPassword  from "./routes/ForgotPassword";
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
        { path: "/normal/dashboard/book-appointment",
        element: <AppointmentNormalUser 
        // databaseControllerContract = {databaseController}
        /> },
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
        { path: "/appraiser/dashboard/my-appointment",
        element: <MyAppointmentAppraiser 
        databaseControllerContract = {databaseController}
        /> },
        { path: "/appraiser/dashboard/add-antique",
        element: <AddAppointmentAppraiser 
        databaseControllerContract = {databaseController}
        /> },
        { path: "/appraiser/user-profile",
        element: <AppraiserProfile 
        /> },
        { path: "/normal/sign-up",
        element: <SignUpNormalUserView 
        /> },
        { path: "/appraiser/sign-up",
        element: <SignUpAppraiserView 
        /> },
        { path: "/forgot-password",
        element: <ForgotPassword 
        /> },
];

export default routes;