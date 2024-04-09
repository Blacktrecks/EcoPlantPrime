import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import AuthContext from '../context/AuthContext';
import Gravatar from 'react-gravatar';
import { AppBar, Toolbar, IconButton, Typography, Container, Box, Button, Menu, MenuItem, Tooltip, Avatar, Card, CardContent, CardActions, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { green } from '@mui/material/colors';

const HomePage = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu anchor element
    const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen size is mobile
    const history = useHistory(); // Get access to the history object

    const handleLogout = () => {
        logoutUser();
    };

    const handleCardClick = (page) => {
        // Redirect to sensor page
        history.push(`/sensor/${page}`);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: green[500] }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Eco Plant Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 2 }}>
                                <Avatar
                                    alt="User Avatar"
                                    src={authTokens.username ? <Gravatar email={authTokens.username.toString()} size={40} default="identicon" /> : ""}
                                >
                                    {authTokens.username ? authTokens.username.charAt(0).toUpperCase() : ""}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Container maxWidth="xl">
                <Box display="grid" gridTemplateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"} mt={4} gap={2}>
                    {[...Array(12)].map((_, index) => (
                        <Card key={index} onClick={() => handleCardClick(`Page${index + 1}`)}> {/* Add onClick event */}
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Sensor {index + 1}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Status:
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Details</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Container>
        </AppBar>
    );
}

export default HomePage;
