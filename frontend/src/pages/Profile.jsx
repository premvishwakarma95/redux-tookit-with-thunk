import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/authSlice'; // Action to update user data
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const { data } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(data?.username || '');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (newName.trim() === '') {
      toast.error('Name cannot be empty!');
      return;
    }
    dispatch(updateUser({ name: newName }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* Reusable Navbar */}
      <div className="flex flex-col items-center justify-center py-10 px-4 md:px-10">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Profile</h1>
          <div className="flex flex-col items-start mb-6">
            {/* Avatar Icon */}
            <div className="flex justify-center w-full mb-4">
              <FaUserCircle className="w-24 h-24 sm:w-36 sm:h-36 text-gray-400" />
            </div>
            {/* User Name */}
            <div className="w-full mb-4">
              <p className="text-gray-400 text-sm">Name:</p>
              {isEditing ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
                />
              ) : (
                <p className="text-lg sm:text-xl font-semibold">{data?.username || 'Not Available'}</p>
              )}
            </div>
            {/* User Email */}
            <div className="w-full">
              <p className="text-gray-400 text-sm">Email:</p>
              <p className="text-lg sm:text-xl font-semibold">{data?.email || 'Not Available'}</p>
            </div>
          </div>
          {/* Edit and Save Buttons */}
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg"
                onClick={() => setIsEditing(true)}
              >
                Edit Name
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
