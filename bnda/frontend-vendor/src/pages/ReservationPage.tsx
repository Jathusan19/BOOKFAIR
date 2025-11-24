import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

interface Stall {
    _id: string;
    code: string;
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    row: number;
    col: number;
    isReserved: boolean;
}

const ReservationPage: React.FC = () => {
    const [stalls, setStalls] = useState<Stall[]>([]);
    const [selectedStalls, setSelectedStalls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStalls();
    }, []);

    const fetchStalls = async () => {
        try {
            const response = await api.get('/stalls');
            setStalls(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load stalls');
            setLoading(false);
        }
    };

    const toggleStall = (stallId: string) => {
        if (selectedStalls.includes(stallId)) {
            setSelectedStalls(selectedStalls.filter(id => id !== stallId));
        } else {
            if (selectedStalls.length >= 3) {
                alert('You can only select up to 3 stalls.');
                return;
            }
            setSelectedStalls([...selectedStalls, stallId]);
        }
    };

    const handleReserve = async () => {
        if (selectedStalls.length === 0) return;

        if (!window.confirm(`Are you sure you want to reserve ${selectedStalls.length} stalls?`)) return;

        try {
            await api.post('/reservations', { stallIds: selectedStalls });
            setSuccess('Reservation successful! Please check your email for the QR code.');
            setSelectedStalls([]);
            fetchStalls(); // Refresh map
            setTimeout(() => navigate('/home'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Reservation failed');
        }
    };

    const getStallClass = (stall: Stall) => {
        if (stall.isReserved) return 'stall-item stall-reserved';
        if (selectedStalls.includes(stall._id)) return 'stall-item stall-selected';
        return 'stall-item stall-available';
    };

    if (loading) return <div className="container">Loading map...</div>;

    return (
        <div className="container">
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Reserve Stalls</h1>
            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <div style={{ marginBottom: '1rem' }}>
                <p>Select up to 3 stalls.
                    <span className="legend-item" style={{ backgroundColor: '#10b981', marginLeft: '1rem' }}></span> Available
                    <span className="legend-item" style={{ backgroundColor: '#9ca3af' }}></span> Reserved
                    <span className="legend-item" style={{ backgroundColor: '#f59e0b' }}></span> Selected
                </p>
            </div>

            <div className="stall-grid" style={{ gridTemplateColumns: 'repeat(10, minmax(60px, 1fr))', width: 'fit-content' }}>
                {stalls.map((stall) => (
                    <div
                        key={stall._id}
                        onClick={() => !stall.isReserved && toggleStall(stall._id)}
                        className={getStallClass(stall)}
                        style={{
                            gridRow: stall.row,
                            gridColumn: stall.col,
                            minHeight: stall.size === 'LARGE' ? '100px' : stall.size === 'MEDIUM' ? '80px' : '60px'
                        }}
                    >
                        <span>{stall.code}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>{stall.size[0]}</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={handleReserve}
                    disabled={selectedStalls.length === 0}
                    className={`btn ${selectedStalls.length === 0 ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Reserve Selected ({selectedStalls.length})
                </button>
            </div>
        </div>
    );
};

export default ReservationPage;
