import React, { useEffect } from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { deleteImage } from "../store/imageSlice";
import { Link } from "react-router-dom";
import { getEditImage } from "../store/imageSlice";
import { getYourPhotos } from "../store/imageSlice";

export default function YourPhotos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getYourPhotos());
  }, []);

  const myImages = useSelector((state) => state.store.Image.yourImage);
  const currentUserId = useSelector((state) => state.store.User.CurrentUserId);

  const handleDelete = async (event) => {
    await dispatch(deleteImage(event.target.value));

    await dispatch(getYourPhotos());
  };

  const editImage = async (event) => {
    dispatch(getEditImage(event.target.value));
  };

  return (
    <Grid container spacing={2} direction="row">
      {myImages.length >= 1 ? (
        myImages.map((image, index) => (
          <Grid key={index} item xs={6} sm={4} md={3}>
            <div className="imgContainer">
              {image.UserId === currentUserId ? (
                <button
                  value={image.id}
                  onClick={handleDelete}
                  className="deleteButton"
                >
                  Remove Your Photo
                </button>
              ) : (
                <></>
              )}
              <img className="image" src={image.url} alt={image.title} />
              {image.UserId === currentUserId ? (
                <Link to="/edit">
                  <button
                    onClick={editImage}
                    value={image.id}
                    className="deleteButton"
                  >
                    Edit Your Photo
                  </button>{" "}
                </Link>
              ) : (
                <></>
              )}
            </div>
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
}
