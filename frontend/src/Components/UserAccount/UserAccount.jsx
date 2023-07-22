import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { useAlert } from 'react-alert';

import "./userAccount.css";
import { userPosts } from '../../Services/postService';
import { logoutUser } from '../../Services/userService';
import User from '../User/User';
import Post from '../Post/Post';
import Loader from "../Loader/Loader";
import { Link } from 'react-router-dom';

const UserAccount = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, posts } = useSelector((state) => state.myPost);
    const { user, loading: userLoading } = useSelector((state) => state.user);

    const [followerToggle, setFollowerToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);

    const logoutHandler = async() => {
        await dispatch(logoutUser());
        alert.success("Logout successfully")
    }

    useEffect(() => {
        dispatch(userPosts());
    }, [dispatch]);

    return loading === true || userLoading === true ? (
        <Loader />
    ) : (
        <div className='user-account'>
            <div className='user-post-section'>
                {
                    posts && posts.length > 0 ? posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            location={post.location}
                            postImage={post.image.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                            isUserAccount = {true}
                            isDelete = {true}
                        />
                    )) : <Typography>No Posts</Typography>
                }
            </div>
            <div className='user-profile-section'>
                <div className='user-profile-container'>
                    <Avatar src={user.avatar.url}
                        sx={{ height: "8vmax", width: "8vmax" }}
                    />
                    <Typography>{user.name}</Typography>
                    <Link to="/update/profile">Edit profile</Link>
                    <div className='user-followers'>
                        <button onClick={() => setFollowerToggle(!followerToggle)}>
                            followers
                        </button>
                        <Typography>{user.followers.length}</Typography>
                    </div>
                    <div className='user-following'>
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                            following
                        </button>
                        <Typography>{user.following.length}</Typography>
                    </div>
                    <div className='user-post'>
                        <Typography> Post</Typography>
                        <Typography>{user.posts.length}</Typography>
                    </div>
                    <Button className='logout-btn' onClick={logoutHandler}>Logout</Button>
                    <div className='user-change-password'>
                        <Link to="/update/password">Change password</Link>
                    </div>

                    <Button variant='text' style={{ color: "red", margin: "2vmax" }}>Delete My Profile</Button>
                </div>
                <Dialog open={followerToggle} onClose={() => setFollowerToggle(!followerToggle)}>
                    <div className='dialog-box'>
                        <Typography variant='h4'>Followers</Typography>
                        {
                            user && user.followers.length > 0 ? user.followers.map((user) =>
                                <User
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    location={user.location}
                                    avatar={user.avatar.url}
                                />
                            ) : <Typography>You have no followers</Typography>
                        }
                    </div>
                </Dialog>
                <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                    <div className='dialog-box'>
                        <Typography variant='h4'>Following</Typography>
                        {
                            user && user.following.length > 0 ? user.following.map((user) =>
                                <User
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    location={user.location}
                                    avatar={user.avatar.url}
                                />
                            ) : <Typography>Follow someone first</Typography>
                        }
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default UserAccount;