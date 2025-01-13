import { Box, Typography, Button } from "@mui/material";
import landingImage from '../assets/landing_map.jpg'; // Make sure to replace with your actual image path

const HomePage = () => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '89vh', 
                backgroundColor: '#f0f7f4', 
                textAlign: 'center',
                padding: '20px'
            }}
        >
            <Box sx={{ flex: 1, padding: '20px' }}>
                <Typography variant="h2" gutterBottom>
                    Welcome to MapTale
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Project management tool
                </Typography>
            </Box>
            <Box 
                component="img"
                sx={{
                    height: '100%', 
                    width: 'auto', 
                }}
                alt="Landing"
                src={landingImage}
            />
        </Box>
    );
}

export default HomePage;