'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import useModal from './hook';

const Modal = ({ children, title }) => {
    const router = useRouter();
    const theme = useTheme()
    const dialogRef = useModal(null);

    return createPortal(
        <Box sx={{ ...styles.modalBackdrop, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)' }}>
            <dialog ref={dialogRef} style={{ ...styles.modal, backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }} onClose={() => router.back()}>
                <Stack spacing={2}>
                    <Box sx={{ ...styles.header }}>
                        <Typography sx={{ ...styles.title }}>{title}</Typography>
                        <IconButton color='error' onClick={() => router.back()}>
                            <CloseOutlined />
                        </IconButton>
                    </Box>
                    {children}
                </Stack>
            </dialog>
        </Box>,
        document.getElementById('modal-root')
    );
}

export default Modal

const styles = {
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1200,
    },
    modal: {
        width: '500px',
        maxWidth: '500px',
        height: 'auto',
        maxHeight: '500px',
        borderRadius: '8px',
        border: 'none',
        position: 'relative',
        display: 'block',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: 600,
    }
}
