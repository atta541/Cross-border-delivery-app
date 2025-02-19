import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for the gauge
const GaugeContainer = styled(Box)({
  position: 'relative',
  height: '160px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const GaugeBackground = styled(Box)({
  position: 'absolute',
  width: '200px',
  height: '100px',
  borderRadius: '100px 100px 0 0',
  background: '#f0f0f0',
  transform: 'rotate(180deg)',
  transformOrigin: 'bottom center',
});

const GaugeFill = styled(Box)({
  position: 'absolute',
  width: '200px',
  height: '100px',
  borderRadius: '100px 100px 0 0',
  background: '#00e676',
  transform: 'rotate(180deg)',
  transformOrigin: 'bottom center',
  clipPath: 'polygon(0 0, 60% 0, 60% 100%, 0 100%)',
});

const GaugeCenter = styled(Box)({
  position: 'absolute',
  bottom: 0,
  width: '180px',
  height: '90px',
  borderRadius: '90px 90px 0 0',
  background: 'white',
  transform: 'rotate(180deg)',
  transformOrigin: 'bottom center',
});

const SpendingList = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
  marginTop: '16px',
});

// Component definition
const TopSpending: React.FC = () => {
  return (
    <Card sx={{ height: '90%', borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top Spending
        </Typography>

        <GaugeContainer>
          <GaugeBackground />
          <GaugeFill />
          <GaugeCenter />
          <Typography
            variant="h4"
            component="div"
            sx={{
              position: 'relative',
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            60%
          </Typography>
        </GaugeContainer>

        <SpendingList>
          <Typography variant="body2" color="text.secondary">
            House 71%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Education 22%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bills 5%
          </Typography>
        </SpendingList>
      </CardContent>
    </Card>
  );
};

export default TopSpending;

