import { Button, Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios-instance";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbarAppraiser/NavBarAppraiser"
import "./dashboard.css"
import cookie from "js-cookie";
import {AppointmentView} from "../../../dialog/appointmentView";
import {Appointment} from "../../../type/Java/Appointment";
import { useUserContext } from "../../../store/user-context";
import {IUser} from "../../../types/user";
import {ChangeAppointmentTimeDialog} from "../../../dialog/ChangeAppointmentTimeDialog"
import { ChooseAppointmentDialog } from "../../../dialog/ChooseAppointmentDialog";
interface MainDashboardAppraiserProps {
  databaseControllerContract: any;
}

function MainDashboardAppraiser(props: MainDashboardAppraiserProps) {
  const navigate = useNavigate();
  const userCtx = useUserContext();

  console.log("Main Dashboard Database Contract Information");
  const customHeader = (props: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
    <div style={{ fontWeight: "bold", fontSize: "18px" }}>
      {props.value}
    </div>
  );

  //Truffle Data
  const databaseControllerContract = props.databaseControllerContract;
  console.log(databaseControllerContract);

  //Table View Data
  const columns: GridColDef[] = [
    {
      field: "appointmentDate",
      headerName: "Appointment Date", 
      minWidth: 200, 
      type:"date",
      headerAlign: "center",
      align:"center",
      headerClassName: "bold-header",
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
      // renderCell: (cellValues) => (
      // <div style={{ border: "1px solid black" }}>
      //   {cellValues.value}
      // </div>
      // ),
    },
    {
      field: "appointmentTime",
      headerName: "Time",
      minWidth: 150,
      editable: false, 
      type: "datetime",
      align: "center",
      headerAlign: "center",
      headerClassName: "bold-header",
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
      // renderCell: (cellValues) => (
      // <div style={{ border: "1px solid black" }}>
      //   {cellValues.value}
      // </div>
      // ),
    },
    {
      field: "firstName",
      headerName: "Requester First Name",
      description: "First name of the person who requested the meeting",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
      align:"center",
      headerAlign: "center",
      headerClassName: "bold-header",
    },
    {
      field: "lastName",
      headerName: "Requester Last Name",
      description:
        "Family name of the person who requested the appointment",
      type: "string",
      flex: 1,
      editable: false,
      align: "center",
      headerAlign: "center",
      headerClassName: "bold-header",
    },
    {
      field: "ChooseAppointmentButton",
      headerName: "Appointment Details",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
      type: "event",
      headerClassName: "bold-header",
      renderCell: (cellValues) => {
        return (
          <AppointmentView
            appointmentID = {Number(cellValues.id)}
          />
        )
      }
    },
  {
    field: "Choose Appointment",
    align:"center",
    minWidth: 150,
    headerAlign:"center",
    headerClassName: "bold-header",
    description: "Click to choose an appointment",
    renderCell: (cellValues) => 
    {
      return (
      <ChooseAppointmentDialog
            appointmentID = {Number(cellValues.id)}
          />
      )
    }
  }
  ];

  const [dataRows, setDataRows] = useState<
    { [key: string]: string | number }[]
  >([]);

  const [userData, setUserData] = useState<IUser | null>(null);
  
  // Dialog Data
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isAppointmentViewOpen, setIsAppointmentViewOpen] = useState(false)
  const [appointmentList, setAppointmentList] = useState<Appointment[] | null>(null);
  const retrieveAllAppointments = () => 
  {
    //Todo: Reieve All Appointments Information
    const params = new URLSearchParams();
    const username= cookie.get("userName") || "" ;
    params.append('antiqueOwnerUsername',username);
    const getAppointmentsOption =
    {
      method: "GET",
      params,
      url: "http://localhost:8080/api/v1/all-appointment-view/all",
    };
      axios(getAppointmentsOption)
      .then((response) => {
          if (response.status === 200) {
              console.log(response);
              setDataRows(response.data);
              setAppointmentList(response.data);
              console.log(appointmentList);
              console.log(dataRows);
              console.log(response.data); 
          }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (row :GridRowParams<Appointment>) => {
    setSelectedAppointment(row.row as Appointment);
    console.log(selectedAppointment);
    setIsAppointmentViewOpen(true);
  };

  const retrieveUserData = () => 
  {
    const authorizationValue = "Bearer " + userCtx.accessToken;
    const params = new URLSearchParams();
    if (cookie.get("userName"))
    {
      params.append("username", cookie.get("userName") || "");
    }

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: authorizationValue,
      },
      params,
      url: "http://localhost:8080/api/v1/user/get-user-by-username",
    };

    axios(options)
      .then((resp) => {
        console.log(resp);
        setUserData(resp.data);
      })
      .catch((err) => {
        console.error(err);

      });
  } 

  useEffect(() => {
    retrieveAllAppointments();
    retrieveUserData();

  }, []);

  return (
    <div>
    <NavBar />
    {/* <AppointmentView/> */}
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
          {userData?.firstName} {userData?.lastName}, Choose An Appointment Suit You!
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
            pageSize={7}
            rowsPerPageOptions={[9]}
            disableSelectionOnClick={true}
            getRowId={(row) => {
              return row.appointmentID;
            }}
            onRowClick={(row) => {
              handleRowClick(row);
              //? Show Appointment Page 
            }}
          />
        </div>
      </Grow>
      
    </Stack>
    </div>
  );
}

export default MainDashboardAppraiser;


