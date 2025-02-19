// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   CircularProgress,
//   Typography,
//   Paper,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Link,
// } from '@mui/material';

// function AccountBalance() {
//   const { accountId } = useParams(); // Get the accountId from the URL
//   const navigate = useNavigate(); // Navigate to specific payout details page
//   const [balance, setBalance] = useState(null);
//   const [payouts, setPayouts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch Account Balance
//   useEffect(() => {
//     const fetchAccountData = async () => {
//       try {
//         const [balanceResponse, payoutsResponse] = await Promise.all([
//           axios.get('http://localhost:3001/payments/customer-account-balance', {
//             params: { accountId },
//           }),
//           axios.get('http://localhost:3001/payments/payout-details', {
//             params: { accountId },
//           }),
//         ]);

//         setBalance(balanceResponse.data);
//         setPayouts(payoutsResponse.data.data); // Assuming payouts data is inside `data.data`

//         console.log(balanceResponse.data)
//         console.log(payoutsResponse.data)
//       } catch (error) {
//         setError('Failed to fetch account data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAccountData();
//   }, [accountId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Paper style={{ padding: '20px', marginTop: '20px' }}>
//       <Typography variant="h6" gutterBottom>
//         Account Balance Details for {accountId}
//       </Typography>

//       {/* Livemode */}
//       <Typography variant="body1">
//         <strong>Live Mode:</strong> {balance.livemode ? 'Yes' : 'No'}
//       </Typography>
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Available Balance */}
//       <Typography variant="h6" gutterBottom>
//         Available Balance
//       </Typography>
//       {balance.available.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Instant Available */}
//       <Typography variant="h6" gutterBottom>
//         Instant Available for Payouts
//       </Typography>
//       {balance.instant_available.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Pending Balance */}
//       <Typography variant="h6" gutterBottom>
//         Pending Balance
//       </Typography>
//       {balance.pending.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '20px 0' }} />

//       {/* Payouts Section */}
//       <Typography variant="h6" gutterBottom>
//         Payout Details
//       </Typography>
//       {payouts.length === 0 ? (
//         <Typography>No payouts available for this account.</Typography>
//       ) : (
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Payout ID</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Currency</TableCell>
//                 <TableCell>Created</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payouts.map((payout) => (
//                 // <TableRow
//                 //   key={payout.id}
//                 //   onClick={() => navigate(`/payments/payout/${payout.id}`)}
//                 //   style={{ cursor: 'pointer' }}
//                 // >
//                 //   <TableCell>
//                 //     <Link underline="hover" color="primary">
//                 //       {payout.id}
//                 //     </Link>
//                 //   </TableCell>
//                 //   <TableCell>{(payout.amount / 100).toFixed(2)}</TableCell>
//                 //   <TableCell>{payout.status}</TableCell>
//                 //   <TableCell>{payout.currency.toUpperCase()}</TableCell>
//                 //   <TableCell>{new Date(payout.created * 1000).toLocaleString()}</TableCell>
//                 // </TableRow>
//                 <TableRow
//   key={payout.id}
//   onClick={() => navigate(`/payout-details/${accountId}/${payout.id}`)} // Include accountId and payoutId
//   style={{ cursor: 'pointer' }}
// >
//   <TableCell>
//     <Link underline="hover" color="primary">
//       {payout.id}
//     </Link>
//   </TableCell>
//   <TableCell>{(payout.amount / 100).toFixed(2)}</TableCell>
//   <TableCell>{payout.status}</TableCell>
//   <TableCell>{payout.currency.toUpperCase()}</TableCell>
//   <TableCell>{new Date(payout.created * 1000).toLocaleString()}</TableCell>
// </TableRow>

//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Paper>
//   );
// }

// export default AccountBalance;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   CircularProgress,
//   Typography,
//   Paper,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Link,
// } from '@mui/material';

// // Define types for the response data
// interface BalanceEntry {
//   amount: number;
//   currency: string;
//   source_types: {
//     card: number;
//   };
// }

// interface AccountBalanceData {
//   livemode: boolean;
//   available: BalanceEntry[];
//   instant_available: BalanceEntry[];
//   pending: BalanceEntry[];
// }

// interface Payout {
//   id: string;
//   amount: number;
//   status: string;
//   currency: string;
//   created: number;
// }

