// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   CircularProgress,
//   Container,
//   Paper,
//   Stack,
//   List,
//   ListItem,
//   Divider,
// } from '@mui/material';
// import { Person, Payment, AttachMoney, CreditCard } from '@mui/icons-material';

// const UserDetails = () => {
//   const { id } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/users/${id}/details`);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   if (!data) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const { user, payments } = data;

//   const totalPayments = payments?.length || 0;
//   const totalSpend = payments?.reduce((sum, payment) => {
//     return payment.status === 'succeeded' ? sum + payment.amount : sum;
//   }, 0);

//   const renderUserDetails = (user) => {
//     if (!user) {
//       return <Typography>No user data available</Typography>;
//     }
//     return (
//       <List>
//         {Object.entries(user).map(([key, value]) => (
//           <React.Fragment key={key}>
//             <ListItem>
//               <Typography>
//                 <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
//                 {value ? (Array.isArray(value) ? value.join(', ') : value.toString()) : 'N/A'}
//               </Typography>
//             </ListItem>
//             <Divider />
//           </React.Fragment>
//         ))}
//       </List>
//     );
//   };

//   const renderPayments = (payments) => {
//     if (!Array.isArray(payments) || payments.length === 0) {
//       return <Typography>No payment details available</Typography>;
//     }
//     return (
//       <Grid container spacing={3}>
//         {payments.map((payment, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Payment {index + 1}
//                 </Typography>
//                 <Stack spacing={1}>
//                   {Object.entries(payment).map(([key, value]) => (
//                     <Typography key={key}>
//                       <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
//                       {value ? (Array.isArray(value) ? value.join(', ') : value.toString()) : 'N/A'}
//                     </Typography>
//                   ))}
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         User Details
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 <Person /> User Information
//               </Typography>
//               {renderUserDetails(user)}
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Grid container spacing={3}>
//             <Grid item xs={6}>
//               <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="h6">
//                   <Payment /> Total Payments
//                 </Typography>
//                 <Typography variant="h4">{totalPayments}</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={6}>
//               <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
//                 <Typography variant="h6">
//                   <AttachMoney /> Total Spend
//                 </Typography>
//                 <Typography variant="h4">${(totalSpend / 100).toFixed(2)}</Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       <Box mt={3}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               <CreditCard /> Payment Details
//             </Typography>
//             {renderPayments(payments)}
//           </CardContent>
//         </Card>
//       </Box>
//     </Container>
//   );
// };

// export default UserDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Stack,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { Person, Payment as PaymentIcon, AttachMoney, CreditCard } from '@mui/icons-material';

// Define Types
interface PaymentType {
  id: string;
  amount: number;
  status: string;
  date: string;
  method: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Data {
  user: User;
  payments: PaymentType[];
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(`http://localhost:3001/users/${id}/details`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const { user, payments } = data;

  const totalPayments = payments?.length || 0;
  const totalSpend = payments?.reduce((sum, payment) => {
    return payment.status === 'succeeded' ? sum + payment.amount : sum;
  }, 0);

  const renderUserDetails = (user: User) => {
    if (!user) {
      return <Typography>No user data available</Typography>;
    }
    return (
      <List>
        {Object.entries(user).map(([key, value]) => (
          <React.Fragment key={key}>
            <ListItem>
              <Typography>
                <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
                {value ? (Array.isArray(value) ? value.join(', ') : value.toString()) : 'N/A'}
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  };

  const renderPayments = (payments: PaymentType[]) => {
    if (!Array.isArray(payments) || payments.length === 0) {
      return <Typography>No payment details available</Typography>;
    }
    return (
      <Grid container spacing={3}>
        {payments.map((payment, index) => (
          <Grid item xs={12} sm={6} md={4} key={payment.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment {index + 1}
                </Typography>
                <Stack spacing={1}>
                  {Object.entries(payment).map(([key, value]) => (
                    <Typography key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
                      {value ? (Array.isArray(value) ? value.join(', ') : value.toString()) : 'N/A'}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Person /> User Information
              </Typography>
              {renderUserDetails(user)}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">
                  <PaymentIcon /> Total Payments
                </Typography>
                <Typography variant="h4">{totalPayments}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">
                  <AttachMoney /> Total Spend
                </Typography>
                <Typography variant="h4">${(totalSpend / 100).toFixed(2)}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <CreditCard /> Payment Details
            </Typography>
            {renderPayments(payments)}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default UserDetails;
