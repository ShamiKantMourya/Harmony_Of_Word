import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { Email, Https, Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import "./SignUp.css";
import { registerUser } from "../../Services/userService";

const SignUp = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleProfileImage = (event) => {
    const file = event.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    dispatch(registerUser(avatar, name, location, email, password, bio));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error]);
  return (
    <div className="login-page-box">
      <div className="sign_up-conatiner">
        <div className="login_container_img">
          <img src="login.jpg" alt="login" />
        </div>
        <div className="signup-page">
          <div className="sign-up-text">
            <p>Sign Up</p>
          </div>
          <form className="signup-form" onSubmit={submitFormHandler}>
            <div className="sign-up-avatar">
              <Avatar
                src={avatar}
                alt="UserProfile"
                sx={{ height: "6vmax", width: "6vmax" }}
              />
            </div>
           <div className="image-file">
           <input
              type="file"
              accept="image/*"
              onChange={handleProfileImage}
              className="custom-file-input"
            />
            </div>
            <div className="signup_input-box">
              <span className="input-icon">
                <AccountCircleIcon />
              </span>
              <input
                type="text"
                placeholder="user name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="sign-up-input-field"
              />
            </div>
            <div className="signup_input-box">
              <span className="input-icon">
                <InfoIcon />
              </span>
              <input
                type="text"
                placeholder="Bio"
                required
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="sign-up-input-field"
              />
            </div>
            <div className="signup_input-box">
              <span className="input-icon">
                <LocationOnIcon />
              </span>
              <input
                type="location"
                placeholder="your location"
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="sign-up-input-field"
              />
            </div>
            <div className="signup_input-box">
              <span className="input-icon">
                <Email />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="sign-up-input-field"
              />
            </div>
            <div className="signup_input-box">
              <span className="input-icon">
                <Https />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="sign-up-input-field"
              />
              <div
                className="eye_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>

            <button type="submit" className="animated-button signup_button">
              <svg
                viewBox="0 0 24 24"
                className="arr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">Sign Up</span>
              <span className="circle"></span>
              <svg
                viewBox="0 0 24 24"
                className="arr-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>

            <Link to="/" className="sign-up-register">
              <p>Already have an account? Sign In</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
