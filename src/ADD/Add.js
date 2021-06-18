import React ,{Component} from 'react';
import {connect} from "react-redux";
import * as Action from "../Redux/Action/Actioncreators";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import "./Add.css"
import { IconButton } from '@material-ui/core';

class Add extends Component {
state={
    todo:"",
    id:Math.floor(Math.random()*100),
    checked: false,
    empty :true
}
 onchangeHandler=(event)=>{
     console.log(event.target.value)
    this.setState({todo:event.target.value,empty:false})
}
componentDidMount(){
    this.props.onLoad(this.props.token,this.props.userId)
}

onSubmitHandler=(event)=>{
    event.preventDefault();
    
    this.props.onchange(this.state.todo,this.state.id,this.state.checked,this.props.userId,this.props.token)
    this.setState({todo:"",id:Math.floor(Math.random()*100),checked:false,empty:true})
    
}


render(){
    const card=this.props.todo
    .map((resp,index)=><li className="list" key={index}>
    <div className="first">{resp.value}</div>
    <IconButton>
    <CheckCircleRoundedIcon onClick={()=>this.props.onchecked(resp.value,resp.id,this.props.todo[index].checked,index,this.props.token)} className={resp.checked?"checked":"notchecked"}/>
    </IconButton>
    <IconButton>
    <DeleteIcon onClick={ ()=>this.props.ondelete(index,this.props.todo[index].id,this.props.token)} className="two">delete</DeleteIcon>
    </IconButton>
    </li>)
    return (
        <div className="add">
            <form className="add__form" onSubmit={this.onSubmitHandler}>
                <input className="add__input" onChange={this.onchangeHandler} value={this.state.todo} placeholder="Add your todo"/>
                <button type="submit" className="add__button" disabled={this.state.empty }>ADD</button>
            </form>
            <div className="card">
            <ul> {card}</ul>
               
            </div>
        </div>
    )
}
}
const mapStateToProps=(state)=>{
   
    return{
        todo : state.add.todo,
        checked:state.add.checked,
        userId :state.Login.userId,
        token :state.Login.token,
        error:state.Login.error

    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        onchange : (value,id,checked,userId,token)=>dispatch(Action.Addition(value,id,checked,userId,token)),
      
        ondelete : (index,id,token)=>dispatch(Action.Removal(index,id,token)),
        onchecked : (value,id,checked,index,token)=>dispatch(Action.checking(value,id,checked,index,token)),
        onLoad : (token,userId)=>dispatch(Action.fetchtodos(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Add);
