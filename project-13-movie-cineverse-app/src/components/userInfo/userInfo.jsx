import { useState, useContext } from "react";
import {
    Avatar,
    Box,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";

// local
import { UserContext } from "../../context/context";
import logoutWithFirebase from "../../firebase/firebaseLogout";
import styles from "./userInfo.module.css";

// react router
import { useNavigate } from "react-router";

function UserMenu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const { userDetails } = useContext(UserContext);
    const open = Boolean(anchorEl);
    const user = {
        avatar: "",
    };

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logoutWithFirebase();
        handleClose();
        navigate("/login");
    };

    return (
        <>
            <IconButton onClick={handleOpen} className={styles.userButton} sx={{ gap: 1, p: 0.5 }}>
                <Avatar src={user.avatar} className={styles.avatar}></Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: {
                        bgcolor: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        mt: 1.5,
                        '& .MuiMenuItem-root': {
                            '&:hover': {
                                bgcolor: 'var(--bg-hover)',
                            },
                        },
                    }
                }}
            >
                <Box px={2} py={1}>
                    <Box display="flex" gap={1} alignItems="center">
                        <Avatar src={user.avatar} className={styles.avatar} sx={{ width: 30, height: 30 }}></Avatar>
                        <Box>
                            <Typography className={styles.userName} sx={{ fontSize: '0.85rem !important' }}>
                                {userDetails?.name}
                            </Typography>
                            <Typography className={styles.userEmail} sx={{ fontSize: '0.7rem !important' }}>
                                {userDetails?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'var(--border-color)' }} />

                {/* Logout */}
                <MenuItem onClick={handleLogout} sx={{ width: "fit-content", backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',borderRadius: '5px', padding: '5px 10px',margin:`10px`,fontSize:`15px`, fontWeight: 500 }}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default UserMenu;
