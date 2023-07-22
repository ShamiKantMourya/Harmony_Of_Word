import React from 'react'
import { Link } from 'react-router-dom';

import "./User.css";
import { Avatar, Typography } from '@mui/material';

const User = ({ userId, name, location, avatar }) => {
    return (
        <Link to={`/user/${userId}`} className='user-card'>
            <div className='user-box'>
                <div className='user-img'>
                    {/* <img src={avatar} alt={name} /> */}
                    <Avatar src={avatar} alt= {name} />
                </div>
                <div className='name-loc'>
                    <Typography className='loc'>{location}</Typography>
                    <Typography className='name'>{name}</Typography>
                </div>
            </div>
        </Link>
    )
}

export default User;