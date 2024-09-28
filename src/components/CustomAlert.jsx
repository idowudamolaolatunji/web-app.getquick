import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle, Snackbar } from '@mui/material';

function CustomAlert({ type, message, duration=5000 }) {
    const [open, setOpen] = useState(true);
    // success, info, warning, error

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={type}
                sx={{ width: '100%', fontFamily: 'inherit', fontSize: '1.4rem', fontWeight: 500, display: 'flex', alignItems: 'center' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert