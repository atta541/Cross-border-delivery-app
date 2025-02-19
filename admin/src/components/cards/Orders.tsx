// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Box, MenuItem, Select } from '@mui/material';

// function Orders() {
//   const [dateRange, setDateRange] = useState('today');
//   const [totalOrders, setTotalOrders] = useState(0);

//   // Fetch orders whenever the date range changes
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/orders/daterange?dateRange=${dateRange}`);
//         const data = await response.json();
//         setTotalOrders(data); // Assuming the API returns a number
//         console.log('API Response:', data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [dateRange]);

//   return (
//     <Card elevation={3} sx={{ height: '100%', borderRadius: 4 }}>
//       <CardContent>
//         <Typography variant="h6" gutterBottom sx={{ fontSize: '1.3rem', fontWeight: 'bold',display: 'flex', alignItems: 'left' }}>
//           Orders
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
//           {/* Total Orders on the left */}
//           <Typography variant="h4" sx={{ fontSize: '1.5rem', fontWeight: 'bold',color:'#3CB043' }}>
//             Total Orders: {totalOrders}
//           </Typography>

//           {/* Dropdown on the right */}
//           <Select
//             value={dateRange}
//             onChange={(e) => setDateRange(e.target.value)}
//             sx={{ width: '150px',borderBlockColor:'green' }}
//           >
//             <MenuItem value="today">Today</MenuItem>
//             <MenuItem value="yesterday">Yesterday</MenuItem>
//             <MenuItem value="thisWeek">This Week</MenuItem>
//             <MenuItem value="lastWeek">Last Week</MenuItem>
//             <MenuItem value="thisMonth">This Month</MenuItem>
//             <MenuItem value="lastMonth">Last Month</MenuItem>
//             <MenuItem value="last2Months">Last 2 Months</MenuItem>
//           </Select>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// export default Orders;







import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const Orders: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>('today');
  const [totalOrders, setTotalOrders] = useState<number>(0);

  // Fetch orders whenever the date range changes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/orders/daterange?dateRange=${dateRange}`);
        const data = await response.json();
        setTotalOrders(data as number); // Assuming the API returns a number
        console.log('API Response:', data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [dateRange]);

  const handleDateRangeChange = (event: SelectChangeEvent<string>) => {
    setDateRange(event.target.value);
  };

  return (
    <Card elevation={3} sx={{ height: '100%', borderRadius: 4 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'left',
          }}
        >
          Orders
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 2,
          }}
        >
          {/* Total Orders on the left */}
          <Typography
            variant="h4"
            sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3CB043' }}
          >
            Total Orders: {totalOrders}
          </Typography>

          {/* Dropdown on the right */}
          <Select
            value={dateRange}
            onChange={handleDateRangeChange}
            sx={{ width: '150px', borderBlockColor: '#30D47E' }}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="thisWeek">This Week</MenuItem>
            <MenuItem value="lastWeek">Last Week</MenuItem>
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="last2Months">Last 2 Months</MenuItem>
          </Select>
        </Box>
      </CardContent>
    </Card>
  );
};


export default Orders;

