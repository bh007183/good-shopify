import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActions"
import store from "./store"



const slice = createSlice({
    name: "User",
    initialState:{
        CurrentUser: '',
        CurrentUserId: "",
        onErrorMessage: "",
        onSuccessMessage: ""

    },
    reducers:{
        setUser: (User, action)=>{
            User.CurrentUser = action.payload.user
            User.CurrentUserId = action.payload.id
            localStorage.setItem("token", action.payload.token)
            
        },
        logOut: (User, action)=>{
            
            User.CurrentUser = action.payload;
            User.CurrentUserId = action.payload;
        },

        setSuccessMessage: (User, action) => {
            User.onSuccessMessage = action.payload
        },

        setErrorMessage: (User, action) => {
        User.onErrorMessage = action.payload
        
        },
        endErrorMessage:  (User, action) => {
            
            User.onErrorMessage = action.payload
            },
        endSuccessMessage:  (User, action) => {
            
            User.onSuccessMessage = action.payload
            }
            
        }

    
})
export const {setUser, logOut, setSuccessMessage, setErrorMessage, endErrorMessage, endSuccessMessage} = slice.actions
export default slice.reducer

// Below Routes Utilize middleare/api.js//

// route for logging in//

export const loginApi = (data) => apiCallBegan({
    url: "https://img-direct-shop.herokuapp.com/login",
    method: "POST",
    data: data,
    onSuccess: setUser.type,
    // onError: setError.type
    
})

//route for creating account//
export const createApi = (data) => apiCallBegan({
    url: "https://img-direct-shop.herokuapp.com/api/createAccount",
    method: "POST",
    data: data,
    onSuccess: setSuccessMessage.type,
    onError: setErrorMessage.type
    
})

//route for deleting account and associated photos//
export const deleteAccount = (id) => apiCallBegan({
    url: `https://img-direct-shop.herokuapp.com/api/delete/user/${id}`,
    headers: { authorization: "Bearer: " + localStorage.getItem("token") },
    method: "Delete",
    onSuccess: window.location.href = "/",
    // onError: setError.type
    
})
