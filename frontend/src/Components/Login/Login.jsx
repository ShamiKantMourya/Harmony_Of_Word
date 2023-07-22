import React, { useEffect, useState } from 'react';
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Email, Https } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import "./Login.css";
import { loginUser } from '../../Services/userService';
import { useAlert } from 'react-alert';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { error } = useSelector((state) => state.user);
    const { message } = useSelector((state) => state.updateProfile);


    const dispatch = useDispatch();
    const alert = useAlert();

    const loginHandler = (event) => {
        event.preventDefault();

        dispatch(loginUser(email, password));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: 'clearErrors' });
        }
        if (message) {
            alert.success(message);
            dispatch({type: "clearMessage"});
        }
    }, [error, dispatch, message])
    return (
        <div>
            <div className='login-page'>
                <Typography variant='h4'>Sign In</Typography>
                <form className='login-form' onSubmit={loginHandler}>
                    <div className='input-email'>
                        <span className="input-icon"><Email /></span>
                        <input type='email' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </div>
                    <div className='input-password'>
                        <span className='input-icon'><Https /></span>
                        <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} required />
                    </div>
                    <Link to="/forgetpassword">
                        <Typography>forgot password</Typography>
                    </Link>
                    <Button type='submit'>Login</Button>
                    <Link to="/register">
                        <Typography>New user? Sign Up</Typography>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login;