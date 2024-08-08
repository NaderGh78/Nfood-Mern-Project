import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        orderId: null,
        confirm: null,
    },

    reducers: {

        // get order id
        setOrderId(state, action) {
            state.orderId = action.payload;
        },

        // confirm checkout
        setConfirmCheckout(state, action) {
            state.confirm = action.payload;
        }

    }

});

const checkoutActions = checkoutSlice.actions;
const checkoutReducer = checkoutSlice.reducer;

export { checkoutActions, checkoutReducer }; 