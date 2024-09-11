import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:localStorage.getItem('adminToken')?true:false
}

const adminAuthSlice=createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        adminLoginSuccess:(state,action)=>{
            localStorage.setItem('adminToken',action.payload.token)
            state.isLoggedIn=true
        },
        adminLoggout:(state)=>{
             localStorage.removeItem('adminToken')
             state.isLoggedIn=false

        },
        signOut: (state) => {
            
            state.currentUser = null
            localStorage.removeItem('user')
           

        }
    }
})

export const {adminLoggout,adminLoginSuccess,signOut} =adminAuthSlice.actions
export default adminAuthSlice.reducer