// function AccountBalance() {
//   const { accountId } = useParams<{ accountId: string }>(); // Get the accountId from the URL
//   const navigate = useNavigate(); // Navigate to specific payout details page
//   const [balance, setBalance] = useState<AccountBalanceData | null>(null);
//   const [payouts, setPayouts] = useState<Payout[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch Account Balance
//   useEffect(() => {
//     const fetchAccountData = async () => {
//       try {
//         const [balanceResponse, payoutsResponse] = await Promise.all([
//           axios.get('http://localhost:3001/payments/customer-account-balance', {
//             params: { accountId },
//           }),
//           axios.get('http://localhost:3001/payments/payout-details', {
//             params: { accountId },
//           }),
//         ]);

//         setBalance(balanceResponse.data);
//         setPayouts(payoutsResponse.data.data); // Assuming payouts data is inside `data.data`

//         console.log(balanceResponse.data);
//         console.log(payoutsResponse.data);
//       } catch (error) {
//         setError('Failed to fetch account data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAccountData();
//   }, [accountId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Paper style={{ padding: '20px', marginTop: '20px' }}>
//       <Typography variant="h6" gutterBottom>
//         Account Balance Details for {accountId}
//       </Typography>

//       {/* Livemode */}
//       <Typography variant="body1">
//         <strong>Live Mode:</strong> {balance?.livemode ? 'Yes' : 'No'}
//       </Typography>
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Available Balance */}
//       <Typography variant="h6" gutterBottom>
//         Available Balance
//       </Typography>
//       {balance?.available.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Instant Available */}
//       <Typography variant="h6" gutterBottom>
//         Instant Available for Payouts
//       </Typography>
//       {balance?.instant_available.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Pending Balance */}
//       <Typography variant="h6" gutterBottom>
//         Pending Balance
//       </Typography>
//       {balance?.pending.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '20px 0' }} />

//       {/* Payouts Section */}
//       <Typography variant="h6" gutterBottom>
//         Payout Details
//       </Typography>
//       {payouts.length === 0 ? (
//         <Typography>No payouts available for this account.</Typography>
//       ) : (
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Payout ID</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Currency</TableCell>
//                 <TableCell>Created</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payouts.map((payout) => (
//                 <TableRow
//                   key={payout.id}
//                   onClick={() => navigate(`/payout-details/${accountId}/${payout.id}`)} // Include accountId and payoutId
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <TableCell>
//                     <Link underline="hover" color="primary">
//                       {payout.id}
//                     </Link>
//                   </TableCell>
//                   <TableCell>{(payout.amount / 100).toFixed(2)}</TableCell>
//                   <TableCell>{payout.status}</TableCell>
//                   <TableCell>{payout.currency.toUpperCase()}</TableCell>
//                   <TableCell>{new Date(payout.created * 1000).toLocaleString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Paper>
//   );
// }

// export default AccountBalance;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   CircularProgress,
//   Typography,
//   Paper,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
  
// } from '@mui/material';

// // Define types for the response data
// interface BalanceEntry {
//   amount: number;
//   currency: string;
//   source_types: {
//     card: number;
//   };
// }

// interface AccountBalanceData {
//   livemode: boolean;
//   available: BalanceEntry[];
//   instant_available: BalanceEntry[];
//   pending: BalanceEntry[];
// }

// interface Payout {
//   id: string;
//   amount: number;
//   status: string;
//   currency: string;
//   created: number;
// }

// function AccountBalance() {
//   const { accountId } = useParams<{ accountId: string }>(); // Get the accountId from the URL
//   const navigate = useNavigate(); // Navigate to specific payout details page
//   const [balance, setBalance] = useState<AccountBalanceData | null>(null);
//   const [payouts, setPayouts] = useState<Payout[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch Account Balance
//   useEffect(() => {
//     const fetchAccountData = async () => {
//       try {
//         const [balanceResponse, payoutsResponse] = await Promise.all([
//           axios.get('http://localhost:3001/payments/customer-account-balance', {
//             params: { accountId },
//           }),
//           axios.get('http://localhost:3001/payments/payout-details', {
//             params: { accountId },
//           }),
//         ]);

