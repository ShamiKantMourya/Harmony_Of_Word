import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "../constants/constant";

export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });
    const token = Cookies.get("token");
    // console.log(token, "get following post")

    const response = await axios.get(`${API_URL}/api/v1/followingPosts`, {
      headers: {
        Authorization: token, // Include the token in the Authorization header
        "Content-Type": "application/json", // Optional: Set the content type
      },
    });
    // console.log(response, "get following posts");
    dispatch({
      type: "postOfFollowingSuccess",
      payload: response.data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateLike = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const token = Cookies.get("token");

    const response = await axios.get(`${API_URL}/api/v1/post/${id}`, {
      headers: {
        Authorization: token, // Include the token in the Authorization header
        "Content-Type": "application/json", // Optional: Set the content type
      },
    });

    dispatch({
      type: "likeSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addPostComment = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "commentRequest",
    });
    const token = Cookies.get("token");
    const response = await axios.put(
      `${API_URL}/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          Authorization: token, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "commentSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "commentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });
    const token = Cookies.get("token");
    const response = await axios.delete(
      `${API_URL}/api/v1/post/comment/${id}`,
      {
        headers: {
          Authorization: token, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      },
      {
        data: { commentId },
      }
    );

    dispatch({
      type: "deleteCommentSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const userPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostRequest",
    });

    const token = Cookies.get("token");
    // console.log(token, "my posts")
    const response = await axios.get(`${API_URL}/api/v1/my/posts`, {
      headers: {
        Authorization: token, // Include the token in the Authorization header
        "Content-Type": "application/json", // Optional: Set the content type
      },
    });

    // console.log(response.data);

    dispatch({
      type: "myPostSuccess",
      payload: response.data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const createPost = (caption, image, location) => async (dispatch) => {
  try {
    dispatch({
      type: "createPostRequest",
    });
    const token = Cookies.get("token");
    const response = await axios.post(
      `${API_URL}/api/v1/post/createpost`,
      {
        caption,
        image,
        location,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "createPostSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "createPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateCaption = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const token = Cookies.get("token");
    const response = await axios.put(
      `${API_URL}/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateCaptionSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteUserPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const token = Cookies.get("token");
    const response = await axios.delete(`${API_URL}/api/v1/post/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "deletePostSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostRequest",
    });

    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/api/v1/post/userPost/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data, "getuserPosts")
    dispatch({
      type: "userPostSuccess",
      payload: response.data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostFailure",
      payload: error.response.data.message,
    });
  }
};
export const addPostToBookmark = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "addBookMarkRequest",
    });
    // console.log(id, "bookmark id");
    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/api/v1/user/posts`, {
     headers: {
      Authorization: token,
      "Content-Type": "application/json",
     }
    });
    // console.log(response.data.posts, "all posts");
    const bookmarkPost = response.data.posts.find((post) => post._id === id);
    // console.log(bookmarkPost, "bookmarkPost");
    dispatch({
      type: "addBookMarkSuccess",
      payload: bookmarkPost,
    });
  } catch (error) {
    dispatch({
      type: "addBookMarkFailure",
      payload: error.response.data.message,
    });
  }
};
