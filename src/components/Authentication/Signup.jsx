import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy user data for demonstration purposes
const dummyUsers = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' },
];

function Signup() {
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // State management using useState hooks
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');     // Store error messages
  const [success, setSuccess] = useState(''); // Store success messages

  // Handle changes in form inputs
  const handleChange = (e) => {
    setFormData({ 
      ...formData,           // Spread existing form data
      [e.target.name]: e.target.value // Update the changed field dynamically
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();      // Prevent default form submission behavior
    setError('');           // Clear any existing errors
    setSuccess('');         // Clear any existing success messages

    // Basic form validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    // Check if user already exists in dummy data
    const userExists = dummyUsers.some(
      (user) => user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      setError('User with this username or email already exists.');
    } else {
      // Simulate successful signup
      setSuccess('Signup successful!');
      setFormData({ username: '', email: '', password: '' }); // Clear form
      // Navigate to home page after 2 seconds
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    // Main container with full height and centered content
    <div className="min-h-screen bg-slate-500 flex justify-center items-center p-4">
      {/* White card container for signup form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-2 border-gray-900">
        <h2 className="text-3xl mb-6 text-center">Sign Up</h2>
        
        {/* Signup form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          {/* Email input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Password input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Button container - uses flex to handle responsive layout */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            {/* Login button - navigates to login page */}
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto bg-green-600 text-white p-2 rounded-md shadow-md hover:bg-green-500 transition duration-300"
            >
              Login
            </button>
            {/* Signup submit button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 text-white p-2 rounded-md shadow-md hover:bg-green-500 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Feedback section - shows error or success messages */}
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        {success && <p className="mt-4 text-green-500 text-sm">{success}</p>}
      </div>
    </div>
  );
}

export default Signup;