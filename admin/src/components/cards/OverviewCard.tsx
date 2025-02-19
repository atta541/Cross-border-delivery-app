// import React, { useState } from 'react';
// import {
//   Card,
//   Typography,
//   Box,
//   Button,
//   ButtonGroup,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// import TimelineIcon from '@mui/icons-material/Timeline'; // Icon for Line and Bar
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Calendar icon for year selection

// const data = [
//   { name: 'Jan', income: 1000, expense: 4134 },
//   { name: 'Feb', income: 5000, expense: 4290 },
//   { name: 'Mar', income: 7000, expense: 4350 },
//   { name: 'Apr', income: 9250, expense: 4700 },
//   { name: 'May', income: 12200, expense: 5400 },
//   { name: 'Jun', income: 17500, expense: 7300 },
//   { name: 'Jul', income: 17450, expense: 8250 },
//   { name: 'Aug', income: 17600, expense: 8500 },
//   { name: 'Sep', income: 17550, expense: 1400 },
//   { name: 'Oct', income: 17700, expense: 14600 },
//   { name: 'Nov', income: 17800, expense: 14700 },
//   { name: 'Dec', income: 17900, expense: 14800 },
// ];

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <Box
//         sx={{
//           bgcolor: 'background.paper',
//           p: 1.5,
//           border: '4px solid',
//           borderColor: 'divider',
//           borderRadius: 1,
//           boxShadow: 1,
//         }}
//       >
//         {payload.map((entry) => (
//           <Typography key={entry.name} variant="body2" sx={{ color: entry.color, mb: 0.5 }}>
//             {`${entry.name}: £${entry.value.toLocaleString()}`}
//           </Typography>
//         ))}
//       </Box>
//     );
//   }
//   return null;
// };

// export default function OverviewCard() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedYear, setSelectedYear] = useState('2024');

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSelectYear = (year) => {
//     setSelectedYear(year);
//     setAnchorEl(null);
//   };

//   return (
//     <Card sx={{ height: '100%', p: 2, boxShadow: 'none', borderRadius: 4, border: '2px solid black' }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h6" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
//           Overview
//         </Typography>

//         <Box display="flex" gap={1}>
//           {/* Add text "Chart" before the buttons */}
//           <Typography variant="body2" sx={{ fontWeight: 'bold', alignSelf: 'center' }}>
//             Chart
//           </Typography>

//           <ButtonGroup variant="black" size="small" border="2px solid black" gap={1}>
//             <Button
//               sx={{
//                 textTransform: 'none',
//                 display: 'flex',
//                 alignItems: 'center',
//                 bgcolor: 'transparent',
//                 color: 'inherit',
//                 border: '2px solid black', // Border for buttons
//                 borderRadius: '8px', // Rounded corners
//                 '&:hover': {
//                   color: 'green', // Hover text color
//                 },
//               }}
//             >
//               <TimelineIcon sx={{ mr: 0.5 }} />
//               Line
//             </Button>
//             <Button
//               sx={{
//                 textTransform: 'none',
//                 display: 'flex',
//                 alignItems: 'center',
//                 bgcolor: 'transparent',
//                 color: 'inherit',
//                 border: '2px solid black', // Border for buttons
//                 borderRadius: '8px', // Rounded corners
//                 '&:hover': {
//                   color: 'green', // Hover text color
//                 },
//               }}
//             >
//               <TimelineIcon sx={{ mr: 0.5 }} />
//               Bar
//             </Button>
//           </ButtonGroup>

//           {/* Dropdown button for selecting year with Calendar icon */}
//           <Button
//             variant="outlined"
//             size="small"
//             sx={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
//             onClick={handleClick}
//           >
//             <CalendarTodayIcon sx={{ mr: 0.5 }} />
//             {selectedYear} <span>▼</span>
//           </Button>
//         </Box>
//       </Box>

//       {/* Menu for year selection */}
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         <MenuItem onClick={() => handleSelectYear('2023')}>2023</MenuItem>
//         <MenuItem onClick={() => handleSelectYear('2024')}>2024</MenuItem>
//         <MenuItem onClick={() => handleSelectYear('2025')}>2025</MenuItem>
//       </Menu>

//       {/* Line Chart */}
//       <Box sx={{ width: '100%', height: 300, bgcolor: '#f9f9f9', borderRadius: 1, p: 2 }}>
//         <ResponsiveContainer>
//           <LineChart
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: '#666' }}
//               tickFormatter={(value) => `£${value}`}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ top: -30 }} />
//             <Line
//               type="monotone"
//               dataKey="income"
//               stroke="#2e7d32"
//               strokeWidth={2}
//               dot={false}
//               name="Income"
//             />
//             <Line
//               type="monotone"
//               dataKey="expense"
//               stroke="#90caf9"
//               strokeWidth={2}
//               dot={false}
//               name="Expense"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>
//     </Card>
//   );
// }




