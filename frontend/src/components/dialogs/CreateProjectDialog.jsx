import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material"

const CreateProjectDialog = ({ open, onClose, onCreate }) => {
    const [creating, setCreating] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

  const newProject = {
    name: formJson.name,
    description: formJson.description,
  }

  try {
    setCreating(true)
    await onCreate(newProject)
    onClose()
  } catch (error) {
    console.error("Error creating project:", error)
  } finally {
    setCreating(false)
  }
}

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new project, please enter the project name and description below.
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
          variant="standard"
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Project Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={creating}>
          {creating ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateProjectDialog