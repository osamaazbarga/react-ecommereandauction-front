export const searchReducer=(state={text:''},action)=>{//state is user in redux extintion
    switch(action.type){
        case "SEARCH_QUERY":
            return {...state,...action.payload};
        default:
            return state;
    }
}
