import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        userCart: [],
        cartLoading: false,
        totalCart: 0,
        isCartEmpty: false,
        isCartDeleted: false,
    },
    reducers: {

        addItemToCart(state, action) {
            return [...state, action.payload];
        },

        /*====================*/

        // get user cart
        setUserCarts(state, action) {
            state.userCart = action.payload;
        },

        /*====================*/

        // check is single cart deleted
        setIsCartDeleted: (state) => {
            state.isCartDeleted = false;
        },
        clearIsCartDeleted: (state) => {
            state.isCartDeleted = true;
        },

        /*====================*/

        // empty cart
        clearCart: (state) => {
            state.userCart = [];
        },

        // check is cart already empty
        setIsCartEmpty: (state) => {
            state.isCartEmpty = false;
        },
        clearIsCartEmpty: (state) => {
            state.isCartEmpty = true;
        },

        /*====================*/

        // get total
        getCartTotal(state, action) {
            state.totalCart = action.payload;
        }

    }
});

const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartActions, cartReducer }; 