import { DialogContent, Box, DialogContentText, DialogTitle, TextField, Dialog, Divider, MenuItem, DialogActions, Button, Typography } from "@mui/material"
import { useState } from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {styled} from "@mui/material"
import axios from 'axios'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

const AddItemDialog = ({ project, open, onClose, refetch }) => {
    const [creating, setCreating] = useState(false)
    const [selectedItemType, setSelectedItemType] = useState('node')
    const [selectedParentFolder, setSelectedParentFolder] = useState('')
    const [mapImage, setMapImage] = useState(null)

    const flattenProjectStructure = (children) => {
        let result = []
        for (const child of children) {
            if (child.children && child.children.length > 0) {
                result = result.concat(flattenProjectStructure(child.children))
            }
            result.push(child)
        }
        return result
    }
    const flattenedItems = flattenProjectStructure(project.children)
    const projectFolders = flattenedItems.filter(item => !item.resourcetype)

    // Handle the POST request
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if (!selectedParentFolder) {
            formData.delete('parent')
        } else {
            formData.append('parent', selectedParentFolder)
        }
        formData.append('project', project.id)
        console.log(selectedParentFolder)
        try {
            setCreating(true)

            let url = ''
            let data = {}

            switch (selectedItemType) {
                case 'node':
                    url = 'http://127.0.0.1:8000/api/item/node'
                    data = { 
                        name: formData.get('name'),
                    }
                    break
                case 'note':
                    url = 'http://127.0.0.1:8000/api/item/note'
                    data = {
                        name: formData.get('noteTitle'),
                        text: formData.get('noteContent'),
                        node: formData.get('parent')
                    }
                    break
                case 'map':
                    url = 'http://127.0.0.1:8000/api/item/map'
                    data = { 
                        name: formData.get('mapTitle'),
                        node: formData.get('parent')
                    }
                    if (mapImage) {
                        formData.append('image', mapImage)
                    }
                    break
                default:
                    console.error('Unknown item type')
                    return
            }

            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })

            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            refetch()
            onClose()
        } catch (error) {
            console.error('Error creating item:', error)
        } finally {
            setCreating(false)
        }
    }

    // List of available item types
    const itemTypes = [
        { value: 'node', label: 'Folder' },
        { value: 'note', label: 'Note' },
        { value: 'map', label: 'Map' },
    ]

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
            <DialogTitle>Add Item to {project.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose parent folder, item type and add it to the project.
                </DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        sx={{ my: '5px', flexGrow: 1}}
                        select
                        label='Item type'
                        defaultValue={'node'}
                        value={selectedItemType}
                        onChange={(e) => setSelectedItemType(e.target.value)}
                        helperText='Select the type of item you want to create'
                    >
                        {itemTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        sx={{ my: '5px', flexGrow: 1}}
                        select
                        label='Parent folder'
                        defaultValue={""}
                        value={selectedParentFolder}
                        onChange={(e) => setSelectedParentFolder(e.target.value)}
                        helperText='Select folder for your item'
                    >
                        {selectedItemType == 'node' && (
                            <MenuItem value={""}> - No parent</MenuItem>
                        )}
                        {projectFolders.map((folder) => (
                            <MenuItem key={folder.id} value={folder.id}>
                                {folder.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Divider />
                    {selectedItemType == 'node'&& (
                        <>
                            <TextField
                                sx={{ my: '10px' }}
                                label="Folder Name"
                                name="name"
                                helperText="Enter the folder name"
                            />
                        </>
                    )}
                    {selectedItemType == 'note'&& (
                        <>
                            <TextField
                                sx={{ my: '10px' }}
                                label="Note Title"
                                name="noteTitle"
                                helperText="Enter the note title"
                            />
                            <TextField
                                sx={{ my: '10px' }}
                                label="Note Content"
                                name="noteContent"
                                helperText="Enter the content of the note"
                                multiline
                                rows={4}
                            />
                        </>
                    )}
                    {selectedItemType == 'map'&& (
                        <>
                            <TextField
                                    sx={{ my: '10px' }}
                                    label="Map Title"
                                    name="mapTitle"
                                    helperText="Enter the title for the map"
                                />
                                <Button
                                    sx={{ maxHeight: '40px'}}
                                    component="label"
                                    variant='outlined'
                                    startIcon={<CloudUploadIcon/> }    
                                >
                                    Upload map image
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(event) => setMapImage(event.target.files[0])}
                                    />
                                </Button>
                                {mapImage != null && (
                                    <Typography variant="subtle2">
                                        Current image: {mapImage.name}
                                    </Typography>
                                )}
                        </>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button sx={{ backgroundColor: '#3c493f', color: '#fff','&:hover': {backgroundColor: '#8fd1b0'} }} onClick={onClose}>Cancel</Button>
                <Button sx={{ backgroundColor: '#3c493f', color: '#fff','&:hover': {backgroundColor: '#8fd1b0'} }} type="submit" color="primary" disabled={creating}>
                    {creating ? "Creating..." : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddItemDialog