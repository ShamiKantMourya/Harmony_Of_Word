import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import User from '../User/User';
import { updateLike } from '../../Services/postService';


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
    console.log(likes);
// console.log(like);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);


    console.log(typeof(user._id), user._id);
    const handleLike = () => {
        setLike(!like);
        dispatch(updateLike(postId));
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
                <button className='like-btn'>
                    <Typography>5 likes</Typography>
                </button>
                <button className='comment-btn'>
                    <Typography>Comments</Typography>
                </button>
            </div>
            <div className='like-comment-delete'>
                <button className='like-option' onClick={handleLike}>
                    {like ? <Favorite /> :
                        <FavoriteBorder />
                    }
                </button>
                <button className='comment-option'>
                    <ChatBubbleOutline />
                </button>

                {
                    isDelete ? <button className='delete-option'> <DeleteOutline /> </button> : null
                }

            </div>
        </div>
    )
}

export default Post;