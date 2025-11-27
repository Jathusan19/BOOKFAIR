import React, { useEffect, useState } from 'react';
import api from '../api';

interface Stall {
    _id: string;
    code: string;
    size: string;
    isReserved: boolean;
    currentReservation?: {
        _id: string;
        qrCodeToken: string;
    };
}

const StallsPage: React.FC = () => {
    const [stalls, setStalls] = useState<Stall[]>([]);
    const [filter, setFilter] = useState('ALL');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStalls();
    }, []);

    const fetchStalls = async () => {
        try {
            const response = await api.get('/admin/stalls');
            setStalls(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch stalls', error);
            setLoading(false);
        }
    };

    const filteredStalls = stalls.filter(stall => {
        if (filter === 'ALL') return true;
        if (filter === 'RESERVED') return stall.isReserved;
        if (filter === 'AVAILABLE') return !stall.isReserved;
        return true;
    });

    return (
        <div className="container">
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Stall Management</h1>
                <select
                    className="form-input"
                    style={{ width: 'auto' }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="ALL">All Stalls</option>
                    <option value="RESERVED">Reserved</option>
                    <option value="AVAILABLE">Available</option>
                </select>
            </div>

            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Size</th>
                            <th>Status</th>
                            <th>Reservation ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStalls.map(stall => (
                            <tr key={stall._id}>
                                <td style={{ fontWeight: 'bold' }}>{stall.code}</td>
                                <td>{stall.size}</td>
                                <td>
                                    <span className={`status-badge ${stall.isReserved ? 'status-reserved' : 'status-available'}`}>
                                        {stall.isReserved ? 'Reserved' : 'Available'}
                                    </span>
                                </td>
                                <td style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                                    {stall.currentReservation ? stall.currentReservation._id : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StallsPage;
