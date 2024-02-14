const globalStyles = {
    thinScrollBar: {
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px lightgrey',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'darkgrey',
            borderRadius: '10px',
            // outline: '0.5px solid slategrey'
        }
    }
}

export default globalStyles