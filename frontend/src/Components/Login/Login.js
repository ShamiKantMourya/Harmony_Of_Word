import React, { useState } from 'react';
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Email, Https } from "@mui/icons-material";

import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginHandler = (event) => {
        event.preventDefault();
    };

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