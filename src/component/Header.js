import React from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


function Header() {
    return (
        <div className="header">
            <h1 className="title">Polling </h1>

            <div className="navbar">
                <Tooltip title="Home">
                    <Button>
                        <div className="link"><Link to="/"><HomeIcon color="action" sx={{ fontSize: 17 }} /></Link></div>
                    </Button>
                </Tooltip>
                <Tooltip title="SignIn">

                    <Button>
                        <div className="link"><Link to="/SignIn"><LoginIcon color="action" sx={{ fontSize: 17 }} /> </Link></div>
                    </Button>
                </Tooltip>
                <Tooltip title="Add">
                    <Button>
                        <div className="link"><AddCircleOutlineIcon sx={{ fontSize: 17 }} /> Create Poll<Link to="/"></Link></div>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default Header;