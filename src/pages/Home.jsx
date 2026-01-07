import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';

const Home = () => {
    const { events } = useEvents();

    return (
        <div className="container animate-fade-in" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.1 }}>
                    Discover <span style={{ color: 'var(--accent-primary)' }}>Extraordinary</span><br />Events
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Explore and book tickets for the most exciting conferences, workshops, and meetups happening around you.
                </p>
            </header>

            <div className="card-grid">
                {events.map(event => (
                    <div key={event._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={event.image}
                                alt={event.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(15, 23, 42, 0.8)',
                                backdropFilter: 'blur(4px)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '2rem',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                            }}>
                                {event.price === 0 ? 'Free' : `$${event.price}`}
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.25rem 0 0.5rem 0' }}>{event.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {event.description}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    <Calendar size={14} />
                                    <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    <MapPin size={14} />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto' }}>
                                <Link to={`/event/${event._id}`} className="btn btn-primary" style={{ width: '100%' }}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
