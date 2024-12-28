import { Container, Typography, Box, CircularProgress } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import useFetch from '../hooks/useFetch'

const ProjectPage = () => {
    const { data, loading, error} = useFetch("http://127.0.0.1:8000/api/project/")
    
    if (loading) return (
        <CircularProgress />
    )
    if (error) return (
        <Typography>Error: {error.message}</Typography>
    )

    if (data) return (
        <Container maxWidth='lg' sx={{ marginTop: '20px' }}>
            <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(3, 1fr)'}}>
                {data.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </Box>
        </Container>
    )
}

export default ProjectPage;