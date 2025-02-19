// import React from 'react';
// import {
//     Card,
//     CardContent,
//     Typography,
//     Button,
//     Box,
//     LinearProgress,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { styled } from '@mui/material/styles';

// const StyledLinearProgress = styled(LinearProgress)({
//     height: 8,
//     borderRadius: 4,
//     '& .MuiLinearProgress-bar': {
//         backgroundColor: '#00e676',
//     },
//     backgroundColor: '#f0f0f0',
// });

// const ActionButton = styled(Button)({
//     borderRadius: '8px',
//     textTransform: 'none',
// });

// const SavingGoals = () => {
//     return (
//         <Card sx={{borderRadius: 4 }}>
//             <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, }}>
//                     <Typography variant="h6">Saving Goals</Typography>
//                     <ActionButton
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         size="small"
//                         sx={{
//                             bgcolor: '#00e676',
//                             '&:hover': {
//                                 bgcolor: '#00c853',
//                             },
//                         }}
//                     >
//                         Add Goals
//                     </ActionButton>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
//                         <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
//                             £252,000
//                         </Typography>
//                     </Box>
//                     <Typography
//                         variant="caption"
//                         sx={{
//                             bgcolor: '#e8f5e9',
//                             color: '#00c853',
//                             px: 1,
//                             py: 0.5,
//                             borderRadius: 1,
//                         }}
//                     >
//                         On track
//                     </Typography>
//                 </Box>

//                 <Box sx={{ mb: 3 }}>
//                     <StyledLinearProgress variant="determinate" value={60} />
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                         Goal: £420,000
//                     </Typography>
//                 </Box>

//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                     <ActionButton
//                         fullWidth
//                         variant="outlined"
//                         startIcon={<KeyboardArrowDownIcon />}
//                         sx={{ borderColor: '#e0e0e0', color: 'text.primary' }}
//                     >
//                         Withdraw
//                     </ActionButton>
//                     <ActionButton
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                             bgcolor: '#00e676',
//                             '&:hover': {
//                                 bgcolor: '#00c853',
//                             },
//                         }}
//                     >
//                         Add Balance
//                     </ActionButton>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default SavingGoals;


import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';

// Styled components
const StyledLinearProgress = styled(LinearProgress)({
  height: 8,
  borderRadius: 4,
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#00e676',
  },
  backgroundColor: '#f0f0f0',
});

const ActionButton = styled(Button)({
  borderRadius: '8px',
  textTransform: 'none',
});

// Component definition
const SavingGoals: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h6">Saving Goals</Typography>
          <ActionButton
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{
              bgcolor: '#00e676',
              '&:hover': {
                bgcolor: '#00c853',
              },
            }}
          >
            Add Goals
          </ActionButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
            <Typography
              variant="h4"
              component="span"
              sx={{ fontWeight: 'bold' }}
            >
              £252,000
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              bgcolor: '#e8f5e9',
              color: '#00c853',
              px: 1,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            On track
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <StyledLinearProgress variant="determinate" value={60} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Goal: £420,000
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <ActionButton
            fullWidth
            variant="outlined"
            startIcon={<KeyboardArrowDownIcon />}
            sx={{ borderColor: '#e0e0e0', color: 'text.primary' }}
          >
            Withdraw
          </ActionButton>
          <ActionButton
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#00e676',
              '&:hover': {
                bgcolor: '#00c853',
              },
            }}
          >
            Add Balance
          </ActionButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SavingGoals;
