import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActions"


const slice = createSlice({
    name: "Image",
    initialState:{
        publicImage:[],
        addImage:[]


    },
    reducers:{
        setImage: (Image, action)=>{
            Image.publicImage = action.payload
        },

        // addImage: (Image, action)=>{
        //     Image.addImage.push(action.payload)
        //     console.log(action)
        // }
    }
})
export const {setImage, addImage} = slice.actions
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
    onSuccess: setImage.type

})
export const deleteImage = (id) => apiCallBegan({
    url: `http://localhost:3001/api/delete/:${id}`,
    headers: {authorization: "Bearer: " + localStorage.getItem("token")},
    method: "Delete",
    onSuccess: setImage.type
})