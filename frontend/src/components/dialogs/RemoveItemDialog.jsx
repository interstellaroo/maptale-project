import { Button, MenuItem, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react"


const RemoveItemDialog = ({ project, open, onClose, refetch }) => {
    const [removing, setRemoving] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    // Flattening out the project structure
    const flattenProjectStructure = (children) => {
        let result = [];
        for (const child of children) {
            if (child.children && child.children.length > 0) {
                result = result.concat(flattenProjectStructure(child.children));
            }
            result.push(child);
        }
        return result;
    };
    const projectItems = flattenProjectStructure(project.children);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setRemoving(true);

            let url = '';
            let data = {};

            if (selectedItem.resourcetype) {
                switch (selectedItem.resourcetype) {
                    case 'Note':
                        url = `http://127.0.0.1:8000/api/item/note/${selectedItem.id}`
                        break
                    case 'Map':
                        url = `http://127.0.0.1:8000/api/item/map/${selectedItem.id}`
                        break;
                    default:
                        console.error('Unknown item type')
                        return
                }
            }
            else {
                url = `http://127.0.0.1:8000/api/item/node/${selectedItem.id}`
            }

            const response = await axios.delete(url)
            refetch()
            onClose();
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            setRemoving(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
            <DialogTitle>Reomve an item from {project.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose an item and remove it from the project.
                </DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        sx={{ my: '5px', flexGrow: 1}}
                        select
                        label='Choose item'
                        value={selectedItem ?? ''}
                        onChange={(e) => setSelectedItem(e.target.value)}
                    >
                        {projectItems.map((item) => (
                            <MenuItem key={item.id} value={item}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" color="primary" disabled={removing}>
                    {removing ? "Removing..." : "Remove"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RemoveItemDialog