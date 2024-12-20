import React, { useState, useEffect } from 'react';

const UserAccount = () => {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([
    { username: 'firstuser', password: '1234' },
    { username: 'seconduser', password: '2345' },
  ]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUsername(user.username);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);

      const currentUser = users.find((u) => u.username === user.username);
      if (currentUser && currentUser.password === currentPassword) {
        const updatedUsers = users.map((u) =>
          u.username === user.username
            ? {
                ...u,
                username: newUsername || user.username,
                password: newPassword || currentUser.password,
              }
            : u
        );

        localStorage.setItem('users', JSON.stringify(updatedUsers));

        const updatedUser = {
          ...user,
          username: newUsername || user.username,
          password: newPassword || currentUser.password,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        setNewUsername('');
        setNewPassword('');
        setCurrentPassword('');
        setError('');
      } else {
        setError('Current password is incorrect.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">User Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              New Username
            </label>
            <input
              type="text"
              id="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="text"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
