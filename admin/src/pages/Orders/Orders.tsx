// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   Button
// } from '@mui/material';
// import { Visibility as VisibilityIcon } from '@mui/icons-material';

// const Orders = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [orderCount, setOrderCount] = useState(0);
//   const [loading, setLoading] = useState(true);  // Set initial state as true to show the loader
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const columns = [
//     { id: 'orderId', label: 'Order ID', minWidth: 150 },
//     { id: 'status', label: 'Status', minWidth: 100 },
//     { id: 'rider', label: 'Rider', minWidth: 150 },
//     { id: 'actions', label: 'Actions', minWidth: 150 },
//   ];

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/orders/all');
//         setOrders(response.data);
//         setFilteredOrders(response.data);
//         setOrderCount(response.data.length);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);  // Set loading to false after data is fetched
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     filterOrders(query, selectedStatus);
//   };

//   const handleStatusChange = (event) => {
//     const status = event.target.value;
//     setSelectedStatus(status);
//     filterOrders(searchQuery, status);
//   };

//   const filterOrders = (query, status) => {
//     const filtered = orders.filter((order) => {
//       const matchesSearch = order._id.toLowerCase().includes(query);
//       const matchesStatus = status ? order.status.toLowerCase() === status.toLowerCase() : true;
//       return matchesSearch && matchesStatus;
//     });
//     setFilteredOrders(filtered);
//   };

//   const handleRowClick = (id) => {
//     navigate(`/order-details/${id}`);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   if (loading) {
//     return (
//       <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    

//       {/* Dashboard Summary Cards */}
//       <Grid container spacing={3} style={{ marginBottom: '1rem' }}>
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>Total Orders</Typography>
//               <Typography variant="h5">{orderCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>Pending Orders</Typography>
//               <Typography variant="h5">{filteredOrders.filter(order => order.status === 'Pending').length}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>Completed Orders</Typography>
//               <Typography variant="h5">{filteredOrders.filter(order => order.status === 'Completed').length}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Search and Filter Section */}
//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
//         <TextField
//           label="Search by Order ID"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <FormControl variant="outlined" style={{ minWidth: 200 }}>
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={selectedStatus}
//             onChange={handleStatusChange}
//             label="Status"
//           >
//             <MenuItem value="">
//               <em>All</em>
//             </MenuItem>
//             <MenuItem value="Pending">Pending</MenuItem>
//             <MenuItem value="Completed">Completed</MenuItem>
//           </Select>
//         </FormControl>
//       </div>

//       {/* Orders Table */}
//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ width: '100%' }}>
//           <Table stickyHeader aria-label="orders table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredOrders
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((order, index) => (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     tabIndex={-1}
//                     key={order._id}
//                     onClick={() => handleRowClick(order._id)}
//                     style={{ cursor: 'pointer', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}
//                   >
//                     <TableCell>{order._id}</TableCell>
//                     <TableCell>{order.status}</TableCell>
//                     <TableCell>{order.rider?.name || 'N/A'}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<VisibilityIcon />}
//                         onClick={() => navigate(`/order-details/${order._id}`)}
//                       >
//                         View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={filteredOrders.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Container>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material';
import { MouseEvent } from 'react';

// Define the types for the order object
interface Order {
  _id: string;
  status: string;
  rider?: { name: string };
}

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const columns = [
    { id: 'orderId', label: 'Order ID', minWidth: 150 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'rider', label: 'Rider', minWidth: 150 },
    { id: 'actions', label: 'Actions', minWidth: 150 },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/orders/all');
        setOrders(response.data);
        setFilteredOrders(response.data);
        setOrderCount(response.data.length);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterOrders(query, selectedStatus);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const status = event.target.value;
    setSelectedStatus(status);
    filterOrders(searchQuery, status);
  };

  const filterOrders = (query: string, status: string) => {
    const filtered = orders.filter((order) => {
      const matchesSearch = order._id.toLowerCase().includes(query);
      const matchesStatus = status ? order.status.toLowerCase() === status.toLowerCase() : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredOrders(filtered);
  };

  const handleRowClick = (id: string) => {
    navigate(`/order-details/${id}`);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Dashboard Summary Cards */}
      <Grid container spacing={3} style={{ marginBottom: '1rem' }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Orders</Typography>
              <Typography variant="h5">{orderCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Pending Orders</Typography>
              <Typography variant="h5">{filteredOrders.filter(order => order.status === 'Pending').length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Completed Orders</Typography>
              <Typography variant="h5">{filteredOrders.filter(order => order.status === 'Completed').length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter Section */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Search by Order ID"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Orders Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table stickyHeader aria-label="orders table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    style={{ cursor: 'pointer', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}
                  >
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.rider?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/order-details/${order._id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Orders;
