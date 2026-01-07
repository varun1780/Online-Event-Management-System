import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { Upload } from 'lucide-react';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { addEvent } = useEvents();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        price: '',
        capacity: '',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000&q=80' // Default image
    });

    const [imageMode, setImageMode] = useState('url'); // 'url' or 'file'
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('date', formData.date);
        data.append('time', formData.time);
        data.append('location', formData.location);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('capacity', formData.capacity);

        if (imageMode === 'file' && imageFile) {
            data.append('image', imageFile);
        } else {
            data.append('image', formData.image);
        }

        addEvent(data);
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="section-title">Create New Event</h1>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Event Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="input-field"
                                placeholder="Ex: Tech Conference 2026"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="input-field"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    required
                                    className="input-field"
                                    value={formData.time}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location</label>
                            <input
                                type="text"
                                name="location"
                                required
                                className="input-field"
                                placeholder="123 Convention Center, NY"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    required
                                    className="input-field"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    min="1"
                                    required
                                    className="input-field"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                required
                                className="input-field"
                                placeholder="Describe what attendees can expect..."
                                value={formData.description}
                                onChange={handleChange}
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Event Image</label>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <button
                                    type="button"
                                    className={`btn ${imageMode === 'url' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setImageMode('url')}
                                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                                >
                                    Image URL
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${imageMode === 'file' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setImageMode('file')}
                                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                                >
                                    Upload File
                                </button>
                            </div>

                            {imageMode === 'url' ? (
                                <div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <input
                                            type="url"
                                            name="image"
                                            required={imageMode === 'url'}
                                            className="input-field"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <button type="button" className="btn btn-outline" title="Use default">
                                            <Upload size={18} />
                                        </button>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                        Paste a direct link to an image (e.g., from Unsplash)
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required={imageMode === 'file'}
                                        onChange={handleFileChange}
                                        className="input-field" // Reuse input styling if appropriate, or leave plain
                                        style={{ padding: '0.5rem' }}
                                    />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                        Upload an image from your device.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => navigate('/')} className="btn btn-outline">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
