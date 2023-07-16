import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const postReducer = createReducer(initialState, {
    postOfFollowingRequest: (state) => {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});

export const likeReducer = createReducer(initialState, {

    likeRequest: (state) => {
        state.loading = true;
    },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
});

export const commentReducer = () => createReducer(initialState, {

commentRequest: (state) => {
    state.loading = true;
},

commentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
},

commentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
},

clearErrors: (state) => {
    state.error = null;
},

clearMessage: (state) => {
    state.message = null;
}
});