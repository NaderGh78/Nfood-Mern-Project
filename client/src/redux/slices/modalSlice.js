import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        showModal: false,
        showCartModal: false
    },
    reducers: {

        // show the [login modal]
        setShowRgisterModal(state) {
            state.showModal = true;
        },

        // hide the [login modal]
        setHideRgisterModal(state) {
            state.showModal = false;
        },

        /*=====================*/

        // show the [cart modal]
        setShowModal(state) {
            state.showCartModal = true;
        },

        // hide the [cart modal]
        setHideModal(state) {
            state.showCartModal = false;
        }
    }
});

/*===========================================*/

const modalReducer = modalSlice.reducer;
const modalActions = modalSlice.actions;
export const {
    setShowRgisterModal,
    setHideRgisterModal,
    setShowModal,
    setHideModal } = modalSlice.actions;
export { modalActions, modalReducer }