//         setBalance(balanceResponse.data);
//         setPayouts(payoutsResponse.data.data); // Assuming payouts data is inside `data.data`

//         console.log(balanceResponse.data);
//         console.log(payoutsResponse.data);
//       } catch (error) {
//         setError('Failed to fetch account data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAccountData();
//   }, [accountId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Paper style={{ padding: '20px', marginTop: '20px' }}>
    
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Available Balance */}
//       <Typography variant="h6" gutterBottom>
//         Available Balance
//       </Typography>
//       {balance?.available.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Instant Available */}
//       <Typography variant="h6" gutterBottom>
//         Instant Available for Payouts
//       </Typography>
//       {balance?.instant_available.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '10px 0' }} />

//       {/* Pending Balance */}
//       <Typography variant="h6" gutterBottom>
//         Pending Balance
//       </Typography>
//       {balance?.pending.map((entry, index) => (
//         <Typography key={index} variant="body2">
//           Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//         </Typography>
//       ))}
//       <Divider style={{ margin: '20px 0' }} />

//       {/* Payouts Section */}
//       <Typography variant="h6" gutterBottom>
//         Payout Details
//       </Typography>
//       {payouts.length === 0 ? (
//         <Typography>No payouts available for this account.</Typography>
//       ) : (
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Currency</TableCell>
//                 <TableCell>Created</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payouts.map((payout) => (
//                 <TableRow
//                   key={payout.id}
//                   onClick={() => navigate(`/payout-details/${accountId}/${payout.id}`)} // Include accountId and payoutId
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <TableCell>{(payout.amount / 100).toFixed(2)}</TableCell>
//                   <TableCell>{payout.status}</TableCell>
//                   <TableCell>{payout.currency.toUpperCase()}</TableCell>
//                   <TableCell>{new Date(payout.created * 1000).toLocaleString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Paper>
//   );
// }

// export default AccountBalance;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   CircularProgress,
//   Typography,
//   Paper,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Card,
//   CardContent,
// } from '@mui/material';

// // Define types for the response data
// interface BalanceEntry {
//   amount: number;
//   currency: string;
//   source_types: {
//     card: number;
//   };
// }

// interface AccountBalanceData {
//   livemode: boolean;
//   available: BalanceEntry[];
//   instant_available: BalanceEntry[];
//   pending: BalanceEntry[];
// }

// interface Payout {
//   id: string;
//   amount: number;
//   status: string;
//   currency: string;
//   created: number;
// }

// function AccountBalance() {
//   const { accountId } = useParams<{ accountId: string }>(); // Get the accountId from the URL
//   const navigate = useNavigate(); // Navigate to specific payout details page
//   const [balance, setBalance] = useState<AccountBalanceData | null>(null);
//   const [payouts, setPayouts] = useState<Payout[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch Account Balance
//   useEffect(() => {
//     const fetchAccountData = async () => {
//       try {
//         const [balanceResponse, payoutsResponse] = await Promise.all([
//           axios.get('http://localhost:3001/payments/customer-account-balance', {
//             params: { accountId },
//           }),
//           axios.get('http://localhost:3001/payments/payout-details', {
//             params: { accountId },
//           }),
//         ]);

//         setBalance(balanceResponse.data);
//         setPayouts(payoutsResponse.data.data); // Assuming payouts data is inside `data.data`
//       } catch (error) {
//         setError('Failed to fetch account data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAccountData();
//   }, [accountId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Paper style={{ padding: '20px', marginTop: '20px' }}>
//       {/* Card Layout for Balance Information */}
//       <Grid container spacing={3} style={{ marginBottom: '20px' }}>
//         {/* Available Balance */}
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Available Balance
//               </Typography>
//               {balance?.available.map((entry, index) => (
//                 <Typography key={index} variant="body2">
//                   Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//                 </Typography>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Instant Available for Payouts */}
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Instant Available for Payouts
//               </Typography>
//               {balance?.instant_available.map((entry, index) => (
//                 <Typography key={index} variant="body2">
//                   Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//                 </Typography>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Pending Balance */}
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Pending Balance
//               </Typography>
//               {balance?.pending.map((entry, index) => (
//                 <Typography key={index} variant="body2">
//                   Amount: {(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()} (Card: {(entry.source_types.card / 100).toFixed(2)})
//                 </Typography>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Divider style={{ margin: '20px 0' }} />

