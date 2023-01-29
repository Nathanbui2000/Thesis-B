import { Button, Grow, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios-instance";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbarAppraiser/NavBarAppraiser"

interface MainDashboardAppraiserProps {
  databaseControllerContract: any;
}
function MainDashboardAppraiser(props: MainDashboardAppraiserProps) {
  const navigate = useNavigate();
  const databaseControllerContract = props.databaseControllerContract;
  console.log("Main Dashboard Database Contract Information");

  console.log(databaseControllerContract);
  const columns: GridColDef[] = [
    { field: "AppointmentDate", headerName: "Appointment Date", minWidth: 250, type:"date",headerAlign: "center"},
    {
      field: "AppointmentTime",
      headerName: "Time",
      minWidth: 150,
      editable: false, 
      type: "datetime",
      headerAlign: "center",
    },
    {
      field: "NormalFirstName",
      headerName: "Requester First Name",
      description: "First name of the person who requested the meeting",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "UserLastName",
      headerName: "Requester Last Name",
      description:
        "Family name of the person who requested the appointment",
      type: "string",
      flex: 1,
      editable: false,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "ChooseAppointmentButton",
      headerName: "Choose Appointment",
      description: "Click to choose an appointment",
      flex: 1,
      align: "right",
      headerAlign: "center",
      editable: false,
      type: "event",
    },
    {
  field: "Print",
  renderCell: (cellValues) => {
    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cellValues: GridRenderCellParams<any, any, any>) {
      event.stopPropagation(); // 
      console.log(cellValues);  
    }

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => {
          handleClick(event, cellValues);
        }}
      >
        Print
      </Button>
    );
  }
}
  ];

  const [dataRows, setDataRows] = useState<
    { [key: string]: string | number }[]
  >([]);

  useEffect(() => {
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
    const dataRows = [
      {
        "id":1,
        "AppointmentDate": "2022-01-01",
        "AppointmentTime": "10:00 AM",
        "NormalFirstName": "John",
        "UserLastName": "Doe",
        "ChooseAppointmentButton": "Choose"
      },
      {
        "id":2,
        "AppointmentDate": "2022-01-02",
        "AppointmentTime": "11:00 AM",  
        "NormalFirstName": "Jane",
        "UserLastName": "Smith",
        "ChooseAppointmentButton": "click"
      },
    ]
    setDataRows(dataRows);
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
          username, Choose An Appointment Suit You!
        </Typography>
      </div>

      <Grow in={true} appear={true}>
        <div style={{ height: "500px" }}>
          <DataGrid
            rows={dataRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick={true}
            getRowId={(row) => {
              return row.id;
            }}
            onRowClick={(row) => {
              navigate(`/uos/${row.row.unitId}`);
            }}
          />
        </div>
      </Grow>
    </Stack>
    </div>
  );
}

export default MainDashboardAppraiser;
