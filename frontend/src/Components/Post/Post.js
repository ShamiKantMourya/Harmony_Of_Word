import React, { useEffect, useState } from 'react';
import { Typography, Dialog } from '@mui/material';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import User from '../User/User';
import { addPostComment, getFollowingPost, updateLike } from '../../Services/postService';
import CommentCard from '../comment/CommentCard';


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
    isUserAccount = false,
}) => {

    const [like, setLike] = useState(false);
    const [liked, setLiked] = useState(false);
    const [userComments, setUserComments] = useState("");
    const [toggleComment, setToggleComment] = useState(false);
    // console.log(likes);
    // console.log(like);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);


    // console.log(typeof (user._id), user._id);
    const handleLike = async () => {
        setLike(!like);
        await dispatch(updateLike(postId));

        if (isUserAccount) {
            console.log("my posts");
        } else {
            dispatch(getFollowingPost());
        }
    };

    const addComment = async (event) => {
        event.preventDefault();

        await dispatch(addPostComment(postId, userComments));

        if (isUserAccount) {
            console.log("my posts");
        } else {
            dispatch(getFollowingPost());
        }


    };

    useEffect(() => {
        likes.forEach(item => {
            console.log(item._id);
            if (item._id === user._id) {
                setLike(true);
            }
        })
    }, [likes, user._id]);

    return (
        <div className='post-container'>
            <div className='user-detail-edit-option'>
                <div className='user-detail'>
                    <User
                        userId={ownerId}
                        name={ownerName}
                        location={location}
                        avatar={ownerImage}
                    />
                </div>
                <div className='edit-option'>
                    {
                        isUserAccount ? <button>
                            <MoreVert />
                        </button> : null
                    }
                </div>

            </div>
            <div className='post-caption'>
                <p className='caption'>{caption}</p>
            </div>
            <div className='post-image'>
                <img src={postImage} alt='Post' />
            </div>
            <div className='like-comment'>
                <button className='like-btn'
                    onClick={() => setLiked(!liked)}
                    disabled={likes.length === 0 ? true : false}>
                    <Typography>{likes.length} likes</Typography>
                </button>
                <Typography className='comment-btn'>{userComments.length}Comments</Typography>
            </div>
            <div className='like-comment-delete'>
                <button className='like-option' onClick={handleLike}>
                    {like ? <Favorite /> :
                        <FavoriteBorder />
                    }
                </button>
                <button className='comment-option' onClick={() => setToggleComment(!toggleComment)}>
                    <ChatBubbleOutline />
                </button>

                {
                    isDelete ? <button className='delete-option'> <DeleteOutline /> </button> : null
                }

            </div>
            <Dialog open={liked} onClose={() => setLiked(!liked)}>
                <div className='dialog-box'>
                    <Typography variant='h4'>Liked By</Typography>
                    {
                        likes?.map((user) =>
                            <User
                                key={user._id}
                                userId={user._id}
                                name={user.name}
                                location={user.location}
                                avatar={user.avatar.url}
                            />
                        )
                    }
                </div>
            </Dialog>

            <Dialog open={toggleComment} onClose={() => setToggleComment(!toggleComment)}>
                <div className='dialog-box'>
                    <Typography variant='h4'>Comments</Typography>
                    <form className='comment-box' onSubmit={addComment}>
                        <input type='text' placeholder='Add your comment' value={userComments} onChange={(event) => setUserComments(event.target.value)} required />
                        <button type="submit" variant="contained">Add</button>
                    </form>
                    {
                        comments.length > 0 ? comments.map((comment) => (
                            <CommentCard
                            userId = {comment.user._id}
                            name = {comment.user.name}
                            avatar = {comment.user.avatar.url}
                            comment = {comment.comment}
                            commentId = {comment._id}
                            postId = {postId}
                            isUserAccount = {isUserAccount}
                            />
                        )) : <Typography>No comments</Typography>
                    }
                </div>
            </Dialog>
        </div>
    )
}

export default Post;