import { Box, Divider, Typography, Button, IconButton, Stack } from '@mui/material'
import ProjectTreeView from './ProjectTreeView';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PutProjectDialog from './dialogs/PutProjectDialog';
import { useState } from 'react';


const ProjectSideBar = ({ project, handleItemChange, apiRef }) => {
    const navigate = useNavigate()
    const handleProjectDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/project/${project.id}`)
            navigate("/project")
        } catch (error) {
            console.error('Error deleting item: ', error.message)
        }
    }

    const [projectPutOpen, setProjectPutOpen] = useState(false)
    const handleProjectPutClose = () => setProjectPutOpen(false)
    const handleProjectPutOpen = () => setProjectPutOpen(true)

    return (
        <Box sx={{
            maxWidth: '280px',
            minWidth: '280px', 
            minHeight: '88vh', 
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
                <Stack>
                    <Typography variant='h6' sx={{
                        marginTop: '10px'}}>
                        {project.name}
                    </Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', }}>
                        <IconButton
                            size='small'
                            sx={{ m: "10px"}}
                            onClick={handleProjectDelete}>
                            <DeleteRoundedIcon/>
                        </IconButton>
                        <IconButton
                            size='small'
                            sx={{ m: "10px"}}
                            onClick={handleProjectPutOpen}>
                            <DriveFileRenameOutlineRoundedIcon/>
                        </IconButton>
                        <PutProjectDialog
                            project={project}
                            open={projectPutOpen}
                            onClose={handleProjectPutClose}
                        />
                    </Box>
                </Stack>
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