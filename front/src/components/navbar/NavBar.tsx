import { IconButton,AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useUserContext } from "../../store/user-context";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";

function NavBar() {
  const userCtx = useUserContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profilePictureURL, setProfilePictureURL] = useState("");

  const handleNavLogout = () => {
    // setAnchorEl(null);
    navigate("/login");
  };
  const handleNavUserInfo = () => {
    setAnchorEl(null);
    //Original Code 
    // navigate("/profile/" + userCtx.userSession.userId);
    navigate("/user-profile");
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position={"static"} enableColorOnDark color="primary">
        <Toolbar>
            <Link
            // to="/home"
            style={{
                textDecoration: "none",
                display: "flex",
                flexGrow: 1,
                color: "inherit",
            }}
            >
            <LibraryBooksIcon
                sx={{ justifySelf: "flex-start", alignSelf: "center", mr: 1 }}
            />
            <Typography
                variant="h6"
                component="div"
                style={{ justifySelf: "flex-end" }}
            >
                AntiqueIoTChain
            </Typography>
            </Link>
            {/* {userCtx.userSession.userId && (
            <div> */}
            <Box
            sx={{
                display: { xs: "none", sm: "block" },
                justifySelf: "right",
                
                }}  
            >
            <Button 
                sx={{ color: "#fff" }}
                href = '/dashboard'
            >Upcoming Appointment</Button>
            </Box>
            <Box
            sx={{
                display: { xs: "none", sm: "block" },
                justifySelf: "right",
                
                }}  
            >
            <Button 
                sx={{ color: "#fff" }}
                href = '/dashborad/book-appoinments'
            >Book Appointment</Button>
            </Box>
            <Box
            sx={{
                display: { xs: "none", sm: "block" },
                justifySelf: "right",
                
                }}  
            >
            <Button 
                sx={{ color: "#fff" }}
                href = '/dashboard/verify-antique'
            >Verify Antique</Button>
            </Box>
            <Box
            sx={{
                display: { xs: "none", sm: "block" },
                justifySelf: "flex-end",
            }}
            >
            {/* <Button sx={{ color: "#fff" }}>USYD</Button> */}
            <Button sx={{ color: "#fff" }}
                    href="/dashboard/my-antique-list">My Antique List</Button>
            </Box>
            {/* </div>
            )} */}

            <div>
                <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <Avatar
                    src={profilePictureURL}
                    sx={{
                    m: 1,
                    bgcolor: "secondary.main",
                    }}
                ></Avatar>
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleNavUserInfo}>Profile</MenuItem>
                <MenuItem onClick={handleNavLogout}>
                    Logout
                </MenuItem>
                </Menu>
            </div>
        </Toolbar>
        </AppBar>
    </Box>
    );
}
export default NavBar;