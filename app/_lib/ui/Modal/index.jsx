'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

const Modal = ({ children, title }) => {
    const router = useRouter();
    const theme = useTheme()
    const dialogRef = useRef(null);
    console.log({ theme })
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the click is outside the modal
            const clickTarget = event.target;

            if (!clickTarget.closest('dialog') && clickTarget !== dialogRef.current) {
                router.back();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [router]);


    function onDismiss() {
        router.back();
    }

    const modalBgColor = theme.palette.mode === 'dark' ? theme.palette.action.selected : theme.palette.background.paper

    return createPortal(
        <Box sx={{ ...styles.modalBackdrop }}>
            <dialog ref={dialogRef} style={{ ...styles.modal, backgroundColor: modalBgColor, color: theme.palette.text.primary }} onClose={onDismiss}>
                <Stack spacing={2}>
                    <Box sx={{ ...styles.header }}>
                        <Typography sx={{ ...styles.title }}>{title}</Typography>
                        <IconButton color='error' onClick={onDismiss}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
