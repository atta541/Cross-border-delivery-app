// import React from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// function MonthlyExpense() {
//   return (
//     <Card elevation={3} sx={{ height: '100%' ,borderRadius: 4 }}>
//       <CardContent>
//       <Typography variant="h6" gutterBottom sx={{ fontSize: '1.3rem', fontWeight: 100, display: 'flex', alignItems: 'left' }}>
//       Monthly Expense
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography variant="h4">£3,102.32</Typography>
//           <TrendingDownIcon color="success" />
//         </Box>
//         <Typography variant="body2" color="success.main">
//           14.8% lower than last month
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }

// export default MonthlyExpense;



// import React from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// const MonthlyExpense: React.FC = () => {
//   return (
//     <Card elevation={3} sx={{ height: '100%', borderRadius: 4 }}>
//       <CardContent>
//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ fontSize: '1.3rem', fontWeight: 100, display: 'flex', alignItems: 'left' }}
//         >
//           Monthly Expense
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography variant="h4">£3,102.32</Typography>
//           <TrendingDownIcon color="success" />
//         </Box>
//         <Typography variant="body2" color="success.main">
//           14.8% lower than last month
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default MonthlyExpense;



import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const MonthlyExpense: React.FC = () => {
  // Hardcoded values for the expense card
  const title = "Monthly Expense";
  const amount = "£3,102.32";
  const trend = "14.8% lower than last month";

  return (
    <Card elevation={3} sx={{ height: "100%", borderRadius: 4 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: "1.3rem",
            fontWeight: 100,
            display: "flex",
            alignItems: "left",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">{amount}</Typography>
          <TrendingDownIcon color="success" />
        </Box>
        <Typography variant="body2" color="success.main">
          {trend}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MonthlyExpense;
