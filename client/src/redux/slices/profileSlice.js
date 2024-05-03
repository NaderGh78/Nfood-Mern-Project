import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        profiles: [],
        show: false,//this for update user modal 
        isFetching: false,
        error: false,
        isProfilePhotoChanged: false,
        isPasswordUpdated: false
    },
    reducers: {

        // update user profile
        setUpdateProfile(state, action) {
            state.profile = action.payload;
        },

        /*=================*/

        // change profile photo
        setChangeProfilePhoto(state, action) {
            state.profile.profilePhoto = action.payload;
        },

        /*=================*/

        // check if profile photo already changed,to shwo a spinner on image
        setIsProfilePhotoChanged(state) {
            state.isProfilePhotoChanged = true;
        },

        clearIsProfilePhotoChanged(state) {
            state.isProfilePhotoChanged = false;
        },

        /*=================*/

        // check if the password updated or not in order tos show confirm popup msg
        setIsPasswordUpdated(state) {
            state.isPasswordUpdated = true;
        },

        clearIsPasswordUpdated(state) {
            state.isPasswordUpdated = false;
        },

        /*=================*/

        setUpdatePassword(state, action) {
            state.profile.password = action.payload;
        },

        /*=================*/

        setShowModal(state) {
            state.show = true;
        },

        setHideModal(state) {
            state.show = false;
        }

    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;
export const { setShowModal, setHideModal } = profileSlice.actions;
export { profileActions, profileReducer };