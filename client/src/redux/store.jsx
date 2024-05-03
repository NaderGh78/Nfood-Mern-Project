import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { cartReducer } from "./slices/cartSlice";
import { productReducer } from "./slices/productSlice";
import { themeReducer } from "./slices/themeSlice";
import { modalReducer } from "./slices/modalSlice";
import { categoryReducer } from "./slices/categorySlice";
import { customerReducer } from "./slices/customerSlice";
import { profileReducer } from "./slices/profileSlice";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        theme: themeReducer,
        modal: modalReducer,
        category: categoryReducer,
        customer: customerReducer,
        profile: profileReducer
    }
});

export default store;