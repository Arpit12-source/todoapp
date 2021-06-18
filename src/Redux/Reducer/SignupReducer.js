import Utilityfunction from "../../UI/Utilityfunction";
import * as actionType from "../Action/Action";


const initialState={
    token: "",
    loading:"",
    userId:"",
    error:"",
    
}
const Authstart=(state , action)=>{
    return Utilityfunction(state,{loading : true})}
const Authsuccess =(state, action)=>{
   return  Utilityfunction(state,{token:action.token,userId:action.userId,loading : false,error :null})
}
const Authfail=(state,action)=>{
    return Utilityfunction(state,{error:action.error,loading:false})
}
const logout=(state,action)=>{
   return Utilityfunction(state,{token:null,userId:null})
}
const SignupReducer=(state=initialState,action)=>{
    switch(action.type){
       case actionType.AuthStart:return Authstart(state,action);
       case actionType.AuthSuccess:return Authsuccess(state,action);
       case actionType.AuthFail:return Authfail(state,action);
       case actionType.Logout : return logout(state,action);
        default :
        return state;
    }
}
export default SignupReducer ;