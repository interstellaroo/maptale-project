import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem, Button, Box } from '@mui/material';

export default function NotePinSelectDialog({ notes, open, onClose, onSelect }) {
    const [selectedNote, setSelectedNote] = useState(null);

    const handleConfirm = () => {
        if (selectedNote) {
            onSelect(selectedNote);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select a Note</DialogTitle>
            <DialogContent>
                <DialogContentText>Select a note to link with your pin.</DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        sx={{ my: '5px', flexGrow: 1 }}
                        select
                        label="Choose note"
                        value={selectedNote || ''}
                        onChange={(e) => setSelectedNote(e.target.value)}
                    >
                        {notes.map((item) => (
                            <MenuItem key={item.id} value={item}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirm} disabled={!selectedNote}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
