// import React, { useContext } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import SettingsIcon from '@mui/icons-material/Settings';
// import Button from '@mui/material/Button';
// import { useCookies } from 'react-cookie';
// import { AuthContext } from '../contexts/AuthContext';

// export default function Navbar() {
//   const { logout } = useContext(AuthContext);
//   const [, , removeCookie] = useCookies(['token']);

//   const handleLogout = () => {
//     removeCookie('token', { path: '/' });
//     logout(); 
//   };

//   return (
//     <Box sx={{
//       flexGrow: 1,
//       maxWidth: '1440px',
//       ml: 0,
//       borderRadius: '10px',
//       overflow: 'hidden',
//       border: '2px solid black',
//       marginTop: '4px',
//       backgroundColor: 'white'
//     }}>
//       <AppBar
//         position="relative"
//         color="transparent"
//         sx={{
//           borderRadius: '10px',
//           boxShadow: 'none',
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{
//               flexGrow: 1,
//               textAlign: 'left',
//               fontWeight: 'bold',
//               display: { xs: 'none', sm: 'block' },
//               marginLeft: '-5px',
//               fontSize: '2rem'
//             }}
//           >
//             Dashboard
//           </Typography>

//           <IconButton color="inherit" aria-label="settings">
//             <SettingsIcon />
//           </IconButton>
          
//           <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }



import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../contexts/AuthContext.tsx';

// Define AuthContext type
interface AuthContextType {
  logout: () => void;
}

export default function Navbar(): JSX.Element {
  const { logout } = useContext(AuthContext) as AuthContextType;
  const [, , removeCookie] = useCookies(['token']);




  const handleLogout = (): void => {
    removeCookie('token', { path: '/' });
    logout();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: '1440px',
        ml: 0,
        borderRadius: '10px',
        overflow: 'hidden',
        border: '2px solid black',
        marginTop: '4px',
        backgroundColor: 'white',
      }}
    >
      <AppBar
        position="relative"
        color="transparent"
        sx={{
          borderRadius: '10px',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' },
              marginLeft: '-5px',
              fontSize: '2rem',
            }}
          >
            Dashboard
          </Typography>

          <IconButton color="inherit" aria-label="settings">
            <SettingsIcon />
          </IconButton>

          <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
