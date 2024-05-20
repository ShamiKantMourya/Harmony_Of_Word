import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./UpdatePassword.css";
import { updatePassword } from "../../Services/userService";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { message, loading, error } = useSelector(
    (state) => state.updateProfile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForgetPassword = async (event) => {
    event.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
    navigate("/account");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="updatePassword">
      <div className="update-password-container">
        <div className="update-password-text">
          <Typography>Forget Password</Typography>
        </div>
        <form className="Update-password-form" onSubmit={handleForgetPassword}>
          <input
            type="password"
            placeholder="Enter your old password"
            required
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <button
            disabled={loading}
            type="submit"
            className="change-password-btn"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
