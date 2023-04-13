import { Button, Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar"
import "./dashboard.css"
import { useUserContext } from "../../../store/user-context";
import cookie from "js-cookie";
import {IUser} from "../../../type/Java/user";

interface MainDashboardProps {
  databaseControllerContract: any;
}
function MainDashboard(props: MainDashboardProps) {
  const navigate = useNavigate();
  const userCtx = useUserContext();
  const [userData, setUserData] = useState<IUser | null>(null);
  const databaseControllerContract = props.databaseControllerContract;
  console.log("Main Dashboard Database Contract Information");
  
        function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cellValues: GridRenderCellParams<any, any, any>) {
            event.stopPropagation(); // 
            console.log(cellValues);  
            //Open Diaglog For Propose Another Time 
  }

  console.log(databaseControllerContract);
  const columns: GridColDef[] = [
    { 
    field: "appointmentDate", 
    headerName: "Appointment Date", 
    minWidth: 250, type:"date",
    headerAlign: "center",
    headerClassName: "bold-header ",
    align: 'center',
    renderCell: (cellValues) => (
            <div style=
                {{ 
                    fontWeight: "bold",
                    fontSize: 11,
                    // border: "1px solid black" 
                }}>
                {cellValues.value}
            </div>
        ),
    
    
    },
    {
      field: "appointmentTime",
      headerName: "Time",
      minWidth: 150,
      editable: false, 
      type: "datetime",
      headerAlign: "center",
      headerClassName: "bold-header",
      align: 'center'
    },
    {
      field: "appraiserFirstName",
      headerName: "First Name",
      description: "First name of the person who confirmed the appointment",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
      headerAlign: "center",
      headerClassName: "bold-header",
      align: 'center'
    },
    {
      field: "appraiserLastName",
      headerName: "Last Name",
      description:
        "Family name of the person who confirmed the appointment",
      type: "string",
      flex: 1,
      editable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: "bold-header",

    },
    {
      field: "appointmentStatus",
      headerName: "Approve Status",
      description: "The current status of the appointment",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
      type: "boolean",
      headerClassName: "bold-header",
    },
    {
        field: "CancelAppointment",
        flex: 1,
        headerName: "Cancel",
        align:"center",
        minWidth: 150,
        headerAlign:"center",
        headerClassName: "bold-header",
        description: "Please Consider Carefully Before Cancelling Appointment",
        renderCell: (cellValues) => {
        function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cellValues: GridRenderCellParams<any, any, any>) {
            event.stopPropagation(); // 
            console.log(cellValues);  
            //Open Diaglog
            }
            return (
                <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                    handleClick(event, cellValues);
                }}
                >
                Cancel
                </Button>
            );
        }
    }
  ];

  const [dataRows, setDataRows] = useState<
    { [key: string]: string | number }[]
  >([]);
  

  const RetrieveUserAppointmentList = () => 
  {
    const params = new URLSearchParams();
    const username= cookie.get("userName") || "" ;
    params.append('antiqueOwnerUsername',username);
    params.append('accessToken',userCtx.userSession.accessToken);
    const getUserDataOption= {
      method: "GET",
      params,
      url: "http://localhost:8080/api/v1/normal-user-appointment-view/find-all-by-username",
    };
    axios(getUserDataOption)
    .then((response) => {
        if (response.status === 200) {
            setUserData(response.data);
        }
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const RetrieveUserData = () => 
  {
    const params = new URLSearchParams();
    const username= cookie.get("userName") || "" ;
    params.append('username',username);
    const getAppointmentOption= {
      method: "GET",
      params,
      url: "http://localhost:8080/api/v1/user/get-user-by-username",
    };
    axios(getAppointmentOption)
    .then((response) => {
        if (response.status === 200) {
            setUserData(response.data);
        }
    })
    .catch((error) => {
      console.log(error);
      });
  }

  useEffect(() => {
    RetrieveUserAppointmentList()
    RetrieveUserData()
    // axios
    //   .get("/uos", { params: {} })
    //   .then((resp) => {
    //     if (resp.status === 200) {
    //       console.log(resp.data);
    //       setDataRows(resp.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, []);

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
          Welcome back to AntiqueIoTChain
        </Typography>
      </div>
      <div style={{ display: "center" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ justifySelf: "flex-start" }}
        >
          Hi {userData?.firstName} {userData?.lastName}  , here is your upcoming appointment
        </Typography>
      </div>

      <Grow in={true} appear={true}>
        <div 
        style={{ 
          height: "500px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
        }}
        >
          <DataGrid
            sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },

            }}
            rows={dataRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick={true}
            getRowId={(row) => {
              return row.appointmentID;
            }}
            onRowClick={(row) => {
              navigate(`/uos/${row.row.appointmentID}`);
            }}
          />
        </div>
      </Grow>
    </Stack>
    </div>
  );
}

export default MainDashboard;
