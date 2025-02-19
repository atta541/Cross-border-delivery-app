// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   TextField,
//   Button,
//   Typography,
// } from '@mui/material';

// function Payments() {
//   const [payments, setPayments] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalPayments, setTotalPayments] = useState(0);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Fetch initial page and limit from URL
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const initialPage = parseInt(params.get('page')) || 0;
//     const initialLimit = parseInt(params.get('limit')) || 5;

//     setPage(initialPage);
//     setRowsPerPage(initialLimit);
//   }, []);

//   // Fetch payments from server
//   const fetchPayments = async (currentPage, limit) => {
//     try {
//       const queryParams = new URLSearchParams({
//         page: currentPage + 1,
//         limit: limit,
//       }).toString();

//       const response = await fetch(`http://localhost:3001/payments/stripe?${queryParams}`);
//       const data = await response.json();
//       console.log('API Response:', data);

//       setPayments(data);
//       setFilteredPayments(data);
//       setTotalPayments(50); // Example: Set the total count (mocked for now)
//     } catch (error) {
//       console.error('Error fetching payments:', error);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchPayments(page, rowsPerPage);
//   }, [page, rowsPerPage]);

//   // Update URL parameters when page or limit changes
//   useEffect(() => {
//     const params = new URLSearchParams();
//     params.set('page', page);
//     params.set('limit', rowsPerPage);
//     window.history.replaceState({}, '', `?${params.toString()}`);
//   }, [page, rowsPerPage]);

//   // Handle pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = parseInt(event.target.value, 10);
//     setRowsPerPage(newRowsPerPage);
//     setPage(0); // Reset to the first page
//   };

//   // Filter by date
//   const handleFilter = () => {
//     const start = new Date(startDate).getTime();
//     const end = new Date(endDate).getTime();

//     const filtered = payments.filter((payment) => {
//       const paymentDate = payment.created * 1000;
//       return paymentDate >= start && paymentDate <= end;
//     });

//     setFilteredPayments(filtered);
//   };

//   // Search by ID
//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);

//     const searched = payments.filter((payment) =>
//       payment.id.toLowerCase().includes(value)
//     );

//     setFilteredPayments(searched);
//   };

//   // Calculate total earnings
//   const totalEarnings = filteredPayments
//     .reduce((acc, payment) => acc + payment.amount_received / 100, 0)
//     .toFixed(2);

//   return (
//     <Paper sx={{ padding: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Payments
//       </Typography>

//       {/* Search Bar */}
//       <TextField
//         label="Search by ID"
//         value={searchTerm}
//         onChange={handleSearch}
//         fullWidth
//         sx={{ marginBottom: 2 }}
//       />

//       {/* Date Filters */}
//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
//         <TextField
//           type="date"
//           label="Start Date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           type="date"
//           label="End Date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//         <Button variant="contained" onClick={handleFilter}>
//           Filter
//         </Button>
//       </div>

//       {/* Total Earnings */}
//       <Typography variant="h6" gutterBottom>
//         Total Earnings: £{totalEarnings}
//       </Typography>

//       {/* Payments Table */}
//       <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Amount (£)</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Created</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredPayments.map((payment, index) => (
//               <TableRow
//                 key={payment.id}
//                 style={{
//                   backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0',
//                 }}
//               >
//                 <TableCell>{payment.id}</TableCell>
//                 <TableCell>{(payment.amount_received / 100).toFixed(2)}</TableCell>
//                 <TableCell>{payment.status}</TableCell>
//                 <TableCell>{new Date(payment.created * 1000).toLocaleDateString()}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         component="div"
//         count={totalPayments}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

// export default Payments;





import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';

// Define types for the payment data
interface Payment {
  id: string;
  amount_received: number;
  status: string;
  created: number; // Unix timestamp in seconds
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Fetch initial page and limit from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPage = parseInt(params.get('page') || '0', 10);
    const initialLimit = parseInt(params.get('limit') || '5', 10);

    setPage(initialPage);
    setRowsPerPage(initialLimit);
  }, []);

  // Fetch payments from server
  const fetchPayments = async (currentPage: number, limit: number) => {
    try {
      const queryParams = new URLSearchParams({
        page: (currentPage + 1).toString(),
        limit: limit.toString(),
      }).toString();

      const response = await fetch(`http://localhost:3001/payments/stripe?${queryParams}`);
      const data = await response.json();
      console.log('API Response:', data);

      setPayments(data);
      setFilteredPayments(data);
      setTotalPayments(50); // Example: Set the total count (mocked for now)
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPayments(page, rowsPerPage);
  }, [page, rowsPerPage]);

  // Update URL parameters when page or limit changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', rowsPerPage.toString());
    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [page, rowsPerPage]);

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page
  };

  // Filter by date
  const handleFilter = () => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const filtered = payments.filter((payment) => {
      const paymentDate = payment.created * 1000;
      return paymentDate >= start && paymentDate <= end;
    });

    setFilteredPayments(filtered);
  };

  // Search by ID
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const searched = payments.filter((payment) =>
      payment.id.toLowerCase().includes(value)
    );

    setFilteredPayments(searched);
  };

  // Calculate total earnings
  const totalEarnings = filteredPayments
    .reduce((acc, payment) => acc + payment.amount_received / 100, 0)
    .toFixed(2);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Payments
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search by ID"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {/* Date Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </div>

      {/* Total Earnings */}
      <Typography variant="h6" gutterBottom>
        Total Earnings: £{totalEarnings}
      </Typography>

      {/* Payments Table */}
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount (£)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment, index) => (
              <TableRow
                key={payment.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0',
                }}
              >
                <TableCell>{payment.id}</TableCell>
                <TableCell>{(payment.amount_received / 100).toFixed(2)}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{new Date(payment.created * 1000).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalPayments}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Payments;
