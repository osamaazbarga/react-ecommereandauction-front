export const userReducer=(state=null,action)=>{//state is user in redux extintion
    switch(action.type){
        case "LOGGED_IN_USER":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
}
