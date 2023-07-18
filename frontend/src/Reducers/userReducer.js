import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    // isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    registerRequest: (state) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    registerFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    logoutRequest: (state) => {
        state.loading = true;
    },

    logoutSuccess: (state) => {
        state.loading = false;
        state.user = null;
    state.isAuthenticated = false;
    },

    logoutFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },

    clearErrors: (state) => {
        state.error = null;
    },

});

export const allUserReducer = createReducer(initialState, {
    allUserRequest: (state) => {
        state.loading = true;
    },
    allUserSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    allUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    }
})