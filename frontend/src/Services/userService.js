import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "../constants/constant";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const response = await axios.post(
      `${API_URL}/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response, "login user");
    if (response.status === 200) {
      Cookies.set("token", response.data.token, { expires: 1 });
    }

    dispatch({
      type: "loginSuccess",
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    await axios.get(`${API_URL}/api/v1/logout`);
    Cookies.remove("token");
    dispatch({
      type: "logoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const token = Cookies.get("token");
    // console.log(token, "token load user");

    const response = await axios.get(`${API_URL}/api/v1/profile/myProfile`, {
      headers: {
        Authorization: token, // Include the token in the Authorization header
        "Content-Type": "application/json", // Optional: Set the content type
      },
    });

    // console.log(response.data.user);
    dispatch({
      type: "loadUserSuccess",
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUserRequest",
      });
      const token = Cookies.get("token");
      const response = await axios.get(
        `${API_URL}/api/v1/all/usersProfile?name=${name}`,
        {
          headers: {
            Authorization: token, // Include the token in the Authorization header
            "Content-Type": "application/json", // Optional: Set the content type
          },
        }
      );

      dispatch({
        type: "allUserSuccess",
        payload: response.data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUserFailure",
        payload: error.response.data.message,
      });
    }
  };

export const registerUser =
  (avatar, name, location, email, password, bio) => async (dispatch) => {
    try {
      dispatch({
        type: "registerRequest",
      });

      const response = await axios.post(
        `${API_URL}/api/v1/register`,
        {
          avatar,
          name,
          location,
          email,
          password,
          bio,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "registerSuccess",
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: "registerFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateUserProfile =
  (name, email, avatar, bio) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });

      const token = Cookies.get("token");
      const response = await axios.put(
        `${API_URL}/api/v1/update/profile`,
        {
          name,
          email,
          avatar,
          bio,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      dispatch({
        type: "updateProfileSuccess",
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const token = Cookies.get("token");
      const response = await axios.put(
        `${API_URL}/api/v1/update/password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const token = Cookies.get("token");
    const response = await axios.delete(`${API_URL}/api/v1/delete/profile`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "deleteProfileSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgetPasswordRequest",
    });

    const response = await axios.post(
      `${API_URL}/api/v1/forget/password`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "forgetPasswordSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const response = await axios.put(
      `${API_URL}/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfiles = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });
    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/api/v1/user/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    // console.log(response.data);

    dispatch({
      type: "userProfileSuccess",
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/api/v1/follow/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "followUserSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
