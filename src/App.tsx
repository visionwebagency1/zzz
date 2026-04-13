import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CollectiesPage from './pages/CollectiesPage';
import ProductPage from './pages/ProductPage';
import DiamantPage from './pages/DiamantPage';
import ShowroomPage from './pages/ShowroomPage';
import AfspraakPage from './pages/AfspraakPage';
import ContactPage from './pages/ContactPage';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/collecties" element={<CollectiesPage />} />
        <Route path="/collecties/:id" element={<ProductPage />} />
        <Route path="/diamanten" element={<DiamantPage />} />
        <Route path="/showroom" element={<ShowroomPage />} />
        <Route path="/afspraak" element={<AfspraakPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ivory font-body">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
