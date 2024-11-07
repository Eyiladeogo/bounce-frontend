import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice'; // Import your logout action
import api from '../utils/api';

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch(); // Use Redux dispatch for logout action

  const user = useSelector(state => state.auth.user)

  const handleLogout = async () => {
    try {
        await api.post('/user/logout/')
        dispatch(logout()); // Dispatch the logout action when clicked
    } catch (error) {
        console.error('Error logging out', error)
        setErrorMessage('Server Error occured')
    }
  };

  // JSX when dropdown is not open
  if (!isOpen) {
    return (
      <FaUser
        className="text-black cursor-pointer"
        title="User Profile"
        onClick={() => setIsOpen(true)} // Show dropdown when clicked
      />
    );
  }

  // JSX when dropdown is open
  return (
    <div className="relative">
      {/* User Icon */}
      <FaUser
        className="text-black cursor-pointer"
        title="User Profile"
        onClick={() => setIsOpen(false)} // Close dropdown when clicked
      />

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
        {/* Greeting */}
        <p className="text-gray-700 mb-2">Hello, {user}!</p>
        
        {/* Horizontal Rule */}
        <hr className="border-t border-gray-300" />

        {errorMessage && <p className="error">{errorMessage}</p>}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-red-500 w-full text-left px-2 py-1 hover:bg-gray-100 mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
