import React, { useEffect, useState } from 'react';
import api from '../api';

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState({ total: 0, reserved: 0, available: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stalls');
                const stalls = response.data;
                const total = stalls.length;
                const reserved = stalls.filter((s: any) => s.isReserved).length;
                setStats({
                    total,
                    reserved,
                    available: total - reserved
                });
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch stats', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="container">Loading stats...</div>;

    return (
        <div className="container">
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>Dashboard Overview</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-label">Total Stalls</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: '#dc2626' }}>{stats.reserved}</div>
                    <div className="stat-label">Reserved</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value" style={{ color: '#16a34a' }}>{stats.available}</div>
                    <div className="stat-label">Available</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
