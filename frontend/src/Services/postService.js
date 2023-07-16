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

export const updateLike = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        })

        const response = await axios.get(`/post/${id}`);

        dispatch({
            type: "likeSuccess",
            payload: response.data.message,
        })

    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message,
        })
    }
};

export const addPostComment = (id,comment) => async(dispatch) => {
try {

    dispatch({
type: "commentRequest",
    });

    const response = await axios.put(`/post/comment/${id}`,{
        comment
    },{
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch({
        type: "commentSuccess",
        payload: response.data.message,
    })
    
} catch (error) {
    dispatch({
        type: "commentFailure",
        payload: error.response.data.message,
    });

}
};