import { Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbar/NavBar"
import "./dashboard.css"
import { useUserContext } from "../../../store/user-context";
import cookie from "js-cookie";
interface MainDashboardProps {
  databaseControllerContract: any;
}
function MainDashboard(props: MainDashboardProps) {
  const navigate = useNavigate();
  const userCtx = useUserContext();
  const databaseControllerContract = props.databaseControllerContract;
  console.log("Main Dashboard Database Contract Information");

  console.log(databaseControllerContract);
  const columns: GridColDef[] = [
    { field: "appointmentDate", headerName: "Appointment Date", minWidth: 250, type:"date",headerAlign: "center",headerClassName: "bold-header"},
    {
      field: "appointmentTime",
      headerName: "Time",
      minWidth: 150,
      editable: false, 
      type: "datetime",
      headerAlign: "center",
      headerClassName: "bold-header"
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
      headerClassName: "bold-header"
    },
    {
      field: "appraiserLastName",
      headerName: "Last Name",
      description:
        "Family name of the person who confirmed the appointment",
      type: "string",
      flex: 1,
      editable: false,
      align: "left",
      headerAlign: "center",
      headerClassName: "bold-header"
    },
    {
      field: "appointmentStatus",
      headerName: "Approve Status",
      description: "The current status of the appointment",
      flex: 1,
      align: "right",
      headerAlign: "center",
      editable: false,
      type: "boolean",
      headerClassName: "bold-header"
    },
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
    const getAppointmentOption= {
      method: "GET",
      params,
      url: "http://localhost:8080/api/v1/normal-user-appointment-view/find-all-by-username",
    };
    axios(getAppointmentOption)
    .then((response) => {
        if (response.status === 200) {
            setDataRows(response.data);
        }
    })
    .catch((error) => {
      console.log(error);
      });
  };

  useEffect(() => {
    RetrieveUserAppointmentList()
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
          username, here is your upcoming appointment
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
