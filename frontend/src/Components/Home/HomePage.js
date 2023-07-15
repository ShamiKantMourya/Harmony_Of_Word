import React, { useEffect } from 'react';
import {useDispatch} from "react-redux";

import "./HomePage.css";
import User from '../User/User';
import Post from '../Post/Post';
import { getFollowingPost } from '../../Services/postService';



const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowingPost());
  },[]);

  return (
    <div className='home-container'>
        {/* Post Area */}
       <div className='home-post-area'>
        <Post />
       </div>

       {/* //Friend List Area */}
       <div className='home-friends-area'>
        <User 
            userId = {"user._id"}
            name = {"user.name"}
            location = {"user.location"}
            avatar = {"user.avatar.url"}
        />
       </div>
    </div>
  )
}

export default HomePage;