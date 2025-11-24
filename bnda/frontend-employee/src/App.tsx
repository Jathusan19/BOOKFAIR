import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StallsPage from './pages/StallsPage';
import ReservationsPage from './pages/ReservationsPage';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;

    return <>{children}</>;
};

const NavBar: React.FC = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    if (location.pathname === '/login') return null;

    return (
        <nav className="navbar">
            <div className="flex items-center">
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', marginRight: '2rem' }}>Bookfair Admin</span>
                <div className="nav-links">
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
                    <Link to="/stalls" className={location.pathname === '/stalls' ? 'active' : ''}>Stalls</Link>
                    <Link to="/reservations" className={location.pathname === '/reservations' ? 'active' : ''}>Reservations</Link>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span style={{ fontSize: '0.875rem' }}>{user?.name}</span>
                <button onClick={logout} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
            </div>
        </nav>
    );
};

const AppContent: React.FC = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                } />
                <Route path="/stalls" element={
                    <ProtectedRoute>
                        <StallsPage />
                    </ProtectedRoute>
                } />
                <Route path="/reservations" element={
                    <ProtectedRoute>
                        <ReservationsPage />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;
