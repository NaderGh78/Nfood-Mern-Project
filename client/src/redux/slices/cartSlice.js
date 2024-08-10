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

            console.log('Received New Item:', newItem);

            const existingIndex = state.userCart.findIndex(item => item.product?._id.toString() === newItem.productId?.toString());

            if (existingIndex > -1) {

                state.userCart[existingIndex].quantity = newItem.quantity;

                state.userCart[existingIndex].price = parseFloat(newItem.price);

                // console.log('Updated Existing Item:', state.userCart[existingIndex]);
            } else {

                state.userCart.push({
                    ...newItem,
                    quantity: newItem.quantity,
                    price: parseFloat(newItem.price)
                });

                // console.log('Added New Item:', state.userCart[state.userCart.length - 1]);

            }

            state.totalCart = state.userCart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
            // console.log('Updated Cart State:', state);

        },

        /*====================*/

        removeSingleItem: (state, action) => {

            const itemId = action.payload;

            state.userCart = state.userCart.filter(item => item.product?._id !== itemId);

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

            // console.log(state.totalCart)
        }

    }
});

const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartActions, cartReducer }; 