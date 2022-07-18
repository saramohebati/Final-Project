import React from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Calendar from '../image/Calendar.png';
import { Link } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function LandingPage() {
    return (
        <div>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent={{ sm: 'space-around' }}
                spacing={{ xs: 4, sm: 12 }}
                className='landing'
            >
                <div>
                    <h1>Easy and smart coordination</h1>
                    <div className="link"><Link to="/"> Create Poll</Link></div>
                </div>

                <Item><img className="img1" src={Calendar}></img></Item>
            </Stack>
        </div>

    );

}

export default LandingPage;