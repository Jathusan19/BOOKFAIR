import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

interface Reservation {
    _id: string;
    stall: {
        code: string;
        size: string;
    };
    qrCodeImageUrl: string;
    status: string;
}

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const [genres, setGenres] = useState<string[]>(user?.genres || []);
    const [newGenre, setNewGenre] = useState('');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.genres) setGenres(user.genres);
        fetchReservations();
    }, [user]);

    const fetchReservations = async () => {
        try {
            const response = await api.get('/reservations/my');
            setReservations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch reservations', error);
            setLoading(false);
        }
    };

    const handleAddGenre = async () => {
        if (!newGenre.trim()) return;
        const updatedGenres = [...genres, newGenre.trim()];
        try {
            await api.put('/users/me/genres', { genres: updatedGenres });
            setGenres(updatedGenres);
            setNewGenre('');
        } catch (error) {
            console.error('Failed to update genres', error);
        }
    };

    const handleRemoveGenre = async (genreToRemove: string) => {
        const updatedGenres = genres.filter(g => g !== genreToRemove);
        try {
            await api.put('/users/me/genres', { genres: updatedGenres });
            setGenres(updatedGenres);
        } catch (error) {
            console.error('Failed to update genres', error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <nav className="navbar">
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>Bookfair Vendor Portal</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>Welcome, {user?.name}</span>
                    <button onClick={logout} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                </div>
            </nav>

            <div className="container">
                <div className="grid-2">

                    {/* Genres Section */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Your Literary Genres</h2>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Add a genre (e.g. Fiction)"
                                value={newGenre}
                                onChange={(e) => setNewGenre(e.target.value)}
                            />
                            <button onClick={handleAddGenre} className="btn btn-primary">Add</button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {genres.map((genre, idx) => (
                                <span key={idx} className="tag">
                                    {genre}
                                    <button onClick={() => handleRemoveGenre(genre)} style={{ color: '#ef4444', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}>&times;</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Reservations Section */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Your Reservations</h2>
                            <Link to="/reserve" className="btn btn-success" style={{ textDecoration: 'none' }}>
                                Reserve New Stall
                            </Link>
                        </div>

                        {loading ? <p>Loading...</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {reservations.length === 0 ? (
                                    <p style={{ color: '#6b7280' }}>No reservations yet.</p>
                                ) : (
                                    reservations.map((res) => (
                                        <div key={res._id} style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Stall {res.stall.code}</p>
                                                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{res.stall.size}</p>
                                                <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>{res.status}</p>
                                            </div>
                                            {res.qrCodeImageUrl && (
                                                <img src={res.qrCodeImageUrl} alt="QR" style={{ width: '4rem', height: '4rem' }} />
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
