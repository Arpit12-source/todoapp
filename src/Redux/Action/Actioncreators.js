import axios from "axios";
import * as actionType from "./Action";
export const Add =(value,id,checked,userId)=>{
    
    return{
        type:actionType.Add,
        payload :{
            value : value,
            id:id,
            checked:checked,
            userId:userId
    }

    }
}
export const Remove =(index)=>{
    return{
        type:actionType.Remove,

        index:index
    }
}
export const Removal =(index,id,token)=>{
    console.log(id)
    return dispatch=>{
        dispatch(Remove(index))
        
        axios.delete("https://todonext-fa138-default-rtdb.firebaseio.com/"+id+".json?auth=" +token)
        .then(resp=>console.log(resp))
        .catch(err=>console.log(err))
    }
}
export const checking =(value,id,checked,index,token)=>{
    return dispatch=>{
        dispatch(Checked(index))
        const checkeddata={
            value:value,
            id:id,
            checked:checked
        }
        axios.put("https://todonext-fa138-default-rtdb.firebaseio.com/.json?auth=" +token,checkeddata)
        .then(resp=>console.log(resp))
        .catch(err=>console.log(err))
    }
}
export const settodo =(todos)=>{
    // console.log(todos)
    return{
        type:actionType.settodo,
        todos:todos
    }
}
export const fetchtodos =(token,userId)=>{
    return dispatch=>{
        
        const queryparams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get("https://todonext-fa138-default-rtdb.firebaseio.com/.json"+queryparams)
        .then( res => {
            const fetchedOrders = [];
            for ( let key in res.data ) {
                fetchedOrders.push( {
                    ...res.data[key],
                    id: key
                } );
            }
            dispatch(settodo(fetchedOrders));
        } ).catch(err=>console.log(err))
        
    }
}
export const Addition =(value,id,checked,userId,token)=>{
    return dispatch=>{
        dispatch(Add(value,id,checked,userId))
        const tododata ={
            value:value,
                id:id,
                checked:checked,
                userId:userId
        }
        axios.post("https://todonext-fa138-default-rtdb.firebaseio.com/.json?auth=" + token, tododata)
        .then(resp=>console.log(resp))
        .catch(err=>console.log(err))
    }
}
export const Checked =(index)=>{
    return{
        type:actionType.Checked,

        index:index
    }
}
export const AuthStart =(state,action)=>{
    return{
        type:actionType.AuthStart,

        
    }
}
export const AuthSuccess =(token,userId)=>{
    return{
        type:actionType.AuthSuccess,
        token:token,
        userId:userId
       
    }
}
export const AuthFail =(error)=>{
    return{
        type:actionType.AuthFail,
        error:error
        
    }
}
export const logout =()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("expiresin")
    localStorage.removeItem("userId")
    return {
        type : actionType.Logout,
       
    }
}
export const checkAuthTimeout =(checktime)=>{
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, checktime * 1000);
    };
}
export const Auth =(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(AuthStart())
        const data={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDX4EhcX_gMPkUaJ_34kpHNkZhq5Seu4xg"
        if(!isSignup){
            url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDX4EhcX_gMPkUaJ_34kpHNkZhq5Seu4xg"
        }
        axios.post(url, data)
            .then(response => {
                console.log(response);
                const expirationtime=new Date(new Date().getTime()+response.data.expiresIn*1000)
                localStorage.setItem("token",response.data.idToken)
                localStorage.setItem("expiresin" , expirationtime)
                localStorage.setItem("userId" , response.data.localId)
                dispatch(AuthSuccess(response.data.idToken, response.data.localId));

                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => { 
                console.log(err.response.data.error)
                dispatch(AuthFail(err.response.data.error.message));
            });
    }
    }
    
    export const loginstatus =()=>{
        return dispatch=>{
            const token =localStorage.getItem("token");
            if(!token){
                dispatch(logout());
            }
            else{
                const expirationtime = new Date(localStorage.getItem("expiresin"))
                if(expirationtime<=new Date() ){
                    dispatch(logout());
                }else{
                    const userid = localStorage.getItem("userId")
                    dispatch(AuthSuccess(token,userid))
                    const finaltime=(expirationtime.getTime()-new Date().getTime())/1000
                    dispatch(checkAuthTimeout(finaltime))
                }
            }
        }
    }
