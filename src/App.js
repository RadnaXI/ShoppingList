import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import ShoppingListOverview from './components/ShoppingListOverview';
import ShoppingListDetail from './components/ShoppingListDetail';
import DropdownUsers from './templates/DropdownUsers';
import UserAccount from './components/UserAccount';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import CreateAccount from './components/CreateAccount';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <header className="flex justify-between items-center bg-slate-100 p-4 shadow-md">
        <Link
          to="/shopping-list"
          className={`text-3xl font-bold ${!isAuthenticated ? 'pointer-events-none opacity-50' : ''}`}

        >
          Shopping Lists
        </Link>
        <DropdownUsers 
          className="absolute top-4 right-4" 
          disabled={!isAuthenticated}
        />
      </header>
      
      <main className="p-4">
        <Routes>
          {!isAuthenticated ? (
            <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          ) : (
            <>
              <Route path="/shopping-list" element={<ShoppingListOverview />} />
              <Route path="/shopping-list/list-detail/:id" element={
                <PrivateRoute>
                  <ShoppingListDetail />
                </PrivateRoute>
              } />
              <Route path="/Account" element={
                <PrivateRoute>
                  <UserAccount />
                </PrivateRoute>
              } />
            </>
          )}
          
          <Route path="/create-account" element={<CreateAccount />} />

          <Route path="*" element={<Navigate to="/shopping-list" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
