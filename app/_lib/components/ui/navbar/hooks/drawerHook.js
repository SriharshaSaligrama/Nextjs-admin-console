import { useState } from 'react'

const useNavbar = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return {
        open,
        handleDrawerOpen,
        handleDrawerClose
    }
}

export default useNavbar