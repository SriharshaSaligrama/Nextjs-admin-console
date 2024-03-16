import React from 'react'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const SubmitCancelButtons = (props) => {
    const { pending, updatingNotificationMap } = props

    const router = useRouter()

    return (
        <Box sx={{ ...styles.buttonsContainer }}>
            <Button
                sx={{ ...styles.buttons }}
                variant='contained'
                color='error'
                onClick={() => router.push('/notifications')}>
                Cancel
            </Button>
            <Button
                sx={{ ...styles.buttons }}
                variant='contained'
                type="submit"
                disabled={pending}
            >
                {
                    pending ?
                        updatingNotificationMap?.id ? 'Updating Notification Map ...' : 'Adding Notification Map ...' :
                        updatingNotificationMap?.id ? 'Update Notification Map' : 'Add Notification Map'
                }
            </Button>
        </Box>
    )
}

export default SubmitCancelButtons

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