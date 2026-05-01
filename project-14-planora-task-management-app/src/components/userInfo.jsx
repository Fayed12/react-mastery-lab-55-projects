// local
import ProfileSidePopup from "./use-profile/profileSidePopup";
import MainButton from "../ui/button/MainButton";

// react
import { useState } from "react";

// MUI
import {
    Avatar,
    Box,
    Typography,
    Menu,
    IconButton,
} from "@mui/material";

function UserAvatarMenu({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    if (!user) return null;

    const open = Boolean(anchorEl);

    const handleOpenProfile = () => {
        setIsProfileOpen(true);
        setAnchorEl(null);
    };

    return (
        <>
            {/* Avatar Button */}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar style={{ backgroundColor: "var(--bg-100)", color: "var(--text-700)", fontWeight: "600", padding: "var(--space-lg)", boxShadow: "var(--shadow-lg)", border:"1px solid var(--border-200)"}}>
                    {user.name?.charAt(0).toUpperCase()}
                    {user.name?.split(" ")?.at(1)?.charAt(0).toUpperCase()}
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                    <div style={{ marginTop: "8px" }} className="profileButton">
                        <MainButton 
                            type="button"
                            title="View Profile" 
                            content="View Profile" 
                            clickEvent={handleOpenProfile}
                            action="primary"
                        />
                    </div>
                </Box>
            </Menu>

            <ProfileSidePopup 
                isOpen={isProfileOpen} 
                onClose={() => setIsProfileOpen(false)} 
            />
        </>
    );
}

export default UserAvatarMenu;
