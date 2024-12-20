import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importujeme useNavigate

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook pro přesměrování

  const handleCreateAccount = (e) => {
    e.preventDefault();
    
    // Načteme všechny uživatele z localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Zkontrolujeme, zda už uživatel s tímto jménem neexistuje
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      setError('Tento uživatel již existuje.');
      return;
    }

    // Vytvoříme nového uživatele
    const newUser = { username, password, contacts: [], items: [] };
    users.push(newUser);
    
    // Uložíme aktualizovaný seznam uživatelů do localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Přesměrujeme uživatele na přihlašovací stránku
    navigate('/');  // Přesměrování na Login stránku
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Vytvořit účet</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleCreateAccount}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Vytvořit účet
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
