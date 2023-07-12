import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import './App.css';
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { loadUser } from "./Services/userService";
import HomePage from "./Components/Home/HomePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  },[]);

  const {isAuthenticated} = useSelector((state) => state.user);
  return (
    <Router>
      {
        isAuthenticated &&   <Header />
      }
      <Routes>
        <Route path="/" element ={ isAuthenticated ? <HomePage /> : <Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
