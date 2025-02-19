// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Button, CircularProgress } from '@mui/material';
// import { Settings, Add } from '@mui/icons-material';

// function CardWithTransactions() {
//     const [transactions, setTransactions] = useState([]);
//     const [balance, setBalance] = useState(null); // State for account balance
//     const [loading, setLoading] = useState(true);
//     const [balanceLoading, setBalanceLoading] = useState(true);

//     useEffect(() => {
//         // Fetch transactions
//         const fetchTransactions = async () => {
//             try {
//                 const response = await fetch('http://localhost:3001/payments/transactions?limit=10');
//                 const data = await response.json();
//                 if (data && data.data) {
//                     setTransactions(data.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Fetch account balance
//         const fetchBalance = async () => {
//             try {
//                 const response = await fetch('http://localhost:3001/payments/balance');
//                 const data = await response.json();
                
//                 // Extract the balance for GBP (or adjust as needed)
//                 const availableBalance = data.available.find(item => item.currency === 'gbp');
                
//                 // Set the balance state with the available amount
//                 if (availableBalance) {
//                     setBalance(availableBalance.amount / 100); // Convert to the correct format (from cents to GBP)
//                 }
//             } catch (error) {
//                 console.error('Error fetching balance:', error);
//             } finally {
//                 setBalanceLoading(false);
//             }
//         };

//         fetchTransactions();
//         fetchBalance();
//     }, []);

//     return (
//         <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
//             <Box sx={{ bgcolor: 'black', color: 'white', p: 2 }}>
//                 <Typography variant="caption" sx={{ display: 'block', textAlign: 'left', fontSize: '2rem', fontWeight: 'bold' }}>
//                 Stripe Account Balance
//                 </Typography>
//                 <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, textAlign: 'left' }}>
//                     3329 2010 3920 4438
//                 </Typography>
//                 <Typography variant="h4" sx={{ my: 2, fontWeight: 'bold', textAlign: 'left' }}>
//                     {balanceLoading ? (
//                         <CircularProgress size={24} sx={{ color: 'white' }} />
//                     ) : (
//                         `£${balance?.toLocaleString('en-GB')}`
//                     )}
//                 </Typography>

//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         startIcon={<Settings />}
//                         sx={{
//                             color: 'white',
//                             borderColor: 'rgba(255,255,255,0.5)',
//                             '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
//                         }}
//                     >
//                         Manage Card
//                     </Button>
//                     <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<Add />}
//                         sx={{
//                             bgcolor: '#00a86b',
//                             '&:hover': { bgcolor: '#008f5b' }
//                         }}
//                     >
//                         Add New Card
//                     </Button>
//                 </Box>
//             </Box>
//             <CardContent sx={{ flexGrow: 1, p: 2, overflowY: 'hidden' }}>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
//                     Transaction History
//                 </Typography>

//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <List
//                         sx={{
//                             width: '100%',
//                             height: '310px', // Adjust this to control the scrollable area height
//                             overflowY: 'auto',
//                             bgcolor: 'background.paper',
//                             '& .MuiListItem-root': { px: 0, py: 1 }
//                         }}
//                     >
//                         {transactions.map((transaction) => (
//                             <ListItem key={transaction.id} sx={{ minHeight: '48px' }}>
//                                 <ListItemAvatar sx={{ minWidth: '40px' }}>
//                                     <Avatar
//                                         sx={{
//                                             width: 32,
//                                             height: 32,
//                                             bgcolor: transaction.type === 'charge' ? '#e0f7fa' : '#ffebee',
//                                             color: transaction.type === 'charge' ? '#00796b' : '#b71c1c',
//                                             fontSize: '0.990rem'
//                                         }}
//                                     >
//                                         {transaction.type[0].toUpperCase()}
//                                     </Avatar>
//                                 </ListItemAvatar>
//                                 <ListItemText
//                                     primary={
//                                         <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                             {transaction.type.replace('_', ' ').toUpperCase()}
//                                         </Typography>
//                                     }
//                                     secondary={
//                                         <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                                             {new Date(transaction.created * 1000).toLocaleString()}
//                                         </Typography>
//                                     }
//                                     sx={{ my: 0 }}
//                                 />
//                                 <Typography
//                                     variant="body2"
//                                     sx={{
//                                         color: transaction.amount < 0 ? 'error.main' : 'success.main',
//                                         fontWeight: 500
//                                     }}
//                                 >
//                                     {(transaction.amount / 100).toLocaleString('en-GB', {
//                                         style: 'currency',
//                                         currency: transaction.currency.toUpperCase()
//                                     })}
//                                 </Typography>
//                             </ListItem>
//                         ))}
//                     </List>
//                 )}
//             </CardContent>
//         </Card>
//     );
// }

