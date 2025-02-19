// import React from 'react';
// import { Grid, Container } from '@mui/material';
// import ExpenseCard from '../components/cards/MonthlyExpense';
// import Orders from '../components/cards/Orders.tsx';
// import CardWithTransactions from '../components/cards/CardWithTransactions';
// import OverviewCard from '../components/cards/OverviewCard.tsx';
// import QuickTransfer from '../components/cards/QuickTransfer.tsx';
// import SavingGoals from '../components/cards/SavingGoals.tsx';
// import TopSpending from '../components/cards/TopSpending.tsx';

// function Homepage() {
//   return (
//     <Container maxWidth="xl" sx={{ mt: 4, mb: 4,ml:-2 }}>
//       <Grid container spacing={3}>
//         {/* Left column */}
//         <Grid item xs={12} md={4}>
//           <Grid container spacing={10} direction="column">
//             <Grid item>
//               <CardWithTransactions />
//             </Grid>
//             <Grid item>
//               <QuickTransfer />
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Right column */}
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={4}>
//             {/* Top row */}
//             <Grid item xs={12} md={6} >
//               <Orders />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <ExpenseCard
//                 title="Monthly Expense"
//                 amount="£3,102.32"
//                 trend="14.8% lower than last month"
//               />
//             </Grid>


//             {/* Middle row */}
//             <Grid item xs={12} sx={{  }}>
//               <OverviewCard />
//             </Grid>

//             {/* Bottom row */}
//             <Grid item xs={12} md={6}>
//               <SavingGoals />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TopSpending />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default Homepage;



import React from 'react';
import { Grid, Container } from '@mui/material';
import ExpenseCard from '../components/cards/MonthlyExpense.tsx';
import Orders from '../components/cards/Orders.tsx';
import CardWithTransactions from '../components/cards/CardWithTransactions.tsx';
import OverviewCard from '../components/cards/OverviewCard.tsx';
import QuickTransfer from '../components/cards/QuickTransfer.tsx';
import SavingGoals from '../components/cards/SavingGoals.tsx';
import TopSpending from '../components/cards/TopSpending.tsx';

const Homepage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, ml: -2 }}>
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={10} direction="column">
            <Grid item>
              <CardWithTransactions />
            </Grid>
            <Grid item>
              <QuickTransfer />
            </Grid>
          </Grid>
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {/* Top row */}
            <Grid item xs={12} md={6}>
              <Orders />
            </Grid>
            <Grid item xs={12} md={6}>
            <ExpenseCard/>

            </Grid>

            {/* Middle row */}
            <Grid item xs={12}>
              <OverviewCard />
            </Grid>

            {/* Bottom row */}
            <Grid item xs={12} md={6}>
              <SavingGoals />
            </Grid>
            <Grid item xs={12} md={6}>
              <TopSpending />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
