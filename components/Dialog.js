import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function AlertDialog({
  message,
  open,
  error,
  deleteConfim,
  setDeleteConfirm,
  confirmDeleteHandler,
  setApiError,
}) {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            style={{ color: "orange" }}
            id="alert-dialog-description"
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!error ? (
            <>
              {" "}
              <Button
                style={{ color: "white", backgroundColor: "orange" }}
                onClick={confirmDeleteHandler}
              >
                Yes
              </Button>
              <Button
                style={{ color: "white", backgroundColor: "orange" }}
                onClick={() => setDeleteConfirm(false)}
              >
                No
              </Button>
            </>
          ) : (
            <Button
              style={{ color: "white", backgroundColor: "orange" }}
              onClick={() => setApiError(false)}
            >
              OK
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
