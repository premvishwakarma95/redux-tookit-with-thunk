import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(login({ email, password }));
    if (response?.payload?.success) {
      navigate('/dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-6">Please login to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 px-4 py-3 rounded-lg text-white placeholder-gray-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative mb-4">
            <input
              type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
              placeholder="Password"
              className="w-full bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-3 rounded-lg text-white placeholder-gray-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4 text-gray-400 text-sm">
          <a href="/forgot-password" className="hover:text-white">Forgot Password?</a>
          <a href="/register" className="hover:text-white">Create an Account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
