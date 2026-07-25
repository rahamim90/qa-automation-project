import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import BarberDetail from './pages/BarberDetail';
import BookingConfirmation from './pages/BookingConfirmation';
import Products from './pages/Products';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { api } from './api/client';

export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    api
      .adminMe()
      .then((data) => setUsername(data.username))
      .catch(() => setUsername(null))
      .finally(() => setAuthChecked(true));
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/barbers/:slug" element={<BarberDetail />} />
            <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/admin/login"
              element={
                username ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <AdminLogin onLoggedIn={() => setUsername(true)} />
                )
              }
            />
            <Route
              path="/admin"
              element={
                !authChecked ? (
                  <p className="mx-auto max-w-4xl px-6 py-16 text-center text-cream/70">טוען...</p>
                ) : username ? (
                  <AdminDashboard username={username} onLoggedOut={() => setUsername(null)} />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
