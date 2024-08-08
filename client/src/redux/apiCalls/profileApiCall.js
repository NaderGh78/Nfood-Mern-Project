import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import { request } from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Update Profile (Account)
export function updateProfile(userId, profile) {

  return async (dispatch, getState) => {

    try {

      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.currentUser.token,
          },
        }
      );

      dispatch(profileActions.setUpdateProfile(data.updateUser));

      dispatch(authActions.setUsername(data.updateUser.username));

      dispatch(authActions.setUserEmail(data.updateUser.email));

      // modify the user in local storage with new username
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      currentUser.username = data?.updateUser.username;

      currentUser.email = data?.updateUser.email;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      toast.success(data?.message);

    } catch (error) {

      toast.error(error?.response?.data?.message);

    }

  }
}

/*===========================================*/

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {

  return async (dispatch, getState) => {

    try {

      dispatch(profileActions.setIsProfilePhotoChanged());

      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.currentUser.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(authActions.setUserPhoto(data?.profilePhoto));

      toast.success(data?.message);

      // in order to save the new user photo in currentUser,and show directly in all pages
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      currentUser.profilePhoto = data?.profilePhoto;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // remove the loader
      dispatch(profileActions.clearIsProfilePhotoChanged());

    } catch (error) {

      toast.error(error?.response?.data?.message);

      // // remove the loader
      dispatch(profileActions.clearIsProfilePhotoChanged());

    }

  }
}

/*===========================================*/

// update Profile Password
export function updateProfilePassword(userId, newPass) {

  return async (dispatch, getState) => {

    try {

      dispatch(profileActions.clearIsPasswordUpdated());

      const { data } = await request.put(
        `/api/users/profile/update-password/${userId}`,
        newPass,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.currentUser.token
          },
        }
      );

      dispatch(profileActions.setIsPasswordUpdated());

      // back the isPasswordUpdate to initial value after 50 milsecond
      setTimeout(() => dispatch(profileActions.clearIsPasswordUpdated()), 50);

    } catch (error) {

      toast.error(error?.response?.data?.message);

      dispatch(profileActions.clearIsPasswordUpdated());

    }

  }
} 