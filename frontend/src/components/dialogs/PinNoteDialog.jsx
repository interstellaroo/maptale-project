import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Typography, Box } from '@mui/material';
import axios from 'axios';
import NoteDisplay from '../NoteDisplay';

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
                    <NoteDisplay note={note} />
                )}
            </DialogContent>
            <DialogActions>
                <Button sx={{ backgroundColor: '#3c493f', color: '#fff','&:hover': {backgroundColor: '#8fd1b0'} }} onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PinNoteDialog;
