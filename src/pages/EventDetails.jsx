import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { MapPin, Calendar, Clock, Users, Mail, User, CheckCircle } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { events, registerForEvent } = useEvents();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const event = events.find(e => e._id === id);

    if (!event) {
        return <div className="container" style={{ paddingTop: '6rem' }}>Event not found</div>;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate network delay
        setTimeout(() => {
            const success = registerForEvent(event._id, formData);
            if (success) {
                setStatus('success');
            } else {
                alert('Registration failed or event full');
                setStatus('idle');
            }
        }, 1000);
    };

    const isFull = event.registered >= event.capacity;

    return (
        <div className="container animate-fade-in" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '2rem' }}>
            <button
                onClick={() => navigate('/')}
                style={{ background: 'transparent', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                ← Back to Events
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                {/* Main Content */}
                <div>
                    <div style={{ height: '400px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '2rem' }}>
                        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{event.title}</h1>

                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={20} className="text-accent" style={{ color: 'var(--accent-primary)' }} />
                            <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={20} style={{ color: 'var(--accent-primary)' }} />
                            <span>{event.time}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={20} style={{ color: 'var(--accent-primary)' }} />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About this Event</h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.1rem' }}>{event.description}</p>
                    </div>
                </div>

                {/* Sidebar / Registration */}
                <div>
                    <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '6rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Registration
                            {event.price === 0 ? (
                                <span style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>Free</span>
                            ) : (
                                <span>${event.price}</span>
                            )}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: isFull ? 'var(--danger)' : 'var(--success)' }}>
                            <Users size={18} />
                            <span>{event.capacity - event.registered} spots remaining</span>
                        </div>

                        {status === 'success' ? (
                            <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', border: '1px solid var(--success)', textAlign: 'center' }}>
                                <CheckCircle size={48} color="var(--success)" style={{ margin: '0 auto 1rem auto' }} />
                                <h4 style={{ fontWeight: 'bold', color: 'var(--success)', marginBottom: '0.5rem' }}>Registration Confirmed!</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    A confirmation email has been sent to {formData.email}.
                                </p>
                            </div>
                        ) : (
                            <>
                                {!showForm ? (
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                        onClick={() => setShowForm(true)}
                                        disabled={isFull}
                                    >
                                        {isFull ? 'Sold Out' : 'Register Now'}
                                    </button>
                                ) : (
                                    <form onSubmit={handleRegister} className="animate-fade-in">
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                                            <div style={{ position: 'relative' }}>
                                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                                <input
                                                    type="text"
                                                    required
                                                    className="input-field"
                                                    placeholder="John Doe"
                                                    style={{ paddingLeft: '2.5rem' }}
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
                                            <div style={{ position: 'relative' }}>
                                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                                <input
                                                    type="email"
                                                    required
                                                    className="input-field"
                                                    placeholder="john@example.com"
                                                    style={{ paddingLeft: '2.5rem' }}
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button
                                                type="button"
                                                onClick={() => setShowForm(false)}
                                                className="btn btn-outline"
                                                style={{ flex: 1 }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                style={{ flex: 1 }}
                                                disabled={status === 'submitting'}
                                            >
                                                {status === 'submitting' ? 'Processing...' : 'Confirm'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
