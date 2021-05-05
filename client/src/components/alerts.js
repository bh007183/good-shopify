import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function Alerts() {
    const err = useSelector((state) => state.store.User.onErrorMessage);
const success = useSelector((state) => state.store.User.onSuccessMessage);
  const classes = useStyles();

  return (
    <>
      {err.message ? (
        <div className={classes.root}>
          <Alert id="Alert" severity="error">
            <AlertTitle>Error</AlertTitle>
            {err.message}
          </Alert>
        </div>
      ) : success ? (
        <div className={classes.root}>
          <Alert id="Alert" severity="success">
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
