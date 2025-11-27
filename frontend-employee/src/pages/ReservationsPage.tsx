import React, { useEffect, useState } from 'react';
import api from '../api';

interface Reservation {
    _id: string;
    user: {
        name: string;
        email: string;
        businessName?: string;
    };
    stall: {
        code: string;
        size: string;
    };
    status: string;
    qrCodeToken: string;
    createdAt: string;
}

const ReservationsPage: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await api.get('/admin/reservations');
            setReservations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch reservations', error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>Reservations</h1>

            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Stall</th>
                            <th>Vendor</th>
                            <th>Business</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res._id}>
                                <td style={{ fontWeight: 'bold' }}>{res.stall.code} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#64748b' }}>({res.stall.size})</span></td>
                                <td>
                                    <div>{res.user.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{res.user.email}</div>
                                </td>
                                <td>{res.user.businessName || '-'}</td>
                                <td>
                                    <span className="status-badge status-available" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                                        {res.status}
                                    </span>
                                </td>
                                <td>{new Date(res.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationsPage;
