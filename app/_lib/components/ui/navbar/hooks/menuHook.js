import { useState } from "react";

const useMenuHook = () => {
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

    const openUserMenu = Boolean(userMenuAnchorEl);

    const handleUserMenuClick = (event) => {
        setUserMenuAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchorEl(null);
    };

    return { userMenuAnchorEl, openUserMenu, handleUserMenuClick, handleUserMenuClose }
}

export default useMenuHook