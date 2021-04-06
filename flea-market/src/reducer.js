export const initialState = {
    basket: [],
    user: null,
};


export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => Number(item.price) + Number(amount), 0);


const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return{
                ...state,
                basket: [...state.basket, action.item],
            };
        case "EMPTY_BASKET":
            return{
                ...state,
                basket: [],
            }
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.p_id === action.p_id
            );

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);

            } else{
                console.warn('cant remove product')
            }
            return{
                ...state,
                basket: newBasket,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }

};

export default reducer;
