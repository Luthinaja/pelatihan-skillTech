import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dashboard from "@mui/icons-material/Dashboard";
import Tooltip from "@mui/material/Tooltip";
import HistoryIcon from '@mui/icons-material/History';
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { FaBookBookmark } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { useForm } from "@inertiajs/react";

// import { Inertia } from '@inertiajs/inertia';

export default function AccountMenu({ auth }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const {post} = useForm({
        
    })
    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    return (
        <div className="">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {" "}
                    Hi, {auth.name}{" "}
                </Typography>
               <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <div
                        className="w-8 h-8 rounded-full overflow-hidden"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                        {auth?.avatar ? (
                            <img
                            src={auth.avatar}
                            alt={auth.name || 'User Avatar'}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-avatar.png'; // fallback
                            }}
                            />
                        ) : (
                            <FaUser className="text-gray-500 w-6 h-6" />
                        )}
                        </div>
                    </IconButton>
                </Tooltip>


            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Link
                        className="flex items-center space-x-2"
                        href="/profile"
                    >
                        <Avatar />{" "}
                        <p className="text-base font-semibold opacity-75">
                            Profile
                        </p>
                    </Link>
                </MenuItem>
                <Divider />
                {auth?.role === 'admin' && (
                    <MenuItem onClick={handleClose}>
                       <Link
                            className="flex items-center space-x-2 justify-between text-gray-600"
                            href="/admin/dashboard"
                        >
                            <Dashboard className="text-base" />
                            <p className="text-base font-semibold">
                                Admin Dashboard
                            </p>
                        </Link>
                    </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                    <Link
                        className="flex items-center space-x-2 justify-between text-gray-600"
                        href="/my-courses"
                    >
                        <FaBookBookmark className="text-base" />
                        <p className="text-base font-semibold">
                            Kursus Saya
                        </p>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        className="flex items-center space-x-2 justify-between text-gray-600"
                        href="/my-sertifikat"
                    >
                        <PiCertificateFill className="text-lg" />
                        <p className="text-base font-semibold">Sertifikat</p>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        className="flex items-center space-x-2 justify-between text-gray-600"
                        href="/history-transaksi"
                    >
                        <HistoryIcon className="text-lg" />
                        <p className="text-base font-semibold">History Transaksi</p>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <form onSubmit={handleLogout}>
                        <button
                            type="submit"
                            className="flex items-center space-x-2 justify-between text-gray-600"
                            href="/logout"
                        >
                            <IoIosLogOut className="text-lg" />
                            <p className="text-base font-semibold">Log out</p>
                        </button>
                    </form>
                </MenuItem>
            </Menu>
        </div>
    );
}
