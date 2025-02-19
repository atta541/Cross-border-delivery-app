import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar,  } from '@mui/material';

function TransactionCard() {
  const transactions = [
    {
      name: 'Martha Nielsen',
      time: '12:30 PM',
      amount: '-£29.99',
      type: 'debit'
    },
    {
      name: 'Bjorn Ironside',
      time: '10:45 AM',
      amount: '+£750',
      type: 'credit'
    },
    {
      name: 'Dribble',
      time: '09:30 AM',
      amount: '-£60',
      type: 'debit'
    },
    {
      name: 'Ragnar Lothbrok',
      time: '08:15 AM',
      amount: '+£550',
      type: 'credit'
    }
  ];

  return (
    <Card elevation={3} sx={{ height: '140%',borderRadius: 4  }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Transaction History
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {transactions.map((transaction, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar>{transaction.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={transaction.name}
                secondary={transaction.time}
              />
              <Typography 
                variant="body2" 
                color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
              >
                {transaction.amount}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TransactionCard;