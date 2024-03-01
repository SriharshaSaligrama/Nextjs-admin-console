import React from 'react'
import { useFormStatus } from 'react-dom';
import { Box, Button } from '@mui/material'

const FormSubmitCancelButtons = (props) => {
    const { cancelText, submitText, submitPendingText, handleCancelClick } = props

    const { pending } = useFormStatus()

    return (
        <Box sx={{ ...styles.buttonsContainer }}>
            <Button
                sx={{ ...styles.buttons }}
                variant='contained'
                color='error'
                onClick={handleCancelClick}
            >
                {cancelText || 'Cancel'}
            </Button>
            <Button
                sx={{ ...styles.buttons }}
                variant='contained'
                type="submit"
                disabled={pending}
            >
                {pending ? submitPendingText : submitText}
            </Button>
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
        fontSize: '11px',
    },
}