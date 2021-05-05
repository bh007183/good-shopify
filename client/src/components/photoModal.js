import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch} from "react-redux";
import { postImage } from "../store/imageSlice";
import Modal from "@material-ui/core/Modal"
import Switch from "@material-ui/core/Switch"
import {getPublic} from "../store/imageSlice"
import {getYourPhotos} from "../store/imageSlice"


export default function PhotoModal(props) {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState({
    url: "",
    title: "",
    category: "",
    public: "false",
  });

// cloudinary widget unsecured
  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dc29vpvut",
      uploadPreset: "sm6o0is3",
    },
    (error, result) => {
      if (result.event === "success") {
        console.log(result)
        setPhoto({
            ...photo,
            url: result.info.url,
          });

      }
    }
  );
 
// form change handler and state update
  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPhoto({
      ...photo,
      [name]: value,
    });
  };

  // submit form for adding photo
  const submitForm = async (event) => {
    event.preventDefault();
    await dispatch(postImage(photo))
    if(window.location.pathname === "/"){
      await dispatch(getPublic())
    }else{
      dispatch(getYourPhotos())
    }
    
    props.handleClosePhoto()

    
  };

  

  return (
    <Modal
    open={props.openPhoto}
    onClose={props.handleClosePhoto}
  >
    <div className="photoModal" style={{ contain: "content" }}>
      <br></br>
      
      <form onSubmit={submitForm}>
        <Grid container spacing={2} direction="row">
          
          <Grid className="center" item xs={12}>
            <input
              onChange={onChange}
              value={photo.title}
              name="title"
              placeholder="Title"
            ></input>
          </Grid>
          <Grid className="center" item xs={12}>
            <input
              onChange={onChange}
              value={photo.category}
              name="category"
              placeholder="Category"
            ></input>
          </Grid>
          <Grid className="center" item xs={12}>
              <p>Private</p>
          <Switch name="public" value={photo.public} onChange={(event) => setPhoto({
      ...photo,
      public: event.target.checked,
    })} type="checkbox"/>
    <p>Public</p>
           
          </Grid>
          <Grid className="center" item xs={12}>
            <button type="button" onClick={() => widget.open()}>
             Add Photo
            </button>
          </Grid>
          <Grid className="center" item xs={12}>
           {photo.url === "" ? <></> : <button type="submit" >Enter</button>  } 
          </Grid>
        </Grid>
      </form>
    </div>
    </Modal>
  );
}