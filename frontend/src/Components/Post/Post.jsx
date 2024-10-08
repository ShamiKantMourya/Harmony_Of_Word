import React, { useEffect, useState } from "react";
import { Typography, Dialog } from "@mui/material";
import { toast } from "react-hot-toast";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  BookmarkAdd,
  BookmarkAdded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import User from "../User/User";

import {
  addPostComment,
  getFollowingPost,
  updateCaption,
  updateLike,
  userPosts,
  deleteUserPost,
  getUserPosts,
  addPostToBookmark,
} from "../../Services/postService";
import { loadUser } from "../../Services/userService";
import CommentCard from "../comment/CommentCard";
import "./Post.css";

const Post = ({
  postId,
  caption,
  location,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isUserAccount = "home", // change false into home
}) => {
  const [like, setLike] = useState(false);
  const [liked, setLiked] = useState(false);
  const [userComments, setUserComments] = useState("");
  const [toggleComment, setToggleComment] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [toggleCaption, setToggleCaption] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  // const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const {Bookmarks} = useSelector((state) => state.bookMark);

  const isInBookmark = Bookmarks?.some((bookmark) => bookmark._id === postId);
  // console.log(isInBookmark, "isBookmark")

  // console.log(typeof (user._id), user._id);
  const handleLike = async () => {
    setLike(!like);
    await dispatch(updateLike(postId));

    if (isUserAccount === "account") {
      dispatch(userPosts());
    }
    if (isUserAccount === "home") {
      dispatch(getFollowingPost());
    }
    if (isUserAccount === "user") {
      dispatch(getUserPosts(params.id));
    }
    // if (isUserAccount) {
    //   dispatch(userPosts());
    // } else {
    //   dispatch(getFollowingPost());
    //   dispatch(getUserPosts(params.id)) //newly added
    // }
  };

  //Bookmark Handler
  const bookmarkHandler = async () => {
    if (!bookmark) {
      setBookmark(!bookmark);
      dispatch({
        type: "setBookmarkFn",
        payload: true
      })
      // console.log(postId, "postId");
      dispatch(addPostToBookmark(postId));
      toast.success("Bookmark added successfully");
      dispatch({ type: "clearMessage" });
    } else {
      setBookmark(!bookmark);
      dispatch({
        type: "removeBookmark",
        payload: postId,
      });
      dispatch({
        type: "setBookmarkFn",
        payload: false
      })
      toast.success("Bookmark removed successfully");
      dispatch({ type: "clearMessage" });
    }
  };

  const addComment = async (event) => {
    event.preventDefault();

    await dispatch(addPostComment(postId, userComments));

    if (isUserAccount === "account") {
      dispatch(userPosts());
    }
    if (isUserAccount === "home") {
      dispatch(getFollowingPost());
    }
    if (isUserAccount === "user") {
      dispatch(getUserPosts(params.id));
    }
    // if (isUserAccount) {
    //   dispatch(userPosts());
    // } else {
    //   dispatch(getFollowingPost());
    //   dispatch(getUserPosts(params.id))
    // }
  };

  const updateCaptionHandler = (event) => {
    event.preventDefault();
    dispatch(updateCaption(captionValue, postId));
    dispatch(userPosts());
    dispatch(getUserPosts(params.id));
  };

  const deletePostHandler = async () => {
    await dispatch(deleteUserPost(postId));
    dispatch(userPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      // console.log(item._id);
      if (item._id === user._id) {
        setLike(true);
      }
    });
  }, [likes, user._id]);

  // console.log(postImage, "post Image")

  return (
    <div className="post-container">
      <div className="user-detail-edit-option">
        <div className="user-detail">
          <User
            userId={ownerId}
            name={ownerName}
            location={location}
            avatar={ownerImage}
          />
        </div>
        <div className="edit-option">
          {isUserAccount === "account" ? (
            <button onClick={() => setToggleCaption(!toggleCaption)}>
              <MoreVert />
            </button>
          ) : null}
        </div>
      </div>
      <div className="post-caption">
        <p className="caption">{caption}</p>
      </div>
      <div className="post-image">
        <img src={postImage} alt="Post" />
      </div>
      <div className="like-comment">
        <button
          className="like-btn"
          onClick={() => setLiked(!liked)}
          disabled={likes.length === 0 ? true : false}
        >
          <Typography>{likes.length} likes</Typography>
        </button>
        <Typography className="comment-btn">
          {comments.length}
        </Typography>
      </div>
      <div className="like-comment-delete">
        <div className="like-comment-button">
          <button className="like-option" onClick={handleLike}>
            {like ? <Favorite style={{ color: '#FF0000' }} /> : <FavoriteBorder />}
          </button>
          <button
            className="comment-option"
            onClick={() => setToggleComment(!toggleComment)}
          >
            <ChatBubbleOutline />
          </button>
        </div>
        <div className="delete__bookmark">
        {isDelete ? (
          <button className="delete-option" onClick={deletePostHandler}>
            {" "}
            <DeleteOutline />{" "}
          </button>
        ) : null}
        <button className="bookmark-option" onClick={bookmarkHandler}>
          {isInBookmark ? <BookmarkAdded /> : <BookmarkAdd />}
        </button>
        </div>
      </div>
      <Dialog open={liked} onClose={() => setLiked(!liked)}>
        <div className="dialog-box">
          <Typography variant="h5">Liked By</Typography>
          {likes?.map((user) => (
            <div className="like-user" key={user._id}>
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                location={user.location}
                avatar={user.avatar.url}
              />
            </div>
          ))}
        </div>
      </Dialog>

      <Dialog
        open={toggleComment}
        onClose={() => setToggleComment(!toggleComment)}
      >
        <div className="dialog-box">
          <Typography variant="h5">Comments</Typography>
          <form className="comment-box" onSubmit={addComment}>
            <input
              type="text"
              placeholder="Add your comment"
              value={userComments}
              onChange={(event) => setUserComments(event.target.value)}
              required
              className="add-comment-input"
            />
            <button
              type="submit"
              variant="contained"
              className="add-comment-btn"
            >
              Add
            </button>
          </form>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="post-comment-card">
                <CommentCard
                  key={comment._id}
                  userId={comment.user._id}
                  name={comment.user.name}
                  avatar={comment.user.avatar.url}
                  comment={comment.comment}
                  commentId={comment._id}
                  postId={postId}
                  isUserAccount={isUserAccount}
                />
              </div>
            ))
          ) : (
            <p className="no-comments-txt">No comments</p>
          )}
        </div>
      </Dialog>

      <Dialog
        open={toggleCaption}
        onClose={() => setToggleCaption(!toggleCaption)}
      >
        <div className="dialog-box">
          <Typography variant="h5">Edit Caption</Typography>
          <form className="comment-box" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              placeholder="Caption...."
              value={captionValue}
              onChange={(event) => setCaptionValue(event.target.value)}
              required
              className="add-comment-input"
            />
            <button
              type="submit"
              variant="contained"
              className="update-caption-btn"
            >
              Update
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
