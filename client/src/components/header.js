import React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import LoginModal from "./loginModal";
import {Link} from "react-router-dom"
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import PhotoModal from "./photoModal"
// import {getYourPhotos} from "../store/imageSlice"
import {logOut} from "../store/userSlice"
import {getPublic} from "../store/imageSlice"

export default function Header() {
  const dispatch = useDispatch()
  const [openLogin, SetOpenLogin] = React.useState(false);
  const [openPhoto, setOpenPhoto] = React.useState(false)

  const user = useSelector((state) => state.store.User.CurrentUser);
  console.log(user);

  const handleOpenLogin = () => {
    SetOpenLogin(true);
  };

  const handleCloseLogin = () => {
    SetOpenLogin(false);
  };

  ////////////////
  const handleOpenPhoto= () => {
    setOpenPhoto(true);
  };

  const handleClosePhoto= () => {
    setOpenPhoto(false);
  };
 
  const clearUser = async() => {
    await dispatch(logOut(""))
    await localStorage.clear()
  }



  return (
    <>
      <Toolbar className="toolBar">
        <Typography id="header" variant="h6">
          Welcome to the Image Database!
        </Typography>
        {!user ? (
          <button onClick={handleOpenLogin}>Sign In</button>
        ) : (<>
          
          <FormControl>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              
            >
              <MenuItem value="" disabled>
                {user}
              </MenuItem>
              <MenuItem onClick={handleOpenPhoto}>Add Photo</MenuItem>
              <Link to="/yours"><MenuItem >View Your Photos</MenuItem></Link>
              <Link to="/"><MenuItem >View Public Photos</MenuItem></Link>
              <MenuItem onClick={clearUser}>Logout</MenuItem>
              
              
            </Select>
            <FormHelperText>{user}</FormHelperText>
            </FormControl>
            </>
        )}
      </Toolbar>
      <PhotoModal openPhoto={openPhoto} handleClosePhoto={handleClosePhoto}/>
      <LoginModal openLogin={openLogin} handleCloseLogin={handleCloseLogin} />
    </>
  );
}
