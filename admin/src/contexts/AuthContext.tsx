// import React, { createContext, useState } from 'react';
// import { useCookies } from 'react-cookie';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [, setCookie, removeCookie] = useCookies(['token']);



// const login = (token) => {
//     setCookie('token', token, { path: '/' });
//     setIsAuthenticated(true);
//     console.log('Token set:', token);
//   };
  
//   const logout = () => {
//     removeCookie('token', { path: '/' });
//     setIsAuthenticated(false);
//     console.log('Token removed'); 
//   };
  

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useState } from 'react';
// import { useCookies } from 'react-cookie';

// export const AuthContext = createContext();


// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null); // Store token here

//   const [, setCookie, removeCookie] = useCookies(['token']);

//   const login = (token) => {
//     setCookie('token', token, { path: '/' });
//     setIsAuthenticated(true);
//     setToken(token);  // Save the token in context
//     console.log('Token set:', token);
//   };

//   const logout = () => {
//     removeCookie('token', { path: '/' });
//     setIsAuthenticated(false);
//     setToken(null); // Clear the token on logout
//     console.log('Token removed');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useState, useEffect } from 'react';
// import { useCookies } from 'react-cookie';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null); // Store token here

//   const [cookies, setCookie, removeCookie] = useCookies(['token']);

//   // Check if token exists in cookies on mount
//   useEffect(() => {
//     const savedToken = cookies.token;
//     if (savedToken) {
//       setIsAuthenticated(true);
//       setToken(savedToken);  // Set token if exists
//     }
//   }, [cookies.token]); // Runs when cookies are updated

//   const login = (token) => {
//     setCookie('token', token, { path: '/' });
//     setIsAuthenticated(true);
//     setToken(token);  // Save the token in context
//     console.log('Token set:', token);
//   };

//   const logout = () => {
//     removeCookie('token', { path: '/' });
//     setIsAuthenticated(false);
//     setToken(null); // Clear the token on logout
//     console.log('Token removed');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// import React, { createContext, useState, useEffect } from 'react';
// import { useCookies } from 'react-cookie';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null); // Store token here
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [cookies, setCookie, removeCookie] = useCookies(['token']);

//   useEffect(() => {
//     const savedToken = cookies.token;
//     if (savedToken) {
//       setIsAuthenticated(true);
//       setToken(savedToken);
//     }
//     setLoading(false); // Authentication check is complete
//   }, [cookies.token]);

//   const login = (token) => {
//     setCookie('token', token, { path: '/' });
//     setIsAuthenticated(true);
//     setToken(token);
//     console.log('Token set:', token);
//   };

//   const logout = () => {
//     removeCookie('token', { path: '/' });
//     setIsAuthenticated(false);
//     setToken(null);
//     console.log('Token removed');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, token, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
// import { useCookies } from 'react-cookie';

// // Export AuthContextProps to use in other files
// export interface AuthContextProps {
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
//   token: string | null;
//   loading: boolean;
// }

// export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [cookies, setCookie, removeCookie] = useCookies(['token']);

//   useEffect(() => {
//     const savedToken = cookies.token;
//     if (savedToken) {
//       setIsAuthenticated(true);
//       setToken(savedToken);
//     }
//     setLoading(false);
//   }, [cookies.token]);

//   const login = (token: string): void => {
//     setCookie('token', token, { path: '/' });
//     setIsAuthenticated(true);
//     setToken(token);
//     console.log('Token set:', token);
//   };

//   const logout = (): void => {
//     removeCookie('token', { path: '/' });
//     setIsAuthenticated(false);
//     setToken(null);
//     console.log('Token removed');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, token, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useCookies } from 'react-cookie';

// Export AuthContextProps to use in other files
export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
  loading: boolean;
}

// Initialize AuthContext with a default value
export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: null,
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const savedToken = cookies.token;
    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
    }
    setLoading(false);
  }, [cookies.token]);

  const login = (token: string): void => {
    setCookie('token', token, { path: '/' });
    setIsAuthenticated(true);
    setToken(token);
    console.log('Token set:', token);
  };

  const logout = (): void => {
    removeCookie('token', { path: '/' });
    setIsAuthenticated(false);
    setToken(null);
    console.log('Token removed');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
