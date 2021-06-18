import React, { Component } from 'react'
import {NavLink} from "react-router-dom";
import {connect } from "react-redux";
import "./Toolbar.css";

class Toolbar extends Component{
    render(){
    return (
        <nav className="navlinks">
            <ul className="navlinks__ul">
                <li className="navlinks__li">
                <NavLink exact to="/"  activeStyle={{
                    fontWeight: "bold",
                    color: "black"
                  }}>ADD</NavLink>
                  </li>
                
                <li className="navlinks__li">
                <NavLink to="/signup"   activeStyle={{
                    fontWeight: "bold",
                    color: "black"
                  }}>Signup</NavLink>
                  </li>
                {this.props.token?<li className="navlinks__li">
                <NavLink to="/logout" activeStyle={{
                    fontWeight: "bold",
                    color: "black"
                  }}>Logout</NavLink>
                  </li>:<li className="navlinks__li">
                  <NavLink to="/login" activeStyle={{
                    fontWeight: "bold",
                    color: "black"
                  }}>Login</NavLink>
                  </li>}
            </ul>
        </nav>
    )}
}
const mapStateToProps=(state)=>{
    return{
        token : state.Login.token
    }
}
export default connect(mapStateToProps)(Toolbar);