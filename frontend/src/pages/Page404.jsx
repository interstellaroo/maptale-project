import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', marginTop: '20vh' }}>
            <Typography variant='h4'>
                Page not found...
            </Typography>
            <Button sx={{ marginTop: '50px'}} color='inherit' variant="outlined" onClick={() => navigate("/")} >Return home</Button>
        </Box>
    )
}

export default  Page404;