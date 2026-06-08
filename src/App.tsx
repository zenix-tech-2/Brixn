import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './lib/state';
import Layout from './components/Layout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import ProductDetail from './pages/ProductDetail';
import Creators from './pages/Creators';
import CreatorStore from './pages/CreatorStore';
import AILab from './pages/AILab';
import Auth from './pages/Auth';
import Dashboard, { Purchases, Earnings, Storefront, Settings as SettingsPage } from './pages/Dashboard';
import Library from './pages/Library';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';
import Sell from './pages/Sell';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="creators" element={<Creators />} />
          <Route path="creator/:handle" element={<CreatorStore />} />
          <Route path="ai" element={<AILab />} />
          <Route path="auth" element={<Auth />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="purchases" element={<Purchases />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="store" element={<Storefront />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="library" element={<Library />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="sell" element={<Sell />} />
          <Route path="legal/:page" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
