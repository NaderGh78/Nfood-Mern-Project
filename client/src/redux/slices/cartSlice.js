import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        userCart: [],
        cartLoading: false,
        totalCart: 0,
        isCartEmpty: false,
        isCartDeleted: false,
    },
    reducers: {

        addItemToCart(state, action) {

            const newItem = action.payload;

            const existingIndex = state.userCart.findIndex(item => item.product._id === newItem.product._id);

            if (existingIndex > -1) {

                // Update quantity if item already exists
                state.userCart[existingIndex].quantity += newItem.quantity;

            } else {

                // Add new item
                state.userCart.push(newItem);

            }
        },

        /*====================*/

        removeSingleItem: (state, action) => {

            const itemId = action.payload;

            state.userCart = state.userCart.filter(item => item.product._id !== itemId);

            state.totalCart = state.userCart.reduce((total, item) => total + item.price, 0);

        },

        /*====================*/

        // cart loading
        setCartLoading: (state) => {
            state.cartLoading = true;
        },
        clearCartLoading: (state) => {
            state.cartLoading = false;
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
            state.totalCart = 0;
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