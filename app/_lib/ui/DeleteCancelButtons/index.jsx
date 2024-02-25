import React from 'react'
import { Box, Button } from '@mui/material'

const DeleteCancelButtons = (props) => {
    const { handleCancelClick, handleDeleteClick, disabled, deleteText, cancelText } = props

    return (
        <Box sx={{ ...styles.actionButtonsContainer }}>
            <Button variant='contained' color='error' sx={{ width: '100%' }} onClick={handleCancelClick}>{cancelText || 'Cancel'}</Button>
            <Button variant='contained' sx={{ width: '100%' }} disabled={!!disabled} onClick={handleDeleteClick}>{deleteText || 'Delete'}</Button>
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