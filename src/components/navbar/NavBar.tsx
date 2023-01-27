import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useUserContext } from "../../store/user-context";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const userCtx = useUserContext();
  const navigate = useNavigate();
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
              href = '/dashboard/my-antique-list'
            >My Antique</Button>
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
            <Button sx={{ color: "#fff" }}>USYD</Button>
            <Button sx={{ color: "#fff" }}
                    href="/information">More Information</Button>
            
                    
          </Box>
            {/* </div>
          )} */}

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              justifySelf: "flex-end",
            }}
          >
            <Button sx={{ color: "#fff" }}
                    href="/Login">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
