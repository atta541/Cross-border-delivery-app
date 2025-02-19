
// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Define the interface for the account data
// interface Account {
//   id: string;
//   email: string;
//   country: string;
//   charges_enabled: boolean;
//   default_currency: string;
//   first_name?: string;
//   last_name?: string;
//   phone?: string;
//   verification_status?: string;
//   address?: string;
// }

// function ConnectAccounts() {
//   const [accounts, setAccounts] = useState<Account[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//   const [totalRows, setTotalRows] = useState<number>(0);
//   const navigate = useNavigate();

//   // Fetch accounts from the API
//   const fetchAccounts = async (page: number, rowsPerPage: number) => {
//     try {
//       const response = await axios.get('http://localhost:3001/payments/list-connected-accounts', {
//         params: {
//           limit: rowsPerPage,
//         },
//       });

//       // Map API response to include required details
//       const mappedAccounts = response.data.data.map((account: any) => ({
//         id: account.id,
//         email: account.email,
//         country: account.country,
//         charges_enabled: account.charges_enabled,
//         default_currency: account.default_currency,
//         first_name: account.individual?.first_name || 'N/A',
//         last_name: account.individual?.last_name || 'N/A',
//         phone: account.individual?.phone || 'N/A',
//         verification_status: account.individual?.verification?.status || 'unverified',
//         address: `${account.company?.address?.line1 || ''}, ${account.company?.address?.city || ''}, ${account.company?.address?.postal_code || ''}`,
//       }));

//       setAccounts(mappedAccounts);
//       setTotalRows(response.data.total_count || 0);
//     } catch (error) {
//       console.error('Error fetching accounts:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAccounts(page, rowsPerPage);
//   }, [page, rowsPerPage]);

//   const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleRowClick = (accountId: string) => {
//     navigate(`/account-balance/${accountId}`);
//   };

//   return (
//     <Paper>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Full Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Country</TableCell>
//               <TableCell>Verification Status</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Currency</TableCell>
//               <TableCell>Charges Enabled</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {accounts.map((account) => (
//               <TableRow
//                 key={account.id}
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => handleRowClick(account.id)}
//               >
//                 <TableCell>{`${account.first_name} ${account.last_name}`}</TableCell>
//                 <TableCell>{account.email}</TableCell>
//                 <TableCell>{account.phone}</TableCell>
//                 <TableCell>{account.country}</TableCell>
//                 <TableCell>{account.verification_status}</TableCell>
//                 <TableCell>{account.address}</TableCell>
//                 <TableCell>{account.default_currency}</TableCell>
//                 <TableCell>{account.charges_enabled ? 'Yes' : 'No'}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 20]}
//         component="div"
//         count={totalRows}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handlePageChange}
//         onRowsPerPageChange={handleRowsPerPageChange}
//       />
//     </Paper>
//   );
// }

// export default ConnectAccounts;



import React, { useState, useEffect } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Account {
  id: string;
  email: string;
  country: string;
  charges_enabled: boolean;
  default_currency: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  verification_status?: string | null;
  address?: string | null;
}

function ConnectAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [verificationFilter, setVerificationFilter] = useState<string>('All');
  const navigate = useNavigate();

  const fetchAccounts = async (page: number, rowsPerPage: number) => {
    try {
      const response = await axios.get('http://localhost:3001/payments/list-connected-accounts', {
        params: { limit: rowsPerPage },
      });

      const mappedAccounts = response.data.data.map((account: any) => ({
        id: account.id,
        email: account.email || 'N/A',
        country: account.country,
        charges_enabled: account.charges_enabled,
        default_currency: account.default_currency,
        first_name: account.individual?.first_name || 'N/A',
        last_name: account.individual?.last_name || 'N/A',
        phone: account.individual?.phone || 'N/A',
        verification_status: account.individual?.verification?.status || 'unverified',
        address: `${account.company?.address?.line1 || ''}, ${account.company?.address?.city || ''}, ${account.company?.address?.postal_code || ''}`,
      }));

      setAccounts(mappedAccounts);
      setFilteredAccounts(mappedAccounts); // Initialize filtered accounts
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  useEffect(() => {
    fetchAccounts(page, rowsPerPage);
  }, [page, rowsPerPage]);

  useEffect(() => {
    const filtered = accounts.filter((account) => {
      const fullName = `${account.first_name ?? ''} ${account.last_name ?? ''}`.toLowerCase();
      const email = account.email?.toLowerCase() ?? '';
      const phone = account.phone?.toLowerCase() ?? '';
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch =
        fullName.includes(searchLower) || email.includes(searchLower) || phone.includes(searchLower);

      const matchesFilter =
        verificationFilter === 'All' || account.verification_status === verificationFilter;

      return matchesSearch && matchesFilter;
    });

    setFilteredAccounts(filtered);
  }, [searchQuery, verificationFilter, accounts]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (accountId: string) => {
    navigate(`/account-balance/${accountId}`);
  };

  return (
    <Paper>
      <div style={{ padding: '16px', display: 'flex', gap: '16px', }}>
        <TextField sx={{width:'90%'}}
          label="Search by Name, Email, Phone"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FormControl variant="outlined" sx={{width:'10%'}}>
          <InputLabel>Verification</InputLabel>
          <Select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            label="Verification"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="verified">Verified</MenuItem>
            <MenuItem value="unverified">Unverified</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Verification Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Charges Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account) => (
              <TableRow
                key={account.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(account.id)}
              >
                <TableCell>{`${account.first_name} ${account.last_name}`}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell>{account.country}</TableCell>
                <TableCell>{account.verification_status}</TableCell>
                <TableCell>{account.address}</TableCell>
                <TableCell>{account.default_currency}</TableCell>
                <TableCell>{account.charges_enabled ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredAccounts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
}

export default ConnectAccounts;
