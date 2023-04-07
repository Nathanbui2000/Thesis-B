

import { useParams } from "react-router-dom";
import { Grow, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
// import axios from "../utils/axios-instance";
import Box from "@mui/material/Box";
// import ProfileNavBar from "../components/navbar/ProfileNavBar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
// import { storage } from "../firebase/firebase";
// import { UploadProfilePicture } from "../Dialog/UploadProfilePicture";
import { getDownloadURL, ref } from "firebase/storage";
// import cookie from "js-cookie";
// import { useUserContext } from "../store/user-context";
import NavBar from "../../../components/navbar/NavBar";
function UserProfile(){
    // const userCtx = useUserContext();
    const { userId } = useParams();

    const [universities, setUniversities] = useState([{ id: 0, value: "" }]);
    const [profilePictureURL, setProfilePictureURL] = useState("");

    const [details, setDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    university: "",
    userId: "",
    passwordHash: "",
    });
    const changeUserDetails = () => {

    };
    return (
        <div>
        <NavBar/>
        <Stack spacing={3} sx={{ mt: 3 }}>
            {/* <ProfileNavBar></ProfileNavBar> */}
            <Grow in={true} appear={true}>
            <Box
                sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                {/* <Avatar
                src={profilePictureURL}
                variant="rounded"
                sx={{
                    m: 1,
                    width: 80,
                    height: 80,
                    bgcolor: "secondary.main",
                }}
                ></Avatar> */}
                {/* {userCtx.userSession.userId == details.userId && (
                <UploadProfilePicture />
                )} */}

                <Box
                component="form"
                onSubmit={changeUserDetails}
                noValidate
                sx={{ mt: 1 }}
                >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    autoComplete="username"
                    onChange={(e) =>
                    setDetails({ ...details, username: e.target.value })
                    }
                    value={details.username}
                    disabled={true} // Don't allow users to change username
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstname"
                    label="First Name"
                    id="firstname"
                    autoComplete="firstname"
                    onChange={(e) =>
                    setDetails({ ...details, firstName: e.target.value })
                    }
                    value={details.firstName}
                //   disabled={userCtx.userSession.userId != details.userId}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    autoComplete="lastName"
                    onChange={(e) =>
                    setDetails({ ...details, lastName: e.target.value })
                    }
                    value={details.lastName}
                //   disabled={userCtx.userSession.userId != details.userId}
                />
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    name="university"
                    label="University"
                    id="university"
                    autoComplete="university"
                    onChange={(e) =>
                    setDetails({ ...details, university: e.target.value })
                    }
                    value={details.university}
                //   disabled={userCtx.userSession.userId != details.userId}
                >
                    {universities.map((university) => (
                    <MenuItem key={university.id} value={university.id}>
                        {university.value}
                    </MenuItem>
                    ))}
                </TextField>

                {/* {userCtx.userSession.userId == details.userId && (
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Update Details
                    </Button>
                )} */}
                </Box>
            </Box>
            </Grow>
        </Stack>
        </div>
            
    );
}
export default UserProfile;