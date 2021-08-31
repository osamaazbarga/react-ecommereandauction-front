export const drawerReducer=(state=false,action)=>{//state is user in redux extintion
    switch(action.type){
        case "SET_VISABLE":
            return action.payload;
        default:
            return state;
    }
}