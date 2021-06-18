import React, { Component } from "react";
import * as action from "../Redux/Action/Actioncreators";
import { Redirect } from "react-router";
import {connect} from "react-redux";
class Logout extends Component{
    componentDidMount(){
        this.props.tologout();
    }
    render(){

        return(
            <Redirect to="/login"/>
        )
    }
}
const mapDisptachToProps=disptach=>{
    return{
        tologout:()=>disptach(action.logout())
    }
}
export default connect(null,mapDisptachToProps)(Logout);