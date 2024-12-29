import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const CreateProjectDialog = ({ open, onClose, onCreate }) => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [creating, setCreating] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        setCreating(true);
        try {
            await onCreate(formData); // Call the passed-in create function
            setFormData({ name: "", description: "" });
            onClose(); // Close the dialog on success
        } catch (error) {
            console.error("Error creating project:", error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Project Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Project Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary" disabled={creating}>
                    {creating ? "Creating..." : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProjectDialog;