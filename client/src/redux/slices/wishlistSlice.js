import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        userWishlist: []
    },
    reducers: {

        setuserWishlist(state, action) {
            state.userWishlist = action.payload;
        },

        clearWishlist(state) {
            state.userWishlist = [];
        }

    }
});

const wishlistReducer = wishlistSlice.reducer;
const wishlistActions = wishlistSlice.actions;

export const { clearWishlist } = wishlistSlice.actions;

export { wishlistActions, wishlistReducer }; 