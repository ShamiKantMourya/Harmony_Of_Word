import axios from "axios";

export const getFollowingPost = () => async(dispatch) => {
    try {
        dispatch({
            type: "postOfFollowingRequest",
        });

        const response = await axios.get("/post//followingPosts");
        dispatch({
            type: "postOfFollowingSuccess",
            payload: response.data.posts,
        });
        
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,
        })
    }
};