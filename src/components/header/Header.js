import React from 'react';
import { Link } from "react-router-dom";
// import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#BDECE6',
        },
    },
});

function Header() {
    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" theme={lightTheme}>
                    <Toolbar>
                        <Typography variant="h5" component="div" 
                        sx={{ 
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'black',
                            fontWeight: 700
                    }}
                        >
                            <div className="title"><Link to="/" >Polly</Link></div>
                        </Typography>
                       
                        <Button>
                            <div className="link"><Link to="/SignIn"><LoginIcon color="action" sx={{ fontSize: 20 }} /> </Link></div>
                        </Button>
                        <Button color="inherit">
                            <div className="link"><Link to="/"><AddCircleOutlineIcon color="action" sx={{ fontSize: 20 }} /></Link></div>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}

export default Header;