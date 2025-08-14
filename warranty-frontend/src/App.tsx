import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CompanyPortal from './components/CompanyPortal';
import SellerPortal from './components/SellerPortal';
import CustomerPortal from './components/CustomerPortal';
import ServiceCenterPortal from './components/ServiceCenterPortal';
import AdminPortal from './components/AdminPortal';
import WalletConnect from './components/WalletConnect';

function App() {
  return (
    <ErrorBoundary>
      <WalletProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/company" element={<CompanyPortal />} />
              <Route path="/seller" element={<SellerPortal />} />
              <Route path="/customer" element={<CustomerPortal />} />
              <Route path="/service-center" element={<ServiceCenterPortal />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/connect" element={<WalletConnect />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </ErrorBoundary>
  );
}

export default App;
