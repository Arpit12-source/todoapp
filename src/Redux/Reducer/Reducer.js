
import * as actionType from "../Action/Action";
const initialState={
    todo :[],
 
    
}

const Reducer =(state=initialState,action)=>{
    switch (action.type) {
        case actionType.Add:
            console.log(action)
            return {
                
                todo:[...state.todo,{...action.payload}]
                 
            }
            
        case actionType.Remove:
             const updated=[...state.todo] 
             
            updated.splice(action.index,1);
             
             return{
                
                 todo:[...updated]
             }

        case actionType.Checked:
            const wellupdated =[...state.todo]
        
            wellupdated[action.index]={
                ...wellupdated[action.index],
                checked:!wellupdated[action.index].checked
            }
            return{
               todo:[...wellupdated]
            }
        case actionType.settodo:
            const veryupdated = action.todos
            console.log(veryupdated)
            return{
                todo:[...veryupdated]
            }

        default:
            return state;
    }
}
export default Reducer;