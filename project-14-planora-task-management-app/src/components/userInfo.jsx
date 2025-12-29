import { useState } from "react";
import {
    Avatar,
    Box,
    Typography,
    Menu,
    IconButton,
} from "@mui/material";

function UserAvatarMenu({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);

    if (!user) return null;

    const open = Boolean(anchorEl);

    return (
        <>
            {/* Avatar Button */}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar style={{ backgroundColor: "var(--bg-100)", color: "var(--text-700)", fontWeight: "600", padding: "var(--space-lg)", boxShadow: "var(--shadow-lg)", border:"1px solid var(--border-200)"}}>
                    {user.name?.charAt(0).toUpperCase()}
                    {user.name?.split(" ")?.at(1).charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>

            {/* Popup Menu */}
            <Menu
                TransitionProps={{ timeout: 200 }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
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
                        p: 2,
                        minWidth: 220,
                        borderRadius: 2,
                    },
                }}
            >
                <Box>
                    <Typography fontWeight={600}>
                        {user.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        {user.email}
                    </Typography>
                </Box>
            </Menu>
        </>
    );
}

export default UserAvatarMenu;
