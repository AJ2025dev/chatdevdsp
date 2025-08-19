'''
Main application component that sets up routing.
'''
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Login from './components/Login';
import Signup from './components/Signup';
import Verify from './components/Verify';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Add this import
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;