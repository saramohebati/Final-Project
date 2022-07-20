import React from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Calendar from '../image/Calendar.png';
import { Link } from "react-router-dom";
import { Box } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function LandingPage() {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent={{ sm: 'space-around' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                className='landing'
            >
                
                <h1>Easy and smart coordination</h1>
                <div className="add"><Link to="/"> Create Poll</Link></div>
                <Item><img className="img1" src={Calendar}></img></Item>
            </Stack>
        </Box>
    );

}

export default LandingPage;