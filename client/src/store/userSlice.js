import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActions"


const slice = createSlice({
    name: "User",
    initialState:{
        CurrentUser: '',
        CurrentUserId: "",
         onError: []

    },
    reducers:{
        setUser: (User, action)=>{
            User.CurrentUser = action.payload.user
            User.CurrentUserId = action.payload.id
            localStorage.setItem("token", action.payload.token)
            
        },
        logOut: (User, action)=>{
            console.log(action)
            User.CurrentUser = action.payload;
            User.CurrentUserId = action.payload;
            
        }
    }
})
export const {setUser, logOut} = slice.actions
export default slice.reducer

export const loginApi = (data) => apiCallBegan({
    url: "http://localhost:3001/login",
    method: "POST",
    data: data,
    onSuccess: setUser.type,
    // onError: setError.type
    
})
export const createApi = (data) => apiCallBegan({
    url: "http://localhost:3001/api/createAccount",
    method: "POST",
    data: data,
    onSuccess: window.location.href = "/",
    // onError: setError.type
    
})