//       {/* Payouts Section */}
//       <Typography variant="h6" gutterBottom>
//         Payout Details
//       </Typography>
//       {payouts.length === 0 ? (
//         <Typography>No payouts available for this account.</Typography>
//       ) : (
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Currency</TableCell>
//                 <TableCell>Created</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payouts.map((payout) => (
//                 <TableRow
//                   key={payout.id}
//                   onClick={() => navigate(`/payout-details/${accountId}/${payout.id}`)} // Include accountId and payoutId
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <TableCell>{(payout.amount / 100).toFixed(2)}</TableCell>
//                   <TableCell>{payout.status}</TableCell>
//                   <TableCell>{payout.currency.toUpperCase()}</TableCell>
//                   <TableCell>{new Date(payout.created * 1000).toLocaleString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Paper>
//   );
// }

// export default AccountBalance;






'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CircularProgress,
  Typography,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material'
import { styled } from '@mui/system'

// Define types for the response data
interface BalanceEntry {
  amount: number
  currency: string
  source_types: {
    card: number
  }
}

interface AccountBalanceData {
  livemode: boolean
  available: BalanceEntry[]
  instant_available: BalanceEntry[]
  pending: BalanceEntry[]
}

interface Payout {
  id: string
  amount: number
  status: string
  currency: string
  created: number
}

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
    h6: {
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
})

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: '12px',
}))

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}))

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& .MuiTableCell-head': {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiTableRow-root:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

function AccountBalance() {
  const { accountId } = useParams<{ accountId: string }>()
  const navigate = useNavigate()
  const [balance, setBalance] = useState<AccountBalanceData | null>(null)
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const [balanceResponse, payoutsResponse] = await Promise.all([
          axios.get('http://localhost:3001/payments/customer-account-balance', {
            params: { accountId },
          }),
          axios.get('http://localhost:3001/payments/payout-details', {
            params: { accountId },
          }),
        ])

        setBalance(balanceResponse.data)
        setPayouts(payoutsResponse.data.data)
      } catch (error) {
        setError('Failed to fetch account data')
      } finally {
        setLoading(false)
      }
    }

    fetchAccountData()
  }, [accountId])

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Account Balance
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          {/* Available Balance */}
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <StyledCardContent>
                <Typography variant="h6" gutterBottom>
                  Available Balance
                </Typography>
                {balance?.available.map((entry, index) => (
                  <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>{(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()}</strong>
                    <br />
                    Card: {(entry.source_types.card / 100).toFixed(2)}
                  </Typography>
                ))}
              </StyledCardContent>
            </StyledCard>
          </Grid>

          {/* Instant Available for Payouts */}
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <StyledCardContent>
                <Typography variant="h6" gutterBottom>
                  Instant Available
                </Typography>
                {balance?.instant_available.map((entry, index) => (
                  <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>{(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()}</strong>
                    <br />
                    Card: {(entry.source_types.card / 100).toFixed(2)}
                  </Typography>
                ))}
              </StyledCardContent>
            </StyledCard>
          </Grid>

          {/* Pending Balance */}
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <StyledCardContent>
                <Typography variant="h6" gutterBottom>
                  Pending Balance
                </Typography>
                {balance?.pending.map((entry, index) => (
                  <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>{(entry.amount / 100).toFixed(2)} {entry.currency.toUpperCase()}</strong>
                    <br />
                    Card: {(entry.source_types.card / 100).toFixed(2)}
                  </Typography>
                ))}
              </StyledCardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Payouts Section */}
        <Typography variant="h6" gutterBottom>
          Payout Details
        </Typography>
        {payouts.length === 0 ? (
          <Typography>No payouts available for this account.</Typography>
        ) : (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow
                    key={payout.id}
                    onClick={() => navigate(`/payout-details/${accountId}/${payout.id}`)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell>{(payout.amount / 100).toFixed(2)}</TableCell>
                    <TableCell>{payout.status}</TableCell>
                    <TableCell>{payout.currency.toUpperCase()}</TableCell>
                    <TableCell>{new Date(payout.created * 1000).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </StyledPaper>
    </ThemeProvider>
  )
}

export default AccountBalance

