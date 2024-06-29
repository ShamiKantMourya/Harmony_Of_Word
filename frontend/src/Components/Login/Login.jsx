import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Email, Https, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import "./Login.css";
import { loginUser } from "../../Services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.updateProfile);

  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(loginUser(email, password));
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
  }, [error, dispatch, message]);
  return (
    <div className="login-page-box">
      <div className="login_container">
        <div className="login_container_img">
          <img src="login.jpg" alt="login" />
        </div>
        <div className="login-page">
          <div className="sign-in-text">
            <div className="user_porfile_img">
              <img src="mavatar.jpg" alt="profile pic" />
            </div>
            <p>Sign In</p>
          </div>

          <form className="login-form" onSubmit={loginHandler}>
            <div className="input-box">
              <span className="input-icon">
                <Email />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="sign-in-input-field"
              />
            </div>
            <div className="input-box">
              <span className="input-icon">
                <Https />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="sign-in-input-field"
              />
              <div
                className="eye_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
            <Link to="/forget/password">
              <p>forgot password?</p>
            </Link>
            <div className="login-button">
              <button type="submit" className="login-btn">
                Login
              </button>
              <Link to="/register" className="sign-in-register">
                <p>New user? Sign Up</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
