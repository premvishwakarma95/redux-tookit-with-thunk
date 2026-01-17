import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary via-secondary to-blue-500 text-white min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-fixed bg-center opacity-30" style={{ backgroundImage: 'url("https://source.unsplash.com/random/1920x1080")' }}></div>

      <motion.h1
        className="text-5xl sm:text-6xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Task Manager
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl mb-10 px-4 sm:px-8 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Manage your tasks efficiently with our simple and intuitive Task Manager. Stay on top of your to-dos, track progress, and achieve more!
      </motion.p>

      <div className="flex space-x-6">
        <motion.div
          className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/login">Login</Link>
        </motion.div>

        <motion.div
          className="bg-secondary hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/register">Register</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
