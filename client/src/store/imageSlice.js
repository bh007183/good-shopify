import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActions"


const slice = createSlice({
    name: "Image",
    initialState:{
        publicImage:[],
        yourImage:[]


    },
    reducers:{
        setImage: (Image, action)=>{
            Image.publicImage = action.payload
        },

        yourImage: (Image, action)=>{
            Image.yourImage = action.payload
            console.log(action)
        }
    }
})
export const {setImage, yourImage} = slice.actions
export default slice.reducer

export const getPublic = () => apiCallBegan({
    url: "http://localhost:3001/api/getpublic",
    onSuccess: setImage.type

})
export const postImage = (data) => apiCallBegan({
    url: "http://localhost:3001/api/singlepost",
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    data: data,
    method: "POST",
    

})
export const deleteImage = (id) => apiCallBegan({
    url: `http://localhost:3001/api/delete/${id}`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "DELETE",
    onSuccess: setImage.type
    
})

export const getYourPhotos = () => apiCallBegan({
    url: `http://localhost:3001/api/yourphotos`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "GET",
    onSuccess: setImage.type
    
})