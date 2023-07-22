import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Avatar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {useAlert} from "react-alert";

import "./SignUp.css";
import { registerUser } from '../../Services/userService';

const SignUp = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState('');
    
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.user);
    const alert = useAlert();


    const handleProfileImage = (event) => {
        const file = event.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        }

    };
    const submitFormHandler = (event) => {
        event.preventDefault();
        dispatch(registerUser(avatar, name, location, email, password));
    };

    useEffect(() => {
if(error){
    alert.error(error);
    dispatch({type: "clearErrors"})
}
    },[dispatch,error,alert])
    return (
        <div className='Signup-user'>
            <Typography>
                SignUp
            </Typography>

            <Avatar src={avatar} alt='UserProfile' sx={{ height: "6vmax", width: "6vmax" }} />
            <form className='signup-form' onSubmit={submitFormHandler}>

                <input type='file' accept='image/*' onChange={(handleProfileImage)} />
                <input
                    type='text'
                    placeholder='user name'
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type='location'
                    placeholder='your location'
                    required
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                />
                <input
                    type='email'
                    placeholder='enter your emailId'
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Button disabled ={loading} type="submit">SignUp</Button>

                <Link to="/" ><span className='signIn-user'>Already have account ? SignIn</span></Link>
            </form>
        </div>
    )
}

export default SignUp;