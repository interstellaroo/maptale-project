import { Box, Divider, Typography, Button, Fab, IconButton } from '@mui/material'
import ProjectTreeView from './ProjectTreeView';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


const ProjectSideBar = ({ project, handleProjectDelete, handleItemChange, apiRef }) => {
    return (
        <Box sx={{ 
            maxWidth: '280px',
            minWidth: '280px', 
            minHeight: '100vh', 
            backgroundColor: '#b3bfb8',
            borderRight: 1,
            }}>
            <Box sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center', 
                alignItems: 'center', 
                maxWidth: '280px',
                minHeight: '80px',}}>
                <Typography variant='h6' sx={{ 
                    marginTop: '10px',
                    marginBottom: '10px'}}>
                    {project.name}
                </Typography>
                <IconButton
                    size='small'

                    onClick={handleProjectDelete}>
                    <DeleteRoundedIcon/>
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ marginTop: '10px' }}>
                <ProjectTreeView 
                    project={project}
                    handleItemChange={handleItemChange}
                    apiRef={apiRef}/>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center',
                marginTop: '20px',
            }}>
                <Button color='inherit' variant='outlined' endIcon={<AddRoundedIcon />}>Add</Button>
            </Box>
        </Box>
    )
}

export default ProjectSideBar;