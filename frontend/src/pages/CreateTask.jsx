import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/slices/taskSlice';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await dispatch(createTask({title, description, dueDate, priority}));

      console.log('res------',response);
      
      if(response?.payload?.success){
        navigate('/dashboard');
      }
    } catch (error) {
    //   toast.error('Error creating task. Please try again.');
    } finally {
      setIsSubmitting(false);
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-darkBackground min-h-screen text-white">
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">Create New Task</h1>
        <form
          className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border-2 border-gray-600 focus:border-primary focus:outline-none transition-all duration-300 text-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border-2 border-gray-600 focus:border-primary focus:outline-none transition-all duration-300 text-lg"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="date"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border-2 border-gray-600 focus:border-primary focus:outline-none transition-all duration-300"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <select
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border-2 border-gray-600 focus:border-primary focus:outline-none transition-all duration-300"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-primary text-white py-3 rounded-lg transform hover:scale-105 transition-all duration-300 text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="60"
                  />
                </svg>
                Creating...
              </div>
            ) : (
              'Create Task'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
