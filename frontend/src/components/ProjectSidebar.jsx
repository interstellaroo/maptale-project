import { Box, Divider, Typography, Button, IconButton, Stack } from '@mui/material'
import ProjectTreeView from './ProjectTreeView'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PutProjectDialog from './dialogs/PutProjectDialog'
import { useState } from 'react'
import AddItemDialog from './dialogs/AddItemDialog'
import RemoveItemDialog from './dialogs/RemoveItemDialog'
import config from '../config'


const ProjectSideBar = ({ project, handleItemChange, apiRef, refetch }) => {
    const navigate = useNavigate()
    const handleProjectDelete = async () => {
        try {
            const response = await axios.delete(`${config.apiUrl}/api/project/${project.id}`)
            navigate("/project")
        } catch (error) {
            console.error('Error deleting item: ', error.message)
        }
    }

    const [projectPutOpen, setProjectPutOpen] = useState(false)
    const handleProjectPutClose = () => setProjectPutOpen(false)
    const handleProjectPutOpen = () => setProjectPutOpen(true)

    const [itemDialogOpen, setitemDialogOpen] = useState(false)
    const handleItemDialogClose = () => setitemDialogOpen(false)
    const handleItemDialogOpen = () => setitemDialogOpen(true)

    const [itemRemoveOpen, setitemRemoveOpen] = useState(false)
    const handleItemRemoveClose = () => setitemRemoveOpen(false)
    const handleItemRemoveOpen = () => setitemRemoveOpen(true)

    return (
        <Box sx={{
            maxWidth: '280px',
            minWidth: '280px', 
            minHeight: '90vh', 
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
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h6' sx={{ marginTop: '10px', textAlign: 'center' }}>
                            {project.name}
                        </Typography>
                    </Box>
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
                            refetch={refetch}
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
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: '20px',
            }}>
                <Button sx={{ backgroundColor: '#3c493f', color: '#fff','&:hover': {backgroundColor: '#8fd1b0'} }} endIcon={<AddCircleOutlineRoundedIcon /> } onClick={handleItemDialogOpen}>Add</Button>
                <AddItemDialog 
                    project={project}
                    open={itemDialogOpen}
                    onClose={handleItemDialogClose}
                    refetch={refetch}
                />
                <Button sx={{ backgroundColor: '#3c493f', color: '#fff','&:hover': {backgroundColor: '#8fd1b0'} }} endIcon={<HighlightOffRoundedIcon /> } onClick={handleItemRemoveOpen}>Remove</Button>
                <RemoveItemDialog 
                    project={project}
                    open={itemRemoveOpen}
                    onClose={handleItemRemoveClose}
                    refetch={refetch}
                />
            </Box>
        </Box>
    )
}

export default ProjectSideBar