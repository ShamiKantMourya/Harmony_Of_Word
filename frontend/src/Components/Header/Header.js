import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Chat,
    ChatOutlined,
    Add,
    AddOutlined,
    // SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
    Notifications,
    NotificationsOutlined,
    Home,
    HomeOutlined,
    Menu,
    // MenuOutlined,
} from "@mui/icons-material";

// import IMAGES from '../Image/image';
import "./Header.css";

const Header = () => {
    const [displayNav, setDisplayNav] = useState(false);
    const [ tab, setTab] = useState(window.location.pathname)
    return (
        <>
            <div className='header'>
                <div className='header-logo'>
                    <p className='header-logo-text'><span>H</span>armony_Of_Words</p>
                </div>
                <div className={displayNav ? "header-search mobile_view-search" : "header-search"}>
                    <div className='search-bar'>
                        <input type='text' placeholder='Search.........' className='input-field' />
                    <Link to = "/search" onClick={() => setTab("/search")}><button className='search-btn'><Search /></button></Link>
                    </div>
                </div>
                <div className={displayNav ? "header-icons  mobileView-header-icons" : "header-icons"}>
                    <Link to="/" onClick={() => setTab("/")}>{tab === "/" ? <Home /> : <HomeOutlined />}</Link>
                    <Link to="/newpost" onClick={() => setTab("/newpost")}>{tab === "/newpost" ? <Add /> : <AddOutlined />}</Link>
                    <Link to="/chat" onClick={() => setTab("/chat")}>{tab === "/chat" ? <Chat /> : <ChatOutlined />}</Link>
                    <Link to="/notification" onClick={() => setTab("/notification")}>{tab === "/notification" ? <Notifications /> : <NotificationsOutlined />}</Link>
                    <Link to="/account" onClick={() => setTab("/account")}>{tab === "/account" ? <AccountCircle /> : <AccountCircleOutlined />}</Link>
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