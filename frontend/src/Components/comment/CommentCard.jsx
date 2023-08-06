import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Delete} from "@mui/icons-material";

import { getFollowingPost } from "../../Services/postService";
import { userPosts } from "../../Services/postService";
import "./CommentCard.css";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isUserAccount,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteComment = async () => {
    await dispatch(deleteComment(postId, commentId));

    if (isUserAccount) {
      dispatch(userPosts());
    } else {
      dispatch(getFollowingPost());
    }
  };

  return (
    <div className="user-comment-box">
      <div className="avatar-name-comment">
        <div className="avatar-comment-card">
          <Link to={`/user/${userId}`}>
            <Avatar src={avatar} alt={name} />
          </Link>
        </div>
        <div className="name-comment-card">
          <Link to={`/user/${userId}`}>
            <p className="commentcard-name">{name}</p>
          </Link>
          <div className="comment-delete">
          <p className="commentcard-comment">{comment}</p>
          <div className="edit-reply-delete-comment">
        {isUserAccount ? (
          <button onClick={deleteComment}><Delete /></button>
        ) : userId === user._id ? (
          <button onClick={deleteComment}><Delete /></button>
        ) : null}
      </div>
          </div>
         
        </div>
      </div>
    
    </div>
  );
};

export default CommentCard;
