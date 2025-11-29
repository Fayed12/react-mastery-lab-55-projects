import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Divider,
} from "@mui/material";

// react router
import { useNavigate } from "react-router";

// local
import Loading from "../../pages/loading/loading"
import { userContext } from "../../context/userContext";

// react 
import { useState, useContext } from "react";

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openLoading, setOpenLoading] = useState(false);
    const { user,setUser, setIsLogin } = useContext(userContext);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setOpenLoading(true);
        const isLoggedIn = sessionStorage.getItem("isLogin") || localStorage.getItem("isLogin");
        if (isLoggedIn === "true") {

            setTimeout(() => {
                sessionStorage.removeItem("isLogin");
                localStorage.removeItem("isLogin");
                sessionStorage.removeItem("user");
                localStorage.removeItem("user");
                setIsLogin(false);
                setUser(null);
                navigate("/home");
                handleClose();
            }, 1000);
            setTimeout(() => {
                setOpenLoading(false);
            }, 1200);
        } else if (isLoggedIn === "false") {
            return
        } else {
            return
        }
    };

    // navigate to profile
    const handleProfile = () => {
        setOpenLoading(true);
        setTimeout(() => {
            handleClose();
            navigate("/blog/profile");
        }, 1000);
        setTimeout(() => {
            setOpenLoading(false);
        }, 1200);
    };

    return (
        <>
            <Box>
                <IconButton onClick={handleClick} size="small">
                    <Avatar sx={{ bgcolor: "#a370f7", padding: "7px", width: "50px", height: "50px" }}>{user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase() }</Avatar>
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
                        <Typography fontWeight={600}>{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.email}
                        </Typography>
                    </Box>

                    <Divider />

                    <MenuItem onClick={handleProfile}>Profile</MenuItem>

                    <Divider />

                    <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
            {openLoading && <Loading />}
        </>
    );
}
