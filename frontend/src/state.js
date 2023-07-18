import { configureStore } from "@reduxjs/toolkit";
import { allUserReducer, userReducer } from "./Reducers/userReducer";
import {
    commentReducer,
    createPostReducer,
    likeReducer,    
    myPostReducer,
    postReducer
} from "./Reducers/postReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postReducer,
        allUsersData: allUserReducer,
        like: likeReducer,
        comment: commentReducer,
        myPost: myPostReducer,
        createPost: createPostReducer,
    }
});

export default store;