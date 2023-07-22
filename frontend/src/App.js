import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import './App.css';
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { loadUser } from "./Services/userService";
import HomePage from "./Components/Home/HomePage";
import UserAccount from "./Components/UserAccount/UserAccount";
import CreatePost from "./Components/CreatePost/CreatePost";
import SignUp from "./Components/SignUp/SignUp";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  },[dispatch]);

  const {isAuthenticated} = useSelector((state) => state.user);
  return (
    <Router>
      {
        isAuthenticated &&   <Header />
      }
      <Routes>
        <Route path="/" element ={ isAuthenticated ? <HomePage /> : <Login />}/>
        <Route path="/account" element ={ isAuthenticated ? <UserAccount /> : <Login />}/>
        <Route path="/newpost" element ={ isAuthenticated ? <CreatePost /> : <Login />}/>
        <Route path="/register" element ={ isAuthenticated ? <UserAccount /> : <SignUp />}/>
      </Routes>
    </Router>
  );
}

export default App;
