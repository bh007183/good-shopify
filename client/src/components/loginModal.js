import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { loginApi } from "../store/userSlice";
import Modal from "@material-ui/core/Modal"
import {
  Link
} from "react-router-dom";


export default function LoginModal(props) {
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(loginApi(login));
    props.handleCloseLogin()
  };

  

  return (
    <Modal
    open={props.openLogin}
    onClose={props.handleCloseLogin}
  >
    <div className="loginModal" style={{ contain: "content" }}>
      <br></br>
      <br></br>
      <br></br>
      <form onSubmit={submitForm}>
        <Grid container spacing={2} direction="row">
          <Grid className="center" item xs={12}>
            <input
              onChange={onChange}
              value={login.email}
              name="email"
              placeholder="Email"
            ></input>
          </Grid>
          <Grid className="center" item xs={12}>
            <input
              onChange={onChange}
              value={login.password}
              type="password"
              placeholder="Password"
              name="password"
            ></input>
          </Grid>
          <Grid className="center" item xs={12}>
            <button type="submit">Enter</button>
          </Grid>
        </Grid>
      </form>
      <br></br>
      <Link to="/create" style={{color: "white", fontSize: "10px"}}>Create Account</Link>
    </div>
    </Modal>
  );
}