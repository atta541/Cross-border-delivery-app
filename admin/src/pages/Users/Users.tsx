// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Grid from "@mui/material/Grid";

// const columns = [
//   { id: "index", label: "#", minWidth: 50 },
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "email", label: "Email", minWidth: 170 },
//   { id: "phone", label: "Phone Number", minWidth: 150 },
//   { id: "provider", label: "Provider", minWidth: 150 },
//   { id: "role", label: "Role", minWidth: 100 },
// ];

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(4);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [totals, setTotals] = useState({
//     totalUsers: 0,
//   });

//   const updateURLParams = (page, rowsPerPage) => {
//     const params = new URLSearchParams(location.search);
//     params.set("page", page + 1);
//     params.set("limit", rowsPerPage);
//     navigate({ search: params.toString() }, { replace: true });
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const currentPage = parseInt(params.get("page"), 10) || 1;
//     const currentLimit = parseInt(params.get("limit"), 10) || 4;
//     setPage(currentPage - 1);
//     setRowsPerPage(currentLimit);
//   }, [location.search]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/users", {
//           params: { page: page + 1, limit: rowsPerPage },
//         });
//         const { data, totalUsers } = response.data;
//         console.log(data);

//         const formattedData = data.map((user) => ({
//           id: user._id,
//           name: `${user.first_name} ${user.last_name}`,
//           email: user.email,
//           phone: user.phone,
//           provider: user.provider || "N/A",
//           role: user.role.join(", "),
//         }));

//         setUsers(formattedData);
//         setTotals({ totalUsers });
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [page, rowsPerPage]);

//   const filterUsers = useCallback(
//     (query, role) => {
//       const filtered = users.filter((user) => {
//         const matchesSearch =
//           (user.name && user.name.toLowerCase().includes(query)) ||
//           (user.email && user.email.toLowerCase().includes(query)) ||
//           (user.phone && user.phone.toLowerCase().includes(query));
//         const matchesRole = role ? user.role.includes(role) : true;
//         return matchesSearch && matchesRole;
//       });
//       setFilteredUsers(filtered);
//     },
//     [users]
//   );

//   useEffect(() => {
//     filterUsers(searchQuery, selectedRole);
//   }, [users, searchQuery, selectedRole, filterUsers]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     updateURLParams(newPage, rowsPerPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = +event.target.value;
//     setRowsPerPage(newRowsPerPage);
//     setPage(0);
//     updateURLParams(0, newRowsPerPage);
//   };

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//   };

//   const handleRoleChange = (event) => {
//     const role = event.target.value;
//     setSelectedRole(role);
//   };

//   const handleRowClick = (id) => {
//     navigate(`/users/${id}`);
//   };

//   return (
//     <div>
//       <Grid container spacing={3} style={{ marginBottom: "1rem", marginTop: "0.2rem" }}>
//         {/* Add summary cards or any other header content here */}
//       </Grid>

//       <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
//         <TextField
//           label="Search by Name, Email, or Phone"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         <FormControl variant="outlined" style={{ minWidth: 200 }}>
//           <InputLabel id="role-select-label">Filter by Role</InputLabel>
//           <Select
//             labelId="role-select-label"
//             value={selectedRole}
//             onChange={handleRoleChange}
//             label="Filter by Role"
//           >
//             <MenuItem value="">
//               <em>All</em>
//             </MenuItem>
//             {Array.from(new Set(users.map((user) => user.role))).map((role, index) => (
//               <MenuItem key={index} value={role}>
//                 {role}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </div>

//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <TableContainer sx={{ width: "100%", height: "calc(95vh - 250px)" }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredUsers.map((user, index) => (
//                 <TableRow
//                   hover
//                   role="checkbox"
//                   tabIndex={-1}
//                   key={user.id}
//                   onClick={() => handleRowClick(user.id)}
//                   style={{
//                     cursor: "pointer",
//                     backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
//                   }}
//                 >
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {columns.slice(1).map((column) => {
//                     const value = user[column.id];
//                     return <TableCell key={column.id}>{value}</TableCell>;
//                   })}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[4, 6, 10]}
//           component="div"
//           count={totals.totalUsers}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// };

// export default Users;



import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  provider: string;
  role: string;
}

interface Totals {
  totalUsers: number;
}

const columns = [
  { id: "index", label: "#", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone Number", minWidth: 150 },
  { id: "provider", label: "Provider", minWidth: 150 },
  { id: "role", label: "Role", minWidth: 100 },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(4);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const [totals, setTotals] = useState<Totals>({
    totalUsers: 0,
  });

  const updateURLParams = (page: number, rowsPerPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", (page + 1).toString());
    params.set("limit", rowsPerPage.toString());
    navigate({ search: params.toString() }, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentPage = parseInt(params.get("page") || "1", 10);
    const currentLimit = parseInt(params.get("limit") || "4", 10);
    setPage(currentPage - 1);
    setRowsPerPage(currentLimit);
  }, [location.search]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users", {
          params: { page: page + 1, limit: rowsPerPage },
        });
        const { data, totalUsers } = response.data;

        const formattedData: User[] = data.map((user: any) => ({
          id: user._id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone,
          provider: user.provider || "N/A",
          role: user.role.join(", "),
        }));

        setUsers(formattedData);
        setTotals({ totalUsers });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  const filterUsers = useCallback(
    (query: string, role: string) => {
      const filtered = users.filter((user) => {
        const matchesSearch =
          (user.name && user.name.toLowerCase().includes(query)) ||
          (user.email && user.email.toLowerCase().includes(query)) ||
          (user.phone && user.phone.toLowerCase().includes(query));
        const matchesRole = role ? user.role.includes(role) : true;
        return matchesSearch && matchesRole;
      });
      setFilteredUsers(filtered);
    },
    [users]
  );

  useEffect(() => {
    filterUsers(searchQuery, selectedRole);
  }, [users, searchQuery, selectedRole, filterUsers]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    updateURLParams(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    updateURLParams(0, newRowsPerPage);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    const role = event.target.value;
    setSelectedRole(role);
  };

  const handleRowClick = (id: string) => {
    navigate(`/users/${id}`);
  };

  return (
    <div>
      <Grid container spacing={3} style={{ marginBottom: "1rem", marginTop: "0.2rem" }}>
        {/* Add summary cards or any other header content here */}
      </Grid>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          label="Search by Name, Email, or Phone"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel id="role-select-label">Filter by Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={selectedRole}
            onChange={handleRoleChange}
            label="Filter by Role"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {Array.from(new Set(users.map((user) => user.role))).map((role, index) => (
              <MenuItem key={index} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ width: "100%", height: "calc(95vh - 250px)" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  {columns.slice(1).map((column) => {
                    const value = (user as any)[column.id];
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 6, 10]}
          component="div"
          count={totals.totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Users;
