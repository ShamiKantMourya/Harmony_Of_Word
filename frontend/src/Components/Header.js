import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Chat,
    ChatOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
    Notifications,
    NotificationsOutlined,
    Home,
    HomeOutlined,
    Menu,
    MenuOutlined,
} from "@mui/icons-material";

// import IMAGES from '../Image/image';
import "./Header/Header.css"

const Header = () => {
    const [displayNav, setDisplayNav] = useState(false);
    return (
        <>
            <div className='header'>
                <div className='header-logo'>
                    <p className='header-logo-text'><span>H</span>armony_Of_Words</p>
                </div>
                <div className='header-search'>
                    <div className='search-bar'>
                        <input type='text' placeholder='Search.........' className='input-field' />
                        <button className='search-btn'><Search /></button>
                    </div>
                </div>
                <div className={displayNav ? "header-icons mobileView-header-icons" : "header-icons"}>
                    <Link to="/"><Home /></Link>
                    <Link to=""><Add /></Link>
                    <Link to=""><Chat /></Link>
                    <Link to=""><Notifications /></Link>
                    <Link to=""><AccountCircle /></Link>
                </div>
                {/* Hamburger menu */}
                <div className='hamburger-icon'>
                    <button className="menu-btn" onClick={() => setDisplayNav(!displayNav)}>
                        <Menu />
                    </button>


                </div>

            </div>
        </>
    )
}

export default Header;