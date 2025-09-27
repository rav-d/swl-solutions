import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ClientPortal from './features/client-portal/ClientPortal';
import CRMDashboard from './features/crm/CRMDashboard';
import AnalyticsDashboard from './features/analytics/AnalyticsDashboard';
import EmailMarketing from './features/marketing/EmailMarketing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />} />
        <Route path="/portal" element={<ClientPortal />} />
        <Route path="/crm" element={<CRMDashboard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/marketing" element={<EmailMarketing />} />
      </Routes>
    </Router>
  );
};

export default App;
