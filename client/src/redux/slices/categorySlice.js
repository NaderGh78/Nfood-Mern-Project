import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const categorySlice = createSlice({
    name: "category",
    initialState: {
        showNewCatModal: false,
        isCatCreated: false
    },
    reducers: {

        // show the [new category modal]
        setShowNewCatModal(state) {
            state.showNewCatModal = true;
        },

        /*====================*/

        // hide the [new category modal]
        setHideNewCatModal(state) {
            state.showNewCatModal = false;
        },

        /*====================*/

        // check if the category already created
        setIsCatCreated(state) {
            state.isCatCreated = true;
        },

        /*====================*/

        // hide the [new category modal]
        clearIsCatCreated(state) {
            state.isCatCreated = false;
        }

    }
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;
export const {
    setShowNewCatModal,
    setHideNewCatModal,
    setIsCatCreated,
    clearIsCatCreated } = categorySlice.actions;
export { categoryActions, categoryReducer }