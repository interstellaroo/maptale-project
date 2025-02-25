import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import config from '../../config';

const PinRemoveDialog = ({ open, onClose, pins, onRemove }) => {
    const [selectedPin, setSelectedPin] = useState(null);
    const [removing, setRemoving] = useState(false);
    const [error, setError] = useState(null);

    const handleRemove = async () => {
        if (!selectedPin) return;

        setRemoving(true);
        setError(null);

        try {
            await axios.delete(`${config.apiUrl}/api/item/pin/${selectedPin.id}`);
            onRemove(selectedPin.id);
            onClose();
        } catch (err) {
            setError('Failed to remove the pin.');
        } finally {
            setRemoving(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Remove Pin</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    select
                    label="Select Pin"
                    value={selectedPin || ''}
                    onChange={(e) => setSelectedPin(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    {pins.map((pin) => (
                        <MenuItem key={pin.id} value={pin}>
                            {`Pin at (${pin.x}, ${pin.y})`}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button sx={{ backgroundColor: '#3c493f', color: '#fff','&:hover': {backgroundColor: '#8fd1b0'} }} onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button sx={{ backgroundColor: '#3c493f', color: '#fff','&:hover': {backgroundColor: '#8fd1b0'} }} onClick={handleRemove} color="primary" disabled={removing}>
                    {removing ? <CircularProgress size={24} /> : 'Remove'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PinRemoveDialog;