import React from 'react';
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function Header() {
    return (
        <div className="header">
            <h1 className="title">Polling</h1>
            <div className="navbar">
                <div className="link" ><Link to="/">Home</Link></div>
                <div className="link"><Link to="/SignIn">SignIn</Link></div>                
                <div className="link"><Link to="/"><AddCircleOutlineIcon sx={{ fontSize: 13 }} /> Create Poll</Link></div>
            </div>
        </div>
    )
}

export default Header;