import React, { useState, MouseEvent } from 'react';
import {
  Card,
  Typography,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import TimelineIcon from '@mui/icons-material/Timeline'; // Icon for Line and Bar
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Calendar icon for year selection

// Define the shape of the data points
interface DataPoint {
  name: string;
  income: number;
  expense: number;
}

const data: DataPoint[] = [
  { name: 'Jan', income: 1000, expense: 4134 },
  { name: 'Feb', income: 5000, expense: 4290 },
  { name: 'Mar', income: 7000, expense: 4350 },
  { name: 'Apr', income: 9250, expense: 4700 },
  { name: 'May', income: 12200, expense: 5400 },
  { name: 'Jun', income: 17500, expense: 7300 },
  { name: 'Jul', income: 17450, expense: 8250 },
  { name: 'Aug', income: 17600, expense: 8500 },
  { name: 'Sep', income: 17550, expense: 1400 },
  { name: 'Oct', income: 17700, expense: 14600 },
  { name: 'Nov', income: 17800, expense: 14700 },
  { name: 'Dec', income: 17900, expense: 14800 },
];

// Define the shape of the Tooltip's props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 1.5,
          border: '4px solid',
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {payload.map((entry) => (
          <Typography
            key={entry.name}
            variant="body2"
            sx={{ color: entry.color, mb: 0.5 }}
          >
            {`${entry.name}: £${entry.value.toLocaleString()}`}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const OverviewCard: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        height: '100%',
        p: 2,
        boxShadow: 'none',
        borderRadius: 4,
        border: '2px solid black',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          Overview
        </Typography>

        <Box display="flex" gap={1}>
          {/* Add text "Chart" before the buttons */}
          <Typography variant="body2" sx={{ fontWeight: 'bold', alignSelf: 'center' }}>
            Chart
          </Typography>

          <ButtonGroup
  variant="outlined" // Use a valid variant
  size="small"
  sx={{
    '& .MuiButton-root': {
      textTransform: 'none',
      display: 'flex',
      alignItems: 'center',
      bgcolor: 'transparent',
      color: 'inherit',
      border: '2px solid black', // Border for buttons
      borderRadius: '8px', // Rounded corners
      '&:hover': {
        color: 'green', // Hover text color
        borderColor: 'green', // Change border color on hover
      },
    },
    gap: 1, // Add spacing between buttons using sx
  }}
>
  <Button>
    <TimelineIcon sx={{ mr: 0.5 }} />
    Line
  </Button>
  <Button>
    <TimelineIcon sx={{ mr: 0.5 }} />
    Bar
  </Button>
</ButtonGroup>


          {/* Dropdown button for selecting year with Calendar icon */}
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleClick}
          >
            <CalendarTodayIcon sx={{ mr: 0.5 }} />
            {selectedYear} <span>▼</span>
          </Button>
        </Box>
      </Box>

      {/* Menu for year selection */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSelectYear('2023')}>2023</MenuItem>
        <MenuItem onClick={() => handleSelectYear('2024')}>2024</MenuItem>
        <MenuItem onClick={() => handleSelectYear('2025')}>2025</MenuItem>
      </Menu>

      {/* Line Chart */}
      <Box sx={{ width: '100%', height: 300, bgcolor: '#f9f9f9', borderRadius: 1, p: 2 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666' }}
              tickFormatter={(value) => `£${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ top: -30 }} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#2e7d32"
              strokeWidth={2}
              dot={false}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#90caf9"
              strokeWidth={2}
              dot={false}
              name="Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default OverviewCard;
