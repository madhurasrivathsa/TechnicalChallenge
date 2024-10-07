import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login component for handling user authentication
function Login() {
  const navigate = useNavigate();
  
  const [authToken, setAuthToken] = useState(null);  // Store authentication token
  const [error, setError] = useState(null);          // Store error messages
  const [formData, setFormData] = useState({         // Store form input values
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);     // Track loading state during API calls

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,           // Spread existing form data
      [name]: value,         // Update only the changed field
    }));
  };

  // Handle form submission and API call
  const handleLogin = async (e) => {
    e.preventDefault();      // Prevent default form submission behavior
    setLoading(true);        // Start loading state
    setError(null);          // Clear any existing errors

    // Basic validation
    if (!formData.username || !formData.password) {
      setLoading(false);
      setError("Both fields are required.");
      return;
    }
    
    if (formData.password.length < 6) {
      setLoading(false);
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Attempt to login using fetch API
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please check your credentials.');
      }

      // Handle successful login
      const data = await response.json();
      setAuthToken(data.accessToken);           // Store the auth token
      setFormData({ username: '', password: '' });  // Clear form data
      navigate('/Products');                    // Navigate to Products page
    } catch (error) {
      // Handle any errors that occurred during login
      setAuthToken(null);
      setError(error.message);
    } finally {
      setLoading(false);     // Always stop loading state
    }
  };

  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-5 border border-2 border-gray-900 rounded-lg shadow-md">
        <h1 className="text-3xl mb-5 text-center">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              value={formData.username}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Username"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              value={formData.password}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
              onChange={handleInputChange}
              autoComplete="on"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <button
              type="submit"
              className={`w-full sm:w-auto bg-green-600 text-white py-2 px-2 rounded-md shadow-md transition-colors duration-300 hover:bg-green-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            
            <button
              onClick={() => navigate("/SignUp")}
              className="w-full sm:w-auto bg-green-600 text-white py-2 px-2 rounded-md shadow-md transition-colors duration-300 hover:bg-green-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4">
          {authToken && <p className="text-green-500">Logged in Successfully! Token: {authToken}</p>}
          {error && <p className="text-red-500">{error} Please use UserName: 'emilys' and Password:'emilyspass' for testing </p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
