import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async() => {
    const response = await dispatch(logout());
    if(response?.payload?.success){
      navigate('/');
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-primary hover:text-indigo-500">
          Task Manager
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="hover:text-gray-300 text-xl font-semibold">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-gray-300 text-xl font-semibold">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-danger hover:bg-red-600 px-4 py-2 rounded transition-all"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-icons text-white"><GiHamburgerMenu/></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-4">
          <Link to="/dashboard" className="hover:text-gray-300 font-semibold">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-gray-300 font-semibold">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-danger hover:bg-red-600 px-4 py-2 rounded transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
