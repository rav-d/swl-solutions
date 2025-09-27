import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ClientPortal from './features/client-portal/ClientPortal';
import CRMDashboard from './features/crm/CRMDashboard';
import AnalyticsDashboard from './features/analytics/AnalyticsDashboard';
import EmailMarketing from './features/marketing/EmailMarketing';
import AdminLayout from './features/admin/AdminLayout';
import AdminDashboard from './features/admin/AdminDashboard';
import LeadsManagement from './features/admin/LeadsManagement';
import ProjectsManagement from './features/admin/ProjectsManagement';
import BookingsManagement from './features/admin/BookingsManagement';
import UserManagement from './features/admin/UserManagement';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />} />
        <Route path="/portal" element={<ClientPortal />} />
        <Route path="/crm" element={<CRMDashboard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/marketing" element={<EmailMarketing />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<LeadsManagement />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="users" element={<UserManagement />} />
          <Route path="content" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Content Management - Coming Soon</h1></div>} />
          <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Analytics - Coming Soon</h1></div>} />
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Settings - Coming Soon</h1></div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
