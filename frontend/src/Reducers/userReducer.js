import { createReducer } from "@reduxjs/toolkit";
import {userReducerTypes} from "../constants/constant";

const initialState = {};

const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutRequest,
  logoutSuccess,
  clearErrors,
  logoutFailure,
  allUserRequest,
  allUserSuccess,
  allUserFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailure,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearMessage,
  followUserRequest,
  followUserSuccess,
  followUserFailure,
  userProfileRequest,
  userProfileSuccess,
  userProfileFailure
} = userReducerTypes;

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loading = true;
    });
    builder.addCase(loginSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(registerRequest, (state) => {
      state.loading = true;
    })
    .addCase(registerSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(registerFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase(loadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loadUserFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase(logoutRequest, (state) => {
      state.loading = true;
    })

    .addCase(logoutSuccess, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    })

    .addCase(logoutFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    })

    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});

export const allUserReducer = createReducer(initialState, (builder) => {
  builder.addCase(allUserRequest, (state) => {
    state.loading = true;
  })
    builder.addCase(allUserSuccess, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    builder.addCase(allUserFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    });
});

export const updateProfileReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateProfileRequest, (state) => {
    state.loading = true;
  })
    builder.addCase(updateProfileSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    builder.addCase(updateProfileFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(updatePasswordRequest, (state) => {
      state.loading = true;
    })
    builder.addCase(updatePasswordSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    builder.addCase(updatePasswordFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(deleteProfileRequest, (state) => {
      state.loading = true;
    })
    builder.addCase(deleteProfileSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    builder.addCase(deleteProfileFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(forgetPasswordRequest, (state) => {
      state.loading = true;
    })
    builder.addCase(forgetPasswordSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    builder.addCase(forgetPasswordFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(resetPasswordRequest, (state) => {
      state.loading = true;
    })
    builder.addCase(resetPasswordSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    builder.addCase(resetPasswordFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    })
    builder.addCase(clearMessage, (state) => {
      state.message = null;
    });
});

export const userProfileReducer = createReducer(initialState, (builder) => {
  builder.addCase(userProfileRequest, (state) => {
    state.loading = true;
  })
    builder.addCase(userProfileSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    builder.addCase(userProfileFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    })
    builder.addCase(clearMessage, (state) => {
      state.message = null;
    });
});

export const followUserReducer = createReducer(initialState, (builder) => {
  builder.addCase(followUserRequest, (state) => {
    state.loading = true;
  })
    builder.addCase(followUserSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })

  builder.addCase(followUserFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    })
    builder.addCase(clearMessage, (state) => {
      state.message = null;
    })
});
