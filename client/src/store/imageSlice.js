import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "Image",
  initialState: {
    publicImage: [],
    yourImage: [],
    ImageID: {
      url: "",
      title: "",
      category: "",
      public: "",
      id: ""
    },
  },
  reducers: {
    setImage: (Image, action) => {
      Image.publicImage = action.payload;
    },

    yourImage: (Image, action) => {
      Image.yourImage = action.payload;
      console.log(action);
    },

    editImageResponse: (Image, action) => {
      Image.ImageID.url = action.payload.url;
      Image.ImageID.title = action.payload.title;
      Image.ImageID.category = action.payload.category;
      Image.ImageID.public = action.payload.public;
      Image.ImageID.id = action.payload.id;
    },
  },
});
export const { setImage, yourImage, editImageResponse } = slice.actions;
export default slice.reducer;

export const getPublic = () =>
  apiCallBegan({
    url: "http://localhost:3001/api/getpublic",
    onSuccess: setImage.type,
  });
export const postImage = (data) =>
  apiCallBegan({
    url: "http://localhost:3001/api/singlepost",
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    data: data,
    method: "POST",
  });
export const deleteImage = (id) =>
  apiCallBegan({
    url: `http://localhost:3001/api/delete/${id}`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "DELETE",
    onSuccess: setImage.type,
  });

export const getYourPhotos = () =>
  apiCallBegan({
    url: `http://localhost:3001/api/yourphotos`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: setImage.type,
  });

export const getEditImage = (id) =>
  apiCallBegan({
    url: `http://localhost:3001/api/edit/${id}`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "GET",
    onSuccess: editImageResponse.type,
  });

export const updateImage = (data) =>
  apiCallBegan({
    url: `http://localhost:3001/api/updateImage`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "PUT",
    data: data,
    onSuccess: window.location.href = "/"
  });
