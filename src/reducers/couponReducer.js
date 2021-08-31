export const couponReducer=(state=false,action)=>{//state is user in redux extintion
    switch(action.type){
        case "COUPON_APPLIED":
            return action.payload;
        default:
            return state;
    }
}
