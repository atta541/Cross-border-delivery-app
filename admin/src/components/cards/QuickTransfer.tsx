// import React from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Avatar,
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import { Search } from '@mui/icons-material';

// const recipients = [
//   { id: 1, name: 'Martin N.', avatar: '/placeholder.svg?height=40&width=40' },
//   { id: 2, name: 'Ragnar L.', avatar: '/placeholder.svg?height=40&width=40' },
//   { id: 3, name: 'Bella L.', avatar: '/placeholder.svg?height=40&width=40' },
//   { id: 4, name: 'Field T.', avatar: '/placeholder.svg?height=40&width=40' },
//   { id: 5, name: 'Ryan J.', avatar: '/placeholder.svg?height=40&width=40' },
// ];

// export default function QuickTransfer() {
//   return (
//     <Card sx={{borderRadius: 4 }}>
//       <CardContent>
//         <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6">Quick Transfer</Typography>
//           <IconButton size="small">
//             <Search fontSize="small" />
//           </IconButton>
//         </Box>

//         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//           Send to
//         </Typography>

//         <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
//           {recipients.map((recipient) => (
//             <Box
//               key={recipient.id}
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: 0.5,
//               }}
//             >
//               <Avatar
//                 src={recipient.avatar}
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   cursor: 'pointer',
//                   '&:hover': { opacity: 0.8 },
//                 }}
//               />
//               <Typography variant="caption" color="text.secondary">
//                 {recipient.name}
//               </Typography>
//             </Box>
//           ))}
//         </Box>

//         <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
//           <TextField
//             size="small"
//             placeholder="500"
//             InputProps={{
//               startAdornment: <InputAdornment position="start">£</InputAdornment>,
//             }}
//             sx={{ flex: 1 }}
//           />
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: 'success.main',
//               '&:hover': { bgcolor: 'success.dark' },
//               px: 4,
//             }}
//           >
//             Send
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }


import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface Recipient {
  id: number;
  name: string;
  avatar: string;
}

const recipients: Recipient[] = [
  { id: 1, name: 'Martin N.', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Ragnar L.', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Bella L.', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Field T.', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 5, name: 'Ryan J.', avatar: '/placeholder.svg?height=40&width=40' },
];

const QuickTransfer: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 4,marginTop: -8 }}>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Quick Transfer</Typography>
          <IconButton size="small">
            <Search fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Send to
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          {recipients.map((recipient) => (
            <Box
              key={recipient.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Avatar
                src={recipient.avatar}
                sx={{
                  width: 40,
                  height: 40,
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {recipient.name}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <TextField
            size="small"
            placeholder="500"
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' },
              px: 4,
            }}
          >
            Send
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickTransfer;
