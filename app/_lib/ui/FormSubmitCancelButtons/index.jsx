import React from 'react'
import { Box, Button } from '@mui/material'

const FormSubmitCancelButtons = (props) => {
    const { cancelText, submitText, handleCancelClick } = props

    return (
        <Box sx={{ ...styles.buttonsContainer }}>
            <Button sx={{ ...styles.buttons }} variant='contained' color='error' onClick={handleCancelClick}>{cancelText || 'Cancel'}</Button>
            <Button sx={{ ...styles.buttons }} variant='contained' type="submit">{submitText}</Button>
        </Box>
    )
}

export default FormSubmitCancelButtons

const styles = {
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        columnGap: '16px',
    },
    buttons: {
        width: '50%',
    },
}