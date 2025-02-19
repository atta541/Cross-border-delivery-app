import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/navbar.tsx';  // Changed to .tsx
import LeftDrawer from './components/leftdrawer.tsx';  
import Homepage from './pages/HomePage.tsx';  // Changed to .tsx
import Login from './pages/Login.tsx';  // Changed to .tsx
import Users from './pages/Users/Users.tsx';  // Changed to .tsx
import UserDetails from './pages/Users/UserDetails.tsx';  // Changed to .tsx
import Products from './pages/Products.tsx';  // Changed to .tsx
import Payments from './pages/Payments/Payments.tsx';  // Changed to .tsx
import Orders from './pages/Orders/Orders.tsx';  // Changed to .tsx
import PayoutDetails from './pages/Payouts/PayoutDetails.tsx';  // Changed to .tsx
import ConnectAccounts from './pages/RiderConnectAccounts/ConnectAccounts.tsx';  // Changed to .tsx
import AccountBalance from './pages/RiderConnectAccounts/AccountBalance.tsx';  // Changed to .tsx
import OrderDetails from './pages/Orders/OrderDetails.tsx';  // Changed to .tsx
import { AuthProvider, AuthContext } from './contexts/AuthContext.tsx';  // Changed to .tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function AppContent(): JSX.Element {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={{ backgroundColor: '' }}>
      <div style={{ display: 'flex' }}>
        {isAuthenticated ? (
          <Router>
            <LeftDrawer />
            <main style={{ flexGrow: 1, padding: '20px' }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/connectaccounts" element={<ConnectAccounts />} />
                <Route path="/account-balance/:accountId" element={<AccountBalance />} />
                <Route path="/payout-details/:accountId/:payoutId" element={<PayoutDetails />} />
                <Route path="/order-details/:id" element={<OrderDetails />} />


              </Routes>
            </main>
          </Router>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
