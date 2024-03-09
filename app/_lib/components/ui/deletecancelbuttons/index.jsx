import React from 'react'
import { useFormStatus } from 'react-dom';
import { Box, Button } from '@mui/material'

const DeleteCancelButtons = (props) => {
    const { handleCancelClick, disabled, deleteText, deletePendingText, cancelText } = props

    const { pending } = useFormStatus()

    return (
        <Box sx={{ ...styles.actionButtonsContainer }}>
            <Button variant='contained' color='error' sx={{ width: '100%' }} onClick={handleCancelClick}>{cancelText || 'Cancel'}</Button>
            <Button variant='contained' type='submit' sx={{ width: '100%' }} disabled={!!disabled || pending}>{pending ? (deletePendingText || 'Deleting...') : (deleteText || 'Delete')}</Button>
        </Box>
    )
}

export default DeleteCancelButtons

const styles = {
    actionButtonsContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: "16px",
    }
}