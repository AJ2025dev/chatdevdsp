'''
Component for user dashboard, role-based rendering.
'''
import React from 'react';
import { useAuth } from './AuthProvider';
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      {user?.role === 'ADMIN' && <p>Welcome, Admin!</p>}
      {user?.role === 'AGENCY' && <p>Welcome, Agency!</p>}
      {user?.role === 'ADVERTISER' && <p>Welcome, Advertiser!</p>}
    </div>
  );
};
export default Dashboard;