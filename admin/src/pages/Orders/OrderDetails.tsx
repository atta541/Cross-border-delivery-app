// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from '@mui/material'

// export default function OrderDetails() {
//   const { id } = useParams()
//   const [order, setOrder] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/orders/${id}`)
//         setOrder(response.data)
//         setLoading(false)
//       } catch (error) {
//         console.error('Error fetching order details:', error)
//         setLoading(false)
//       }
//     }

//     fetchOrderDetails()
//   }, [id])

//   if (loading) {
//     return (
//       <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Container>
//     )
//   }

//   if (!order) {
//     return (
//       <Container>
//         <Typography variant="h6" color="error">
//           Error: Order not found
//         </Typography>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom component="h1">
//         Order Details
//       </Typography>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <List>
//               <ListItem>
//                 <ListItemText primary="Order ID" secondary={order._id} />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <ListItemText primary="Status" secondary={order.status} />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <ListItemText primary="Rider" secondary={order.rider.name} />
//               </ListItem>
//             </List>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <List>
//               <ListItem>
//                 <ListItemText primary="Delivery Location" secondary={order.deliveryLocation.join(', ')} />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <ListItemText
//                   primary="Created At"
//                   secondary={new Date(order.createdAt).toLocaleString()}
//                 />
//               </ListItem>
//             </List>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   )
// }




import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'

// Define types for the order data
interface Rider {
  name: string;
}

interface Order {
  _id: string;
  status: string;
  rider: Rider;
  deliveryLocation: string[];
  createdAt: string;
}

export default function OrderDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>()  // Define id type using useParams
  const [order, setOrder] = useState<Order | null>(null)  // Use the Order type
  const [loading, setLoading] = useState<boolean>(true)  // Loading state type

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get<Order>(`http://localhost:3001/orders/${id}`)  // Type the response as Order
        setOrder(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching order details:', error)
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [id])

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!order) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error: Order not found
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Order Details
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText primary="Order ID" secondary={order._id} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Status" secondary={order.status} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Rider" secondary={order.rider.name} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText primary="Delivery Location" secondary={order.deliveryLocation.join(', ')} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Created At"
                  secondary={new Date(order.createdAt).toLocaleString()}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
