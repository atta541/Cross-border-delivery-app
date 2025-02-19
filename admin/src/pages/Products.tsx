// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';

// const columns = [
//   { id: 'index', label: '#', minWidth: 50, bold: false },
//   { id: 'name', label: 'Name', minWidth: 170, bold: true },
//   { id: 'productId', label: 'Product ID', minWidth: 100, bold: true },
//   { id: 'description', label: 'Description', minWidth: 250, bold: true },
//   { id: 'specification', label: 'Specification', minWidth: 200, bold: true },
//   { id: 'deliverableCities', label: 'Deliverable Cities', minWidth: 150, bold: true },
//   { id: 'price', label: 'Price', minWidth: 100, bold: true },
// ];

// const truncateDescription = (description, maxWords = 10) => {
//   const words = description.split(' ');
//   return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : description;
// };

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/products');
//         const formattedData = response.data.map((product) => ({
//           id: product._id,
//           name: product.name,
//           productId: product.productId,
//           description: product.description,
//           specification: product.specification,
//           deliverableCities: product.deliverableCities.join(', '),
//           price: product.price.toFixed(2),
//         }));
//         setProducts(formattedData);
//         setFilteredProducts(formattedData);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     filterProducts(query, selectedCity);
//   };

//   // Handle city filtering
//   const handleCityChange = (event) => {
//     const city = event.target.value;
//     setSelectedCity(city);
//     filterProducts(searchQuery, city);
//   };

//   // Filter products based on search query and city
//   const filterProducts = (query, city) => {
//     const filtered = products.filter((product) => {
//       const matchesSearch =
//         (product.name && product.name.toLowerCase().includes(query)) ||
//         (product.productId && product.productId.toLowerCase().includes(query)) ||
//         (product.description && product.description.toLowerCase().includes(query));
//       const matchesCity = city ? product.deliverableCities.includes(city) : true;
//       return matchesSearch && matchesCity;
//     });
//     setFilteredProducts(filtered);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0); // Reset page to the first one
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', marginTop: '1rem' }}>
//         {/* Search Field */}
//         <TextField
//           label="Search by Name, Product ID, or Description"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           onChange={handleSearch}
//         />

//         {/* City Filter */}
//         <FormControl variant="outlined" style={{ minWidth: 200 }}>
//           <InputLabel id="city-select-label">Filter by City</InputLabel>
//           <Select
//             labelId="city-select-label"
//             value={selectedCity}
//             onChange={handleCityChange}
//             label="Filter by City"
//           >
//             <MenuItem value="">
//               <em>All</em>
//             </MenuItem>
//             {Array.from(new Set(products.flatMap((product) => product.deliverableCities)))
//               .map((city, index) => (
//                 <MenuItem key={index} value={city}>
//                   {city}
//                 </MenuItem>
//               ))}
//           </Select>
//         </FormControl>
//       </div>

//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ width: '100%', height: 'calc(95vh - 200px)' }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     style={{
//                       minWidth: column.minWidth,
//                       fontWeight: column.bold ? 'bold' : 'normal',
//                     }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredProducts
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((product, index) => (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     tabIndex={-1}
//                     key={product.id}
//                     style={{
//                       backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
//                     }}
//                   >
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     {columns.slice(1).map((column) => {
//                       const value = column.id === 'description' 
//                         ? truncateDescription(product[column.id])
//                         : column.id === 'price' 
//                         ? <strong>{product[column.id]}</strong> 
//                         : product[column.id];

//                       return (
//                         <TableCell key={column.id} style={{ fontWeight: column.bold ? 'bold' : 'normal' }}>
//                           {value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={filteredProducts.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// }



import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// Define column type
interface Column {
  id: keyof Product | 'index';
  label: string;
  minWidth: number;
  bold: boolean;
}

// Define product type
interface Product {
  id: string;
  name: string;
  productId: string;
  description: string;
  specification: string;
  deliverableCities: string; // Cities as a comma-separated string
  price: string;
}

const columns: Column[] = [
  { id: 'index', label: '#', minWidth: 50, bold: false },
  { id: 'name', label: 'Name', minWidth: 170, bold: true },
  { id: 'productId', label: 'Product ID', minWidth: 100, bold: true },
  { id: 'description', label: 'Description', minWidth: 250, bold: true },
  { id: 'specification', label: 'Specification', minWidth: 200, bold: true },
  { id: 'deliverableCities', label: 'Deliverable Cities', minWidth: 150, bold: true },
  { id: 'price', label: 'Price', minWidth: 100, bold: true },
];

const truncateDescription = (description: string, maxWords = 10): string => {
  const words = description.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : description;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        const formattedData: Product[] = response.data.map((product: any) => ({
          id: product._id,
          name: product.name,
          productId: product.productId,
          description: product.description,
          specification: product.specification,
          deliverableCities: product.deliverableCities.join(', '),
          price: product.price.toFixed(2),
        }));
        setProducts(formattedData);
        setFilteredProducts(formattedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterProducts(query, selectedCity);
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    const city = event.target.value;
    setSelectedCity(city);
    filterProducts(searchQuery, city);
  };

  const filterProducts = (query: string, city: string) => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.productId && product.productId.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query));
      const matchesCity = city ? product.deliverableCities.includes(city) : true;
      return matchesSearch && matchesCity;
    });
    setFilteredProducts(filtered);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to the first one
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', marginTop: '1rem' }}>
        {/* Search Field */}
        <TextField
          label="Search by Name, Product ID, or Description"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* City Filter */}
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
  <InputLabel id="city-select-label">Filter by City</InputLabel>
  <Select
    labelId="city-select-label"
    value={selectedCity}
    onChange={handleCityChange}
    label="Filter by City"
  >
    <MenuItem value="">
      <em>All</em>
    </MenuItem>
    {Array.from(new Set(products.flatMap((product) => product.deliverableCities)))
      .map((city, index) => (
        <MenuItem key={index} value={city}>
          {city}
        </MenuItem>
      ))}
  </Select>
</FormControl>

      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ width: '100%', height: 'calc(95vh - 200px)' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: column.bold ? 'bold' : 'normal',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                    }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    {columns.slice(1).map((column) => {
                      const value = column.id === 'description' 
                        ? truncateDescription(product[column.id] as string)
                        : column.id === 'price' 
                        ? <strong>{product[column.id]}</strong> 
                        : product[column.id];

                      return (
                        <TableCell key={column.id} style={{ fontWeight: column.bold ? 'bold' : 'normal' }}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        
      </Paper>
    </div>
    
  );
}

