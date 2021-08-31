export const CODReducer=(state=false,action)=>{//state is user in redux extintion
    switch(action.type){
        case "COD":
            return action.payload;
        default:
            return state;
    }
}


//cash on delivery