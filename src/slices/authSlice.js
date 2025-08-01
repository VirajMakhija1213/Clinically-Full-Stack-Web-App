import { createSlice } from "@reduxjs/toolkit";
const initialState={
    signupData:null,
    loading:false,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    accountType:localStorage.getItem("accountType")?JSON.parse(localStorage.getItem("accountType")):null,
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
}
const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value){
            state.signupData=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setToken(state,value){
            state.token=value.payload
        },
        setAccountType(state,value){
            state.accountType=value.payload
        },
        setUser(state,value){
            state.user=value.payload
        }
    }
})
export const {setSignupData,setLoading,setToken,setAccountType,setUser}=authSlice.actions;
export default authSlice.reducer;