import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProductionPlanning from './pages/ProductionPlanning.tsx';
import QualityControl from './pages/QualityControl.tsx';
import SupplyChain from './pages/SupplyChain.tsx';
import DealerNetwork from './pages/DealerNetwork.tsx';
import PartsInventory from './pages/PartsInventory.tsx';
import SalesDispatch from './pages/SalesDispatch.tsx';
import Reports from './pages/Reports.tsx';
import Compliance from './pages/Compliance.tsx';
import Settings from './pages/Settings.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/production" element={<ProductionPlanning />} />
        <Route path="/quality" element={<QualityControl />} />
        <Route path="/supply-chain" element={<SupplyChain />} />
        <Route path="/dealers" element={<DealerNetwork />} />
        <Route path="/inventory" element={<PartsInventory />} />
        <Route path="/sales" element={<SalesDispatch />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
