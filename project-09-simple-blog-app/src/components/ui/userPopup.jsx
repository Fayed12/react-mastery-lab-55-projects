import * as React from "react";
import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Divider,
} from "@mui/material";

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // logout logic
        console.log("User logged out");
        handleClose();
    };

    return (
        <Box>
            <IconButton onClick={handleClick} size="small">
                <Avatar
                    alt="User Avatar"
                    src="/images/user.jpg"
                    sx={{ width: 40, height: 40 }}
                />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        mt: 1.5,
                        overflow: "visible",
                        borderRadius: "10px",
                    },
                }}
            >
                {/* user info */}
                <Box px={2} py={1}>
                    <Typography fontWeight={600}>Mohamed Fayed</Typography>
                    <Typography variant="body2" color="text.secondary">
                        mohamed@gmail.com
                    </Typography>
                </Box>

                <Divider />

                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}
