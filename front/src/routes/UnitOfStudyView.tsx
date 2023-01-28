import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../utils/axios-instance";
import { IUnitOfStudyResource } from "../types/study-resources";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IUnitOfStudyInfo } from "../types/unit-of-study";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import moment from "moment";

function UnitOfStudyView() {
  const { uosId } = useParams();

  const [uosInfo, setUosInfo] = useState<IUnitOfStudyInfo | null>(null);
  const [resources, setResources] = useState<IUnitOfStudyResource[]>([]);
  const [ratingsModal, setRatingsModal] = useState<boolean>(false);
  const [ratingsValue, setRatingsValue] = useState<number>(0);

  const handleRatingsModalOpen = () => {
    setRatingsModal(true);
  };

  const handleRatingsModalClose = () => {
    setRatingsModal(false);
  };

  const handleRatingsModalSubmit = () => {
    if (uosInfo) {
      axios
        .post(`/uos/rate`, {
          unitId: uosInfo.unitId,
          userId: 1, // TODO fix up to real user id
          rating: ratingsValue,
        })
        .then((resp) => {
          if (resp.status === 200) {
            // close modal
            retrieveUosInfo();
            setRatingsModal(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const retrieveUosInfo = () => {
    axios
      .get(`/uos/${uosId}`, { params: {} })
      .then((resp) => {
        if (resp.status === 200) {
          setUosInfo(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const retrieveUosInfoResources = () => {
    axios
      .get(`/uos/resources/${uosId}`, { params: {} })
      .then((resp) => {
        if (resp.status === 200) {
          setResources(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    retrieveUosInfo();
    retrieveUosInfoResources();
  }, [uosId]);

  const columns: GridColDef[] = [
    { field: "resourceTitle", headerName: "ResourceTitle", minWidth: 400 },
    {
      field: "resourceAvgRating",
      headerName: "Average Rating",
      description: "The average rating on the course for this resource",
      type: "number",
      flex: 1,
      editable: false,
    },
    {
      field: "commentsCount",
      headerName: "Number of Discussions",
      description:
        "The total number of discussions on the resources for this resource",
      type: "number",
      flex: 1,
      editable: false,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "dateUploaded",
      headerName: "Date Uploaded",
      description: "The date uploaded for this resource",
      flex: 1,
      align: "right",
      headerAlign: "right",
      valueGetter: (params: GridValueGetterParams) =>
        moment(params.row.dateUploaded).format("YYYY-MM-DD hh:mm A"),
    },
  ];

  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      {uosInfo && (
        <Grid container>
          <Grid item xs={8}>
            <Grid
              container
              alignItems={"flex-end"}
              justifyContent={"flex-start"}
            >
              <Grid xs={3}>
                <Typography variant="h4" component="div">
                  {uosInfo.unitCode}
                </Typography>
                <Rating name="disabled" value={uosInfo.avgRating} disabled />
              </Grid>
              <Grid xs={3}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  // sx={{ justifySelf: "flex-" }}
                >
                  Total discussions: <strong>{uosInfo.commentsCount}</strong>
                </Typography>
              </Grid>
              <Grid xs={3}>
                <Typography variant="subtitle1" component="div">
                  Total resources: <strong>{uosInfo.resourcesCount}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container alignItems={"flex-end"} justifyContent={"flex-end"}>
              <Grid xs={5}>
                <Button
                  variant="contained"
                  color={"secondary"}
                  onClick={handleRatingsModalOpen}
                >
                  Submit Rating
                </Button>
              </Grid>
              <Grid xs={5}>
                <Button variant="contained" color={"secondary"}>
                  Upload Resource
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grow in={true} appear={true}>
        <div style={{ height: "500px" }}>
          <DataGrid
            rows={resources}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick={true}
            getRowId={(row) => {
              return `${row.uosId},${row.resourceId}`; // composite key
            }}
          />
        </div>
      </Grow>

      {/* Ratings Modal */}
      <Dialog
        open={ratingsModal}
        onClose={handleRatingsModalClose}
        fullWidth={true}
      >
        <DialogTitle>Course Rating</DialogTitle>
        <DialogContent>
          <DialogContentText>Rate this course:</DialogContentText>
          <Rating
            name="uosRating"
            value={ratingsValue}
            onChange={(event, newValue) => {
              setRatingsValue(newValue ? newValue : 0);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRatingsModalClose}>Cancel</Button>
          <Button onClick={handleRatingsModalSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default UnitOfStudyView;
