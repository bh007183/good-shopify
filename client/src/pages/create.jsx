import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { GridList } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createApi, endErrorMessage, endSuccessMessage } from "../store/userSlice";
import Alerts from "../components/alerts"
import {useSelector} from "react-redux"


export default function CreateAccount() {
  const err = useSelector((state) => state.store.User.onErrorMessage);
  const success = useSelector((state) => state.store.User.onSuccessMessage);
  const dispatch = useDispatch();

  const [create, setCreate] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(event)
    setCreate({
      ...create,
      [name]: value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(createApi(create));
    setTimeout(() => {
      if(err !== ""){
        dispatch(endErrorMessage(""))
      }else{
        dispatch(endSuccessMessage(""))
      }
      
    }, 5000);
  };
  return (
    <>
      <br></br>
      {err || success ? <Alerts/> : <></>}
      <br></br>
      <Grid className="center" direction="row" container>
        <form onSubmit={submitForm}>
          <h6 style={{ color: "white", textAlign: "center" }}>
            All Fields Required
          </h6>
          <Grid container spacing={2} direction="row">
            <Grid className="center" item xs={12}>
              <input
                onChange={onChange}
                value={create.email}
                name="email"
                placeholder="Email"
              ></input>
            </Grid>
            <Grid className="center" item xs={12}>
              <input
                onChange={onChange}
                value={create.password}
                type="password"
                placeholder="Password"
                name="password"
              ></input>
            </Grid>
            <Grid className="center" item xs={12}>
              <input
                onChange={onChange}
                value={create.verifyPassword}
                type="password"
                placeholder="Verify Password"
                name="verifyPassword"
              ></input>
            </Grid>
            <Grid className="center" item xs={12}>
              {create.verifyPassword === create.password &&
              create.verifyPassword !== "" ? (
                <button type="submit">Create Account</button>
              ) : (
                <button disabled={true} type="submit">Create Account</button>
              )}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
