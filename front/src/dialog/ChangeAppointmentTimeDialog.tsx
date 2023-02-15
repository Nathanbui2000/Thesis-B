import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../utils/axios-instance";

import { FileUploader } from "react-drag-drop-files";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import cookie from "js-cookie";
import { useUserContext } from "../store/user-context";

export const ChangeAppointmentTimeDialog = () => {
    const userCtx = useUserContext();

    const [UpLoadingDialog, setUpLoadingDialog] = useState(false);
    return (
        <>
        <Button variant="contained" onClick={() => setUpLoadingDialog(true)}>Change Appointment Time</Button>
        <Dialog open={UpLoadingDialog}
                    onClose={() => setUpLoadingDialog(false)}>
            <DialogTitle>
                <span style={{ color: "red" }}>Upload Documentation</span>
            </DialogTitle>
            <DialogContent>
            <label htmlFor="Title">Document Title</label>
                    <br></br>
                    <br></br>
            </DialogContent>
            <DialogActions>
                    <Button onClick={() => setUpLoadingDialog(false)}>Cancel</Button>
                    {/* <Button onClick={() => uploadDocumentation()}
                            autoFocus>Submit</Button> */}
            </DialogActions>
        </Dialog>
        </>
    )

}