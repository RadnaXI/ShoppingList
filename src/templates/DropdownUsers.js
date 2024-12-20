import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DropdownUsers = ({ disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [newUser, setNewUser] = useState('');
  const [dropdownWidth, setDropdownWidth] = useState('auto');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (dropdownRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '16px Arial';

      const longestTextWidth = users.reduce((maxWidth, user) => {
        const textWidth = context.measureText(user.username).width;
        return Math.max(maxWidth, textWidth);
      }, 0);

      const buttonWidth = 160;
      const padding = 20;
      setDropdownWidth(`${longestTextWidth + buttonWidth + padding}px`);
    }
  }, [users]);

  const handleAddUser = () => {
    if (newUser.trim() && !users.some(user => user.username === newUser)) {
      setUsers([...users, { username: newUser }]);
      setNewUser('');
    } else {
      alert('User already exists or invalid username.');
    }
  };

  const handleRemoveUser = (userToRemove) => {
    const updatedUsers = users.filter((user) => user.username !== userToRemove.username);
    setUsers(updatedUsers);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem('loggedInUser');
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdownUsersButton"
        onClick={toggleDropdown}
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        type="button"
        disabled={disabled}
      >
        Menu
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && !disabled && ( 
        <div
          id="dropdownUsers"
          className="absolute z-10 mt-2 min-w-72 right-10 bg-white rounded-lg shadow dark:bg-gray-700"
          style={{ width: dropdownWidth }}
        >
          <ul className="h-48 py-4 overflow-y-auto text-gray-700 dark:text-gray-200">
            {users.map((user, index) => (
              <li key={index} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <span>{user.username}</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleRemoveUser(user)} className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1">
                    Odstranit
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="p-3 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center">
              <input
                type="text"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="New user name"
                className="flex-1 p-2 text-sm border rounded-lg focus:outline-none"
              />
              <button onClick={handleAddUser} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                Add
              </button>
            </div>
            <div className="flex flex-col items-center mt-3 space-y-2">
              <Link to="/Account" className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 w-full text-center">
                Account
              </Link>
              <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 w-full text-center mt-2">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUsers;
