import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { postReducer } from "./Reducers/postReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postReducer,
    }
});

export default store;