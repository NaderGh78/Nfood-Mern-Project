import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const productSlice = createSlice({
    name: "product",
    initialState: {
        productModal: false,
        ProductDetailsModal: false,/*for admin product details modal*/
        isProductCreated: false
    },
    reducers: {

        // show the [new product modal]
        showProductModal(state) {
            state.productModal = true;
        },

        /*====================*/

        // hide the [new product modal]
        hideProductModal(state) {
            state.productModal = false;
        },

        /*====================*/

        // show the [admin product details]
        showProductDetailsModal(state) {
            state.ProductDetailsModal = true;
        },

        /*====================*/

        // hide the [admin product details]
        hideProductDetailsModal(state) {
            state.ProductDetailsModal = false;
        },

        /*====================*/

        // when create product succefully
        setIsproductCreated(state) {
            state.isProductCreated = true;
        },

        /*====================*/

        clearIsproductCreated(state) {
            state.isProductCreated = false;
        }

    }
});

const productActions = productSlice.actions;
const productReducer = productSlice.reducer;
export const {
    showProductModal,
    hideProductModal,
    showProductDetailsModal,
    hideProductDetailsModal,
    setIsproductCreated, clearIsproductCreated
} = productSlice.actions;
export { productReducer, productActions };