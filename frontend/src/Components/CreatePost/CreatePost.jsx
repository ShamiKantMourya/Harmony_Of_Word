import React, { useEffect, useState } from 'react';
import { Button, Typography } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";

import "./createPost.css";
import { createPost } from '../../Services/postService';
import { loadUser } from '../../Services/userService';

const CreatePost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");

    const {loading, error, message} = useSelector((state) => state.createPost);
    const dispatch = useDispatch();
    const alert = useAlert();

    const handlePostImage = (event) => {
        const file = event.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if(Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }

    };

    const postSubmitHandler = async (event) => {
        event.preventDefault();
      await  dispatch(createPost(caption,image,location));
        dispatch(loadUser());
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }

        if(message) {
            alert.success(message);
            dispatch({type:"clearMessage"});
        }
    },[dispatch,error,message,alert]);

    return (
        <div className='create-post-container'>
            <form className='create-post-form' onSubmit={postSubmitHandler}>
                <Typography>
                    New Post
                </Typography>
                {image && <img src={image} alt='Post' />}
                <input type='file' accept='image/*' onChange={handlePostImage} />
                <input type='text' placeholder='Caption....' value={caption} onChange={(event) => setCaption(event.target.value)} />
                <input type='text' placeholder='location' value={location} onChange={(event) => setLocation(event.target.value)}/>
                <Button disabled = {loading} type='submit'>Post</Button>
            </form>
        </div>
    )
}

export default CreatePost;