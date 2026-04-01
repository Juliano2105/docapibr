import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Docs from './pages/Docs';
import Status from './pages/Status';
import Login from './pages/Login';
import Register from './pages/Register';

import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DashboardSearch from './pages/DashboardSearch';
import ApiKeys from './pages/ApiKeys';
import Usage from './pages/Usage';
import Logs from './pages/Logs';
import Profile from './pages/Profile';

import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/AdminOverview';
import AdminClients from './pages/AdminClients';
import AdminPlans from './pages/AdminPlans';
import AdminAudit from './pages/AdminAudit';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col font-sans selection:bg-blue-accent/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/status" element={<Status />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Client Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="search" element={<DashboardSearch />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="usage" element={<Usage />} />
              <Route path="logs" element={<Logs />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="plans" element={<AdminPlans />} />
              <Route path="audit" element={<AdminAudit />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
