import React from 'react'
import { useFormStatus } from 'react-dom';
import { Box, Button } from '@mui/material'
import useHandleCancelClick from '../../hooks/handleCancelClick';

const FormSubmitCancelButtons = (props) => {
    const { cancelText, submitText, submitPendingText, returnLink, pending: pendingWithoutUseFormStatus } = props

    const { pending } = useFormStatus()

    const handleCancelClick = useHandleCancelClick(returnLink)

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
                disabled={!!pendingWithoutUseFormStatus || pending}
            >
                {(pending || pendingWithoutUseFormStatus) ? submitPendingText : submitText}
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