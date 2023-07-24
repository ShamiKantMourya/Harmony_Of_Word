import { Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getFollowingPost } from '../../Services/postService';
import { userPosts } from '../../Services/postService';

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
        <div className='user-comment-box'>
            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <Typography className='comment-user-name'>{name}</Typography>
            </Link>
            <div className='comment-of-user'>
                <Typography>{comment}</Typography>
            </div>
            <div className='edit-reply-delete-comment'>
                {
                    isUserAccount ? <button onClick={deleteComment}>delete</button> : userId === user._id ? (
                        <button onClick={deleteComment}>delete</button>
                    ) : null
                }
            </div>

        </div>
    )
}

export default CommentCard;