import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import './ProfileComponent.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../app/authSlice';
import { useEffect, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { profileComponentFunctions } from '../../../functions/ProfileComponentFunctions';
import MessageIcon from '@mui/icons-material/Message';

export default function ProfileComponent() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userAvatar, setUserAvatar] = useState<string>('')
    const authSlice = useSelector((state: any) => state.auth);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function Logout() {
        dispatch(logout())
        profileComponentFunctions.ToastLogOut()
        navigate('/')
    }

    useEffect(() => {
        if (authSlice !== null) {
            setUserAvatar(authSlice.username.charAt(0).toUpperCase());
        }
    }, [authSlice]);

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="large"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar style={{ backgroundColor: '#009DDA' }} sx={{ width: 40, height: 40 }}>{userAvatar}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='ProfileButtonProfile'>
                    <NavLink to={'/profile'}>
                        <MenuItem>
                            <ListItemIcon>
                                <PersonIcon fontSize='large' />
                            </ListItemIcon>
                            
                        </MenuItem>
                    </NavLink>
                </div>
                <Divider />
                <div className='ProfileButton'>

                    <NavLink to={'/messages'}>
                        <MenuItem>
                            <ListItemIcon>
                                <MessageIcon />
                            </ListItemIcon>
                            Messages
                        </MenuItem>
                    </NavLink>
                </div>
                <MenuItem onClick={() => Logout()}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}