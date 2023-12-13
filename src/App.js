import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { AboutPage } from './pages/AboutPage';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboardPage } from './admin/AdminDashboardPage';
import { AdminBookingPage } from './admin/AdminBookingPage';
import { AdminAddPackagesPage } from './admin/AdminAddPackagesPage';
import { fetchData } from './components/Header';

export function App() {
  const currentLanguage = localStorage.getItem('shelby-Language') || 'en';
  const [navbar, setNavbar] = useState([]);
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    fetchData()
      .then(data => {
        setNavbar(data.navbarData);
        setFooter(data.footerData);
      })
      .catch(error => {
        console.error("An error occurred while fetching data:", error);
      });
  }, [currentLanguage]);


  return (
    <div className='App'>
      {navbar && <Header navbar={navbar} />}

      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/booking' element={<BookingPage />} />
          <Route path='/booking/:id' element={<TourDetailPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/admin' element={<AdminLoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path='/admin/add/packages' element={<AdminAddPackagesPage />} exact />
            <Route path='/admin/booking' element={<AdminBookingPage />} exact />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </main>

      {footer && <Footer footer={footer} />}
    </div>
  );
}