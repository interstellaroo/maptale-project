import { Container, Typography, Box, CircularProgress, Button, Dialog, DialogTitle,DialogContent, } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import useFetch from '../hooks/useFetch'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useState } from "react";
import CreateProjectDialog from "../components/dialogs/CreateProjectDialog";
import axios from "axios";


const ProjectPage = () => {
    const url = "http://127.0.0.1:8000/api/project/"
    const { data, loading, error, refetch } = useFetch(url)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)
    const handleCreateProject = async (projectData) => {
        const response = await axios.post(url, projectData)
        refetch()
    };

    // Page display
    // ------------------------

    if (loading) return (
        <CircularProgress />
    )
    if (error) return (
        <Typography>Error: {error.message}</Typography>
    )

    if (data) return (
        <Container maxWidth='lg' sx={{ marginTop: '20px' }}>
            <Button 
                color='inherit' 
                variant="outlined" 
                endIcon={<DriveFileRenameOutlineRoundedIcon/>}
                onClick={handleOpenDialog}>
                Create Project
            </Button>
            <CreateProjectDialog 
                open={dialogOpen} 
                onClose={handleCloseDialog} 
                onCreate={handleCreateProject}
            />
            <Box sx={{ marginTop: '20px', display: 'grid', gap: 1, gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {data.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}/>
                ))}
            </Box>
        </Container>
    )
}

export default ProjectPage;