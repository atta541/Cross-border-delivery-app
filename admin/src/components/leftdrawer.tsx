import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import PaymentIcon from '@mui/icons-material/Payment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Drawer as MuiDrawer, DrawerProps } from '@mui/material';

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
}

const drawerWidth = 175;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps & { open?: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const LeftDrawer: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems: MenuItem[] = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Products', icon: <StoreIcon />, path: '/products' },
    { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
    { text: 'Orders', icon: <FavoriteBorderIcon />, path: '/orders' },
    { text: 'Accounts', icon: <AccountCircleIcon />, path: '/connectaccounts' },


  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? (
              theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={item.text} placement="right" arrow>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 28,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    border: location.pathname === item.path ? '1px solid #30D47E' : 'none', // Green border on active item
                    borderRadius: '8px', // Add some rounding to the border for aesthetic purposes
                    backgroundColor: location.pathname === item.path ? '#e6f8f3' : 'transparent', // Light green background on active item
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#30D47E', // Set icon color to #30D47E
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default LeftDrawer;
