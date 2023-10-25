import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Dashboard from './Screens/Dashboard';
import AddNewItem from './Screens/AddNewItem';
import ViewOrder from './Screens/ViewOrder';
import Login from './Screens/Login';
import { useEffect } from 'react';

// Function to check if the JWT token is valid
const isTokenValid = () => {
  const token = localStorage.getItem('authtoken');
  // Add your logic here to validate the token (e.g., check expiration, signature, etc.)
  // For simplicity, we'll just check if the token exists.
  return token !== null;
};

// Custom wrapper component to protect routes
const ProtectedRoute = ({ element, path }) => {
  useEffect(() => {
    // Check for token validity on component mount
    if (!isTokenValid()) {
      // If the token is not valid, navigate the user back to the login page
      window.location.href = '/'; // Use this method to force a full reload and clear the component state
      // Alternatively, you can use the `useNavigate` hook from `react-router-dom` to navigate programmatically
      // For example: const navigate = useNavigate(); navigate('/');
    }
  }, []);

  // Render the element (component) only if the token is valid
  return isTokenValid() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/Addnewitem" element={<ProtectedRoute element={<AddNewItem />} />} />
          <Route path="/vieworders" element={<ProtectedRoute element={<ViewOrder />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
