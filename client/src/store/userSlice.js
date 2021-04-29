import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./apiActions"


const slice = createSlice({
    name: "User",
    initialState:{
        CurrentUser: '',
        onError: []

    },
    reducers:{
        setUser: (User, action)=>{
            User.CurrentUser = action.payload.user
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("id", action.payload.id)
        },
        // setError: (User, action)=>{
        //     User.onError = [action.payload.response.data]
            
        // }
    }
})
export const {setUser} = slice.actions
export default slice.reducer

export const loginApi = (data) => apiCallBegan({
    url: "http://localhost:3001/login",
    method: "POST",
    data: data,
    onSuccess: setUser.type,
    // onError: setError.type
    
})
