import React, { useEffect, useState } from 'react';
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {useAlert} from "react-alert";

import "./UpdatePassword.css";
import { updatePassword } from '../../Services/userService';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const {message,loading, error} = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleForgetPassword = (event) => {
    event.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };

  useEffect(() => {
if(error){
  alert.error(error);
  dispatch({type: "clearErrors"});
}
if(message){
  alert.success(message);
  dispatch({type: "clearMessage"})
}
  },[dispatch, alert, error, message])

  return (
    <div className='updatePassword'>
      <Typography>Forget Password</Typography>
      <form className='Update-password-form' onSubmit={handleForgetPassword}>
        <input
          type='password'
          placeholder='Enter your old password'
          required
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
        <input
          type='password'
          required
          placeholder='Enter your new password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Button disabled = {loading} type='submit'>Change Password</Button>
      </form>
    </div>
  )
}

export default UpdatePassword;