import { Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const PutProjectDialog = ({ project, open, onClose }) => {
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

    const updatedProject = {
        name: formJson.name,
        description: formJson.description,
    };

    try {
        setUpdating(true);
        const response = await axios.put(`http://127.0.0.1:8000/api/project/${project.id}`, updatedProject);
        onClose();
    } catch (error) {
        console.log(error);
    } finally {
        setUpdating(false);
    }
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
          <DialogTitle>Change {project.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modify the project details below and click "Update" to save your changes.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Project Name"
              type="text"
              fullWidth
              defaultValue={project.name} // Set the initial value from the `project` prop
              variant="standard"
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Project Description"
              type="text"
              fullWidth
              defaultValue={project.description} // Set the initial value from the `project` prop
              multiline
              rows={4}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={updating}>
              {updating ? 'Updating...' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>
    );
}

export default PutProjectDialog;