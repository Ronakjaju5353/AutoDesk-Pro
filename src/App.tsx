import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import VehicleStock from './pages/VehicleStock.tsx';
import SalesBookings from './pages/SalesBookings.tsx';
import ServiceCenter from './pages/ServiceCenter.tsx';
import CustomerManagement from './pages/CustomerManagement.tsx';
import FinanceInsurance from './pages/FinanceInsurance.tsx';
import TestDrives from './pages/TestDrives.tsx';
import Reports from './pages/Reports.tsx';
import Compliance from './pages/Compliance.tsx';
import Settings from './pages/Settings.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicle-stock" element={<VehicleStock />} />
        <Route path="/sales" element={<SalesBookings />} />
        <Route path="/service" element={<ServiceCenter />} />
        <Route path="/customers" element={<CustomerManagement />} />
        <Route path="/finance" element={<FinanceInsurance />} />
        <Route path="/test-drives" element={<TestDrives />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
