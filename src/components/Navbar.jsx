import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, PlusCircle, Users, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-white bg-indigo-600/20' : 'text-slate-400 hover:text-white';
    };

    const navItems = [
        { path: '/', label: 'Events', icon: Calendar },
        { path: '/create', label: 'Create Event', icon: PlusCircle },
        { path: '/admin', label: 'Admin', icon: LayoutDashboard },
    ];

    return (
        <nav style={{
            height: 'var(--nav-height)',
            borderBottom: '1px solid var(--glass-border)',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)'
        }}>
            <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--accent-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Calendar size={20} color="white" />
                    </div>
                    <span>Event<span style={{ color: 'var(--accent-primary)' }}>Flow</span></span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: location.pathname === item.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                transition: 'color 0.2s'
                            }}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
