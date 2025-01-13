import { Card, CardActions, CardContent, Typography, Divider, Button, CardHeader, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ProjectCard = ({ project }) => {
    const navigate = useNavigate()
    const handleNav = () => {
        navigate(`/project/${project.id}`)
    }

    return (
        <Card sx={{ minWidth: 350, maxWidth: 400, backgroundColor: '#b3bfb8' }}>
            <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2">{project.description}</Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Button color='inherit' onClick={handleNav}>Show</Button>

            </CardActions>
        </Card>
    )
}

export default  ProjectCard