import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask, updateTaskStatus } from '../redux/slices/taskSlice';
import { FaEye, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [visibleTasks, setVisibleTasks] = useState(12);
  const tasks = useSelector((store) => store?.task?.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await dispatch(getTasks());
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const deleteTaskById = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(taskId));
        await dispatch(getTasks());
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const updateTaskStatusById = async (id, status) => {
    try {
      await dispatch(updateTaskStatus({ id, status }));
      await dispatch(getTasks());
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const loadMoreTasks = () => {
    setVisibleTasks((prev) => prev + 10);
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-darkBackground text-white">
      <Navbar />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-center text-white">Your Tasks</h1>
          <motion.button
            onClick={() => navigate('/task/create')}
            className="bg-primary hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Create New Task
          </motion.button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks?.length > 0 &&  tasks.slice(0, visibleTasks).map((task) => (
            <motion.div
              key={task._id}
              className={`bg-gray-800 p-6 rounded-xl shadow-lg border-l-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                task.priority === 'High'
                  ? 'border-danger'
                  : task.priority === 'Medium'
                  ? 'border-warning'
                  : 'border-success'
              }`}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold text-white truncate mb-3">{task.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-3 mb-3">{task.description}</p>
              <p className="text-xs text-gray-500 mb-3">Due: {formatDate(task.dueDate)}</p>
              <p
                className={`text-xs ${
                  task.status === 'Completed' ? 'text-success' : 'text-warning'
                } mb-4`}
              >
                {task.status}
              </p>

              <div className="flex justify-between items-center mt-4">
                <motion.button
                  onClick={() => navigate(`/task/${task._id}`)}
                  className="text-primary hover:text-blue-500 transition duration-300"
                  title="View Task Details"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaEye size={20} />
                </motion.button>

                <motion.button
                  onClick={() => deleteTaskById(task._id)}
                  className="text-danger hover:text-red-500 transition duration-300"
                  title="Delete Task"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaTrash size={20} />
                </motion.button>

                {task.status !== 'Completed' && (
                  <motion.button
                    onClick={() => updateTaskStatusById(task._id, 'Completed')}
                    className="text-success hover:text-green-500 transition duration-300"
                    title="Mark as Completed"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaCheckCircle size={20} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {visibleTasks < tasks.length && (
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={loadMoreTasks}
              className="bg-primary hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
