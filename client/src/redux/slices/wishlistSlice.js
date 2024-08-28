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
    }
});

const wishlistReducer = wishlistSlice.reducer;
const wishlistActions = wishlistSlice.actions;

export { wishlistActions, wishlistReducer }; 