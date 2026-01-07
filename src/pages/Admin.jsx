import React from 'react';
import { useEvents } from '../context/EventContext';
import { CheckCircle, Clock } from 'lucide-react';

const Admin = () => {
    const { registrations, events } = useEvents();

    // Calculate stats
    const totalEvents = events.length;
    const totalRegistrations = registrations.length;
    const totalRevenue = registrations.reduce((acc, reg) => {
        const event = events.find(e => e._id === reg.eventId);
        return acc + (event ? event.price : 0);
    }, 0);

    return (
        <div className="container animate-fade-in" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '2rem' }}>
            <h1 className="section-title">Dashboard</h1>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Events</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalEvents}</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Registrations</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalRegistrations}</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Revenue</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>${totalRevenue}</div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Registrations</h2>
                {registrations.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No registrations yet.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Attendee</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Event</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Date Registered</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.slice().reverse().map(reg => (
                                    <tr key={reg.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '500' }}>{reg.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{reg.email}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{reg.eventName}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                            {new Date(reg.date).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                color: 'var(--success)',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.875rem'
                                            }}>
                                                <CheckCircle size={14} /> Confirmed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
