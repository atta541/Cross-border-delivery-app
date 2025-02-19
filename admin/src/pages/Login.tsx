// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext.tsx';
// import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Paper } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';

// const theme = createTheme();

// function Login() {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/auth/login/admin', {
//         email,
//         password,
//       });
//       if (response.data.token) {
//         login(response.data.token); 
//       }
//     } catch (error) {
//       setError('Invalid credentials, please try again.');
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Paper elevation={8} sx={{ p: 4, borderRadius: 4, mt: 8 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
//               Admin Login
//             </Typography>
//             {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 sx={{ backgroundColor: '#f4f6f8', borderRadius: 1 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 sx={{ backgroundColor: '#f4f6f8', borderRadius: 1 }}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   p: 1.5,
//                   fontSize: '1rem',
//                   fontWeight: 'bold',
//                   borderRadius: '8px',
//                 }}
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default Login;



// import React, { useState, useContext, FormEvent } from 'react';
// import { AuthContext, AuthContextProps } from '../contexts/AuthContext.tsx';
// import { 
//   Avatar, 
//   Button, 
//   CssBaseline, 
//   TextField, 
//   Box, 
//   Typography, 
//   Container, 
//   Paper 
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';

// const theme = createTheme();

// const Login: React.FC = () => {
//   // Use AuthContext and ensure proper type safety
//   const authContext = useContext<AuthContextProps | undefined>(AuthContext);

//   if (!authContext) {
//     throw new Error('AuthContext must be used within an AuthProvider');
//   }

//   const { login } = authContext;

//   // State variables with types
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');

//   // Handle form submission
//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/auth/login/admin', {
//         email,
//         password,
//       });
//       if (response.data.token) {
//         login(response.data.token); // Call login from AuthContext
//       }
//     } catch (err) {
//       setError('Invalid credentials, please try again.');
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Paper elevation={8} sx={{ p: 4, borderRadius: 4, mt: 8 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
//               Admin Login
//             </Typography>
//             {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 sx={{ backgroundColor: '#f4f6f8', borderRadius: 1 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 sx={{ backgroundColor: '#f4f6f8', borderRadius: 1 }}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   p: 1.5,
//                   fontSize: '1rem',
//                   fontWeight: 'bold',
//                   borderRadius: '8px',
//                 }}
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default Login;


import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { 
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  Box, 
  Typography, 
  Container, 
  Paper 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

const Login: React.FC = () => {
  // Use AuthContext and ensure proper type safety
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login } = authContext;

  // State variables with types
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login/admin', {
        email,
        password,
      });
      if (response.data.token) {
        login(response.data.token); // Call login from AuthContext
      }
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4, mt: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Admin Login
            </Typography>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: '#f4f6f8', borderRadius: 1 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: '#f4f6f8', borderRadius: 1 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
