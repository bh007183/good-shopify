import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector} from "react-redux";
import { postImage } from "../store/imageSlice";
import {Link} from "react-router-dom"

import Switch from "@material-ui/core/Switch"
import {updateImage} from "../store/imageSlice"



export default function EditPhoto(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const imageData = useSelector(state => state.store.Image.ImageID)

  const [editPhoto, setEditPhoto] = useState({
    url: "",
    title: "",
    category: "",
    public: false,
    id: ""
  });

  useEffect(() => {
    setEditPhoto(imageData)
}, [imageData])

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dc29vpvut",
      uploadPreset: "sm6o0is3",
    },
    (error, result) => {
      if (result.event === "success") {
        console.log(result)
        setEditPhoto({
            ...editPhoto,
            url: result.info.url,
          });

      }
    }
  );
 

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEditPhoto({
      ...editPhoto,
      [name]: value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    await dispatch(updateImage(editPhoto))
    // await dispatch(getPublic())

    
  };

  

  return (
    
    <div className="photoModal" style={{ contain: "content" }}>
      <br></br>
      
      <form onSubmit={submitForm}>
        <Grid container spacing={2} direction="row">
          
          <Grid className="center" item xs={12}>
            <input
              onChange={onChange}
              value={editPhoto.title}
              name="title"
              placeholder="Title"
            ></input>
          </Grid>
          <Grid className="center" item xs={12}>
            <input
              onChange={onChange}
              value={editPhoto.category}
              name="category"
              placeholder="Category"
            ></input>
          </Grid>
          <Grid className="center" item xs={12}>
              <p>Private</p>
          <Switch name="public" checked={editPhoto.public} value={editPhoto.public} onChange={(event) => setEditPhoto({
      ...editPhoto,
      public: event.target.checked,
    })} type="checkbox"/>
    <p>Public</p>
           
          </Grid>
          <Grid className="center" item xs={12}>
            <button type="button" onClick={() => widget.open()}>
             Change Photo
            </button>
          </Grid>
          <Grid className="center" item xs={12}>
           {editPhoto.url === "" ? <></> : <button type="submit" >Submit Changes</button> } 
          </Grid>
          
            
        </Grid>
      </form>
      <br></br>
      <Link to="/yours" style={{color: "white"}}> Back</Link>
    </div>
    
  );
}