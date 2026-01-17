import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskDetails, updateTaskDetails } from '../redux/slices/taskSlice'; // Assuming actions for fetching and updating task details
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaSpinner, FaEdit } from 'react-icons/fa'; // Icons for status

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For handling loading state
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit modes
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskData = await dispatch(getTaskDetails(id));
        setTask(taskData.payload?.task); // Assuming task details are in payload
        setStatus(taskData.payload?.task.status); // Set initial status
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [id, dispatch]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsLoading(true);

    try {
      // Dispatch action to update status
      await dispatch(updateTaskDetails({ id, status: newStatus }));
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await dispatch(updateTaskDetails({ id, task }));
      const taskData = await dispatch(getTaskDetails(id));
      setTask(taskData.payload?.task);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!task) return <div className="text-center text-white">Loading...</div>;

  // Fallback values for missing fields
  const assignedTo = task.assignedTo || 'Not Assigned';
  const createdAt = task.createdAt ? new Date(task.createdAt).toLocaleString() : 'Not Available';

  // Format dueDate to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDueDate = formatDate(task.dueDate);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-black text-white p-6 sm:p-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg mb-6 flex items-center transition ease-in-out duration-300"
      >
        <FaArrowLeft className="mr-3" size={18} />
        Back to Dashboard
      </button>

      <div className="max-w-5xl mx-auto bg-gray-900 p-6 sm:p-10 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          {isEditing ? (
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="bg-gray-700 text-xl text-white py-2 px-4 rounded-lg"
            />
          ) : (
            task.title
          )}
        </h2>

        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between text-lg">
          <p className="text-gray-400">Due Date: <span className="font-semibold text-white">{formattedDueDate}</span></p>
          <div className="flex items-center space-x-2">
            <select
              value={status}
              onChange={handleStatusChange}
              className="bg-gray-700 text-white py-2 px-4 rounded-lg"
              disabled={isLoading || !isEditing}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            {isLoading ? (
              <FaSpinner className="animate-spin ml-3 text-gray-500" size={20} />
            ) : status === 'Completed' ? (
              <div className="flex items-center space-x-1 text-green-500">
                <FaCheckCircle size={24} />
                <span className="font-semibold">Completed</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-yellow-500">
                <FaExclamationCircle size={24} />
                <span className="font-semibold">Pending</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-medium text-white mb-3">Description</h3>
          <div className={`text-lg text-gray-300 ${task.description.length > 100 ? 'max-h-40 overflow-y-auto' : ''}`}>
            {isEditing ? (
              <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className="bg-gray-700 text-white py-2 px-4 rounded-lg w-full"
              />
            ) : (
              task.description
            )}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-white">Task Details</h3>
          <ul className="text-gray-300">
            <li className="flex justify-between">
              <span className="font-semibold text-gray-400">Priority:</span>
              {isEditing ? (
                <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                className="bg-gray-700 text-white py-2 px-4 rounded-lg"
                disabled={isLoading || !isEditing}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              ) : (
                task.priority
              )}
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-8">
          {isEditing ? (
            <>
              <button
                onClick={handleFormSubmit}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 mb-4 sm:mb-0"
              >
                Save Changes
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300"
            >
              <FaEdit className="mr-2" />
              Edit Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