// export default CardWithTransactions;



import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Button, CircularProgress } from '@mui/material';
import { Settings, Add } from '@mui/icons-material';

// Define the types for the transaction and balance data
interface Transaction {
    id: string;
    type: 'charge' | 'refund';
    created: number;
    amount: number;
    currency: string;
}

interface Balance {
    available: { currency: string; amount: number }[];
}

const CardWithTransactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number | null>(null); // State for account balance
    const [loading, setLoading] = useState<boolean>(true);
    const [balanceLoading, setBalanceLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch transactions
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:3001/payments/transactions?limit=10');
                const data = await response.json();
                if (data && data.data) {
                    setTransactions(data.data);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch account balance
        const fetchBalance = async () => {
            try {
                const response = await fetch('http://localhost:3001/payments/balance');
                const data: Balance = await response.json();
                
                // Extract the balance for GBP (or adjust as needed)
                const availableBalance = data.available.find(item => item.currency === 'gbp');
                
                // Set the balance state with the available amount
                if (availableBalance) {
                    setBalance(availableBalance.amount / 100); // Convert to the correct format (from cents to GBP)
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
            } finally {
                setBalanceLoading(false);
            }
        };

        fetchTransactions();
        fetchBalance();
    }, []);

    return (
        <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
            <Box sx={{ bgcolor: 'black', color: 'white', p: 2 }}>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'left', fontSize: '2rem', fontWeight: 'bold' }}>
                    Stripe Account Balance
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, textAlign: 'left' }}>
                    3329 2010 3920 4438
                </Typography>
                <Typography variant="h4" sx={{ my: 2, fontWeight: 'bold', textAlign: 'left' }}>
                    {balanceLoading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                        `£${balance?.toLocaleString('en-GB')}`
                    )}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Settings />}
                        sx={{
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.5)',
                            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        Manage Card
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<Add />}
                        sx={{
                            bgcolor: '#00a86b',
                            '&:hover': { bgcolor: '#008f5b' }
                        }}
                    >
                        Add New Card
                    </Button>
                </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 2, overflowY: 'hidden' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'left' }}>
                    Transaction History
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <List
                        sx={{
                            width: '100%',
                            height: '310px', // Adjust this to control the scrollable area height
                            overflowY: 'auto',
                            bgcolor: 'background.paper',
                            '& .MuiListItem-root': { px: 0, py: 1 }
                        }}
                    >
                        {transactions.map((transaction) => (
                            <ListItem key={transaction.id} sx={{ minHeight: '48px' }}>
                                <ListItemAvatar sx={{ minWidth: '40px' }}>
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            bgcolor: transaction.type === 'charge' ? '#e0f7fa' : '#ffebee',
                                            color: transaction.type === 'charge' ? '#00796b' : '#b71c1c',
                                            fontSize: '0.990rem'
                                        }}
                                    >
                                        {transaction.type[0].toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {transaction.type.replace('_', ' ').toUpperCase()}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            {new Date(transaction.created * 1000).toLocaleString()}
                                        </Typography>
                                    }
                                    sx={{ my: 0 }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: transaction.amount < 0 ? 'error.main' : 'success.main',
                                        fontWeight: 500
                                    }}
                                >
                                    {(transaction.amount / 100).toLocaleString('en-GB', {
                                        style: 'currency',
                                        currency: transaction.currency.toUpperCase()
                                    })}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default CardWithTransactions;
