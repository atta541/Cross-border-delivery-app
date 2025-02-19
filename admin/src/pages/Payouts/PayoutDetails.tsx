// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { CircularProgress, Typography, Divider, Grid, Card, CardContent, CardHeader, Button } from '@mui/material';
// import { CheckCircle, ErrorOutline } from '@mui/icons-material';

// function PayoutDetails() {
//   const { accountId, payoutId } = useParams(); // Extract accountId and payoutId from the URL
//   const [payout, setPayout] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPayoutDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/payments/payout', {
//           params: { accountId, payoutId },
//         });
//         setPayout(response.data);
//       } catch (error) {
//         setError('Failed to fetch payout details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayoutDetails();
//   }, [accountId, payoutId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error" variant="h6" align="center"><ErrorOutline /> {error}</Typography>;

//   return (
//     <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
//       <Grid item xs={12} sm={8} md={6}>
//         <Card elevation={3}>
//           <CardHeader
//             title={`Payout Details for ${payoutId}`}
//             subheader="Information on the recent payout transaction"
//             titleTypographyProps={{ variant: 'h5', align: 'center' }}
//             subheaderTypographyProps={{ align: 'center' }}
//             style={{ backgroundColor: '#f4f4f4' }}
//           />
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   <CheckCircle fontSize="small" color="success" /> Payment Information
//                 </Typography>
//                 <Divider style={{ marginBottom: '10px' }} />
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="body1">
//                   <strong>Amount:</strong> {(payout?.amount ? (payout.amount / 100).toFixed(2) : 'N/A')} {payout?.currency ? payout.currency.toUpperCase() : 'N/A'}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body1">
//                   <strong>Status:</strong> {payout?.status || 'N/A'}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body1">
//                   <strong>Method:</strong> {payout?.method || 'N/A'}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body1">
//                   <strong>Created At:</strong> {payout?.created ? new Date(payout.created * 1000).toLocaleString() : 'N/A'}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body1">
//                   <strong>Arrival Date:</strong> {payout?.arrival_date ? new Date(payout.arrival_date * 1000).toLocaleString() : 'N/A'}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body1">
//                   <strong>Destination:</strong> {payout?.destination || 'N/A'}
//                 </Typography>
//               </Grid>
//             </Grid>

//             <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: '20px' }}>
//               <Grid item>
//                 <Button variant="contained" color="primary" onClick={() => window.history.back()}>Back</Button>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// }

// export default PayoutDetails;




import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Typography, Divider, Grid, Card, CardContent, CardHeader, Button } from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';

// Define the types for the payout data
interface Payout {
  amount: number;
  currency: string;
  status: string;
  method: string;
  created: number;
  arrival_date: number;
  destination: string;
}

function PayoutDetails() {
  const { accountId, payoutId } = useParams<{ accountId: string; payoutId: string }>(); // Specify types for useParams
  const [payout, setPayout] = useState<Payout | null>(null); // Set state type to Payout or null
  const [loading, setLoading] = useState<boolean>(true); // Define loading state as boolean
  const [error, setError] = useState<string | null>(null); // Define error state as string or null

  useEffect(() => {
    const fetchPayoutDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/payments/payout', {
          params: { accountId, payoutId },
        });
        setPayout(response.data);
      } catch (error) {
        setError('Failed to fetch payout details');
      } finally {
        setLoading(false);
      }
    };

    fetchPayoutDetails();
  }, [accountId, payoutId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error" variant="h6" align="center"><ErrorOutline /> {error}</Typography>;

  return (
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card elevation={3}>
          <CardHeader
            // title={`Payout Details for ${payoutId}`}
            subheader="Information on the recent payout transaction"
            titleTypographyProps={{ variant: 'h5', align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            style={{ backgroundColor: '#f4f4f4' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <CheckCircle fontSize="small" color="success" /> Payment Information
                </Typography>
                <Divider style={{ marginBottom: '10px' }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Amount:</strong> {(payout?.amount ? (payout.amount / 100).toFixed(2) : 'N/A')} {payout?.currency ? payout.currency.toUpperCase() : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Status:</strong> {payout?.status || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Method:</strong> {payout?.method || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Created At:</strong> {payout?.created ? new Date(payout.created * 1000).toLocaleString() : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Arrival Date:</strong> {payout?.arrival_date ? new Date(payout.arrival_date * 1000).toLocaleString() : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Destination:</strong> {payout?.destination || 'N/A'}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: '20px' }}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => window.history.back()}>Back</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PayoutDetails;
