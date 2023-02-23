import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import {useState} from "react";
import {Box, Button, Container, MenuItem, styled, Switch} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import Logo from "../assets/logo.svg";
import WhiteLogo from "../assets/logo_white.svg";
import {setMode} from "../features/chartSlice";


const ModeSwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const TopMenu = () => {
    const currentPath = useLocation().pathname;
    const students = useSelector(state => state.chart.students);
    const mode = useSelector(state => state.chart.mode);
    const [anchorElStudents, setAnchorElStudents] = useState(null);
    const dispatch = useDispatch();

    const handleOpenStudentsMenu = (event) => {
        setAnchorElStudents(event.currentTarget);
    };
    const handleCloseStudentsMenu = () => {
        setAnchorElStudents(null);
    };
    const handleModeChange = (event) => {
        const {checked} = event.target;
        dispatch(setMode(checked ? "dark" : "light"));
    };

    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img" sx={{maxHeight: 37, mr: 2}}
                        src={mode === "dark" ? Logo : WhiteLogo}
                        alt="Winc Academy"
                    />
                    <Box sx={{display: "flex", flexGrow: 1}}>
                        <Button
                            variant={"/" === currentPath ? 'contained' : 'outlined'}
                            component={Link}
                            to="/"
                            key="home"
                            sx={{my: 2, mx: 1, color: 'white', display: 'block'}}
                        >
                            Home
                        </Button>
                        <Button
                            variant={"/" !== currentPath ? 'contained' : 'outlined'}
                            key="students"
                            onClick={handleOpenStudentsMenu}
                            sx={{my: 2, mx: 1, color: 'white', display: 'block'}}
                        >
                            Students
                        </Button>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElStudents}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElStudents)}
                            onClose={handleCloseStudentsMenu}
                        >
                            {students.map((student) => (
                                <MenuItem
                                    selected={"/" + student.first_name === currentPath}
                                    component={Link}
                                    to={`/${student.first_name}`}
                                    key={student.first_name}
                                    onClick={handleCloseStudentsMenu}
                                >
                                    {student.first_name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box>
                        <ModeSwitch
                            onChange={handleModeChange}
                            checked={mode === "dark"}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default TopMenu;