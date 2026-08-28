import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import Dashboard from "@mui/icons-material/Dashboard";
import { Link, useForm } from "@inertiajs/react";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const drawerWidth = 240;

export default function PermanentDrawerLeft({ children }) {
    const { post } = useForm({});
    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Login sebagai admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton componenst={Link} href="/admin/dashboard">
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton componenst={Link} href="/admin/user">
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="User" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton componenst={Link} href="/admin/kelas">
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="kelas" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            componenst={Link}
                            href="/admin/kategori"
                        >
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Kategori" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            componenst={Link}
                            href="/admin/transaksi"
                        >
                            <ListItemIcon>
                                <ReceiptLongIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transaksi" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            componenst={Link}
                            href="/admin/pendaftaran"
                        >
                            <ListItemIcon>
                                <FactCheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Pendaftaran" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <form
                                onSubmit={handleLogout}
                                className="flex justify-between items-center"
                            >
                                <Button type="submit">
                                    <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Log out" />
                                </Button>
                            </form>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    );
}
