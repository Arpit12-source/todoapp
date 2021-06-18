import React , {Component} from 'react';
import './App.css';
import Toolbar from "./Toolbar/Toolbar";
import {connect} from "react-redux";
import {Switch, Route,withRouter} from "react-router-dom";
import Add from "./ADD/Add";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Logout from "./Logout/Logout";
import * as action from "../src/Redux/Action/Actioncreators";

class App extends Component{
 
  componentDidMount(){
  this.props.onrecheckauth()
}

  render(){
  return (
    <div className="App">
    <Toolbar/>
    <Switch>
    <Route exact path="/" component={Add}/>
    <Route path="/login"  component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/logout" component={Logout}/>
    </Switch>
  </div>
  );}
}
const mapDispatchToProps=(dispatch)=>{
 return{
   onrecheckauth:()=>dispatch(action.loginstatus())
 }
}
export default withRouter(connect(null,mapDispatchToProps)(App));
