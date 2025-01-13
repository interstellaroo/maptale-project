import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography, Box } from '@mui/material';
import axios from 'axios';

const PinNoteDialog = ({ open, noteId, onClose }) => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!noteId) return;
        setLoading(true);
        setError(null);

        axios.get(`http://127.0.0.1:8000/api/item/note/${noteId}`)
            .then((response) => {
                setNote(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch the note.');
                setLoading(false);
            });
    }, [noteId]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Note Details</DialogTitle>
            <DialogContent>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            {note.title}
                        </Typography>
                        <Typography>{note.text}</Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PinNoteDialog;
