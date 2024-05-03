import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: localStorage.getItem("currentUser") ?
            JSON.parse(localStorage.getItem("currentUser")) : null,
        registerMessage: null,
        loading: false
    },
    reducers: {

        login(state, action) {
            state.currentUser = action.payload;
        },

        logout(state) {
            state.currentUser = null;
        },

        register(state, action) {
            state.registerMessage = action.payload;
        },

        setUserPhoto(state, action) {
            state.currentUser.profilePhoto = action.payload;
        },

        // update pass
        setUserPassword(state, action) {
            state.currentUser.password = action.payload;
        },

        setUsername(state, action) {
            state.currentUser.username = action.payload;
        },

        setUserEmail(state, action) {
            state.currentUser.email = action.payload;
        },

        setLoading(state) {
            state.loading = true;
        },

        clearLoading(state) {
            state.loading = false;
        }

    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer }