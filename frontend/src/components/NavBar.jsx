import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <AppBar position="static" sx={{ backgroundColor: '#3c493f' }}>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    MapTale
                </Typography>
                <Button color='inherit' onClick={() => navigate('/')}>HOME</Button>
                <Button color='inherit' onClick={() => navigate('/project')}>PROJECTS</Button>
                <Button color='inherit' onClick={() => navigate('/login')}>LOGIN